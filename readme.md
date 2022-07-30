# Removing Products with Broken Image Links

## *Files that can be ignored:*
  - *event-test.js*
  - *filtered-product-data-test.js*
  - *validImageArray-old.json*
  - *.gitignore*

## *Required Tools:*
  - *Node.js*
  - *npm*

## Instructions

Our goal is to find and remove all products within ```product-data.json``` that have broken image links.

We define broken image links as *not* returning an HTTP status code ```200``` when we attempt to fetch them with a ```GET``` request.

The following steps will filter all broken image links from the ```product-data.json``` array and place the products with working links into a new array - ```filteredProductData.json```

1) Run the command ```npm install``` in the root directory of this project because we will need to install all of the dependencies listed in our ```package.json``` file
2) Run the command ```node generate-map-of-valid-images.js```
    - It should take several minutes to finish checking the HTTP status code of each image link because it only makes one request per second to avoid clobbering any servers
    - It will generate a new json file called ```validImageArray.json``` which contains an array of HTTP status code ```200``` results and errors
3) Run the command ```make-new-product-data.js```
    - It will filter the array from ```product-data.json``` using the array from ```validImageArray.json``` to determine if a product should be included in the new array or not
    - It will generate a new json file called ```filteredProductData.json``` which contains an array of only products with valid image links
3) We can now use the ```filteredProductData.json``` file in one of two ways:
      1) Directly importing it into our front-end (if you're using React, consider setting it to the default value of a useState hook)
      2) Using it to set up an API which we can then query from a seperate front-end (assuming you're working with NodeJS, consider using the ```json-server``` npm package)