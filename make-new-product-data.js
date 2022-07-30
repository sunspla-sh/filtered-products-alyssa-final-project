//require the native fs library which we will use to write to a new file
const fs = require('fs');
/**
 * require our product data and valid image data which we will
 * use to construct an array of products with valid images
 */
const productData = require('./product-data.json');
const validImageData = require('./validImageArray.json');

/**
 * filter through our product data and only include the products
 * in the new filteredArray if their images previously returned
 * HTTP status code 200, which we can determine by checking our
 * array from the validImageData.json file
 */
const filteredArray = productData.filter((product, index) => {
  if(validImageData[index] === 200){
    return true;
  } else {
    return false;
  }
});

/**
 * write the array of products with valid image links
 * to a new file called 'filteredProductData.json'
 */
let data = JSON.stringify(filteredArray, null, 2);
fs.writeFileSync('filteredProductData.json', data);    

