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

const bikezone = () => {

  var name = 'Bikezone'

  for (let i = 1; i < 3; i++){
    request("http://thebikezone.com/shop-bikes/?sort=featured&page=" + i, function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.Odd').each(function( index ) {
        var brand = "";
        var model = $(this).find('.pname').text().trim();
        var price = $(this).find('.p-price').text().trim();;

        productList.push(new Product (name, model, brand, price));
        productList = getSellingPrice(productList);
       });
       fs.appendFile('ProductList.js',JSON.stringify(productList)+',');
       productList = [];
    });
  }
}
module.exports = bikezone
