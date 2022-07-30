const productArray = require('./product-data.json');
const axios = require('axios');
const fs = require('fs');

const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

let numProducts = productArray.length;

let imagesRemainingToCheck = numProducts;

const validImageArray = new Array(numProducts);

myEmitter.on('imageResult', (statusCode) => {
  console.log(--imagesRemainingToCheck, statusCode);
  if(imagesRemainingToCheck === 0) {
    let data = JSON.stringify(validImageArray, null, 2);
    fs.writeFileSync('validImageArray.json', data);    
  }
});

for(let i = 0; i < numProducts; i++){
  setTimeout(() => {
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







