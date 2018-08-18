var AWS = require("aws-sdk");
var fs = require('fs');

const loadProducts = () => {

  AWS.config.update({
    region: "ca-central-1",
    endpoint: "https://dynamodb.ca-central-1.amazonaws.com"
  });

  var docClient = new AWS.DynamoDB.DocumentClient();

  console.log("Importing products into DynamoDB. Please wait.");

  var allProducts = JSON.parse(fs.readFileSync('ProductList.json', 'utf8'));

  allProducts.forEach(function(product) {
      var params = {
          TableName: "Products",
          Item: {
              "model": product.model,
              "shop": product.name,
          //name, model, brand, price
          }
      };

      docClient.put(params, function(err, data) {
         if (err) {
             console.error("Unable to add product", product.model, ". Error JSON:", JSON.stringify(err, null, 2));
         } else {
             console.log("PutItem succeeded:", product.model);
         }
      });
  });
}

module.exports = loadProducts
