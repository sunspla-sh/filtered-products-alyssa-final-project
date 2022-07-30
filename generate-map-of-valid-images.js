//our product data which we will check for image link validity
const productArray = require('./product-data.json');

/**
 * our library for making http requests
 * (alternatively we could use fetch as it is now
 * native to Node.js if you're using v18 or later)
 */
const axios = require('axios');

/**
 * the fs library allows us to write data to new files
 * so we will use this to generate a new JSON file
 */
const fs = require('fs');

/**
 * Event emitter will help us keep track of how many 
 * image links we've checked for validity so far
 */
const EventEmitter = require('node:events');

/**
 * Extended the event emitter class in case we
 * needed to add some custom methods or additional
 * properties, but it turns out we didn't need them
 */
class MyEmitter extends EventEmitter {}

/**
 * Make a new instance of our EventEmitter
 */
const myEmitter = new MyEmitter();

/**
 * find out how many product image links we will
 * need to check for validity
 */
let numProducts = productArray.length;

/**
 * create a variable which we will decrement by 1 after
 * each image link check
 */
let imagesRemainingToCheck = numProducts;

/**
 * create a new array with a length equal to our total
 * number of image links
 */
const validImageArray = new Array(numProducts);

/**
 * set up an event handler on our EventEmitter so that
 * whenever it detects an 'imageResult' event it will
 * decrement the imagesRemainingToCheck by 1, log the
 * number of imagesRemainingToCheck along with the status
 * code of the most recent image check, and write our
 * validImageArray to a new file if there's no more
 * images remaining to check
 */
myEmitter.on('imageResult', (statusCode) => {
  console.log(--imagesRemainingToCheck, statusCode);
  if(imagesRemainingToCheck === 0) {
    let data = JSON.stringify(validImageArray, null, 2);
    fs.writeFileSync('validImageArray.json', data);    
  }
});


/**
 * Here we loop through all of our product data and set up
 * an HTTP request for each product image link with 1000 milliseconds
 * (1 second) between each request so that we don't clobber their
 * servers.
 */
for(let i = 0; i < numProducts; i++){
  setTimeout(() => {

    /**
     * After getting a valid response or error, we add the result
     * to our validImageArray and emit an 'imageResult' event, which
     * triggers the 'imageResult' event handler and associated callback function
     * that we previously attached to our EventEmitter
     */
    axios.get(productArray[i].image_link)
      .then(response => {
        validImageArray[i] = response.status;
        myEmitter.emit('imageResult', response.status);
      })
      .catch(err => {
        let myError;
        validImageArray[i] = err.code;
        myError = err.code;
        myEmitter.emit('imageResult', myError);
      })
      
  }, 1000 * i);
}







