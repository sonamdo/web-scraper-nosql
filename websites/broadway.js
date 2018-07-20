var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var getSellingPrice = require('../getSellingPrice');

const fields = ['name', 'model', 'brand', 'price'];

var productList = [];

class Product {
  constructor(name, model, brand, price){
    this.name = name;
    this.model = model;
    this.brand = brand;
    this.price = price
  }
}

const broadway = () => {

  var name = 'Broadway'

  for (let i = 1; i < 10; i++){
    request("https://bikedepot.com/product-category/bikes/page/" + i + "/?et_per_page=36", function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.content-product').each(function( index ) {
         var brand = "";
         var model = $(this).find('.product-title').text().trim();
         var price = $(this).find('span.amount').text().trim();

         productList.push(new Product (name, model, brand, price));
         productList = getSellingPrice(productList);
       });
       fs.appendFile('ProductList.js',JSON.stringify(productList)+',');
       productList = [];
    });
  }
}

module.exports = broadway;
