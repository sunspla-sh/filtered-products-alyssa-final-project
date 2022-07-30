const fs = require('fs');
const productData = require('./product-data.json');
const validImageData = require('./validImageArray.json');

const filteredArray = productData.filter((product, index) => {
  if(validImageData[index] === 200){
    return true;
  } else {
    return false;
  }
});

let data = JSON.stringify(filteredArray, null, 2);
fs.writeFileSync('filteredProductData.json', data);    

