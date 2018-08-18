var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var getSellingPrice = require('../getSellingPrice');
var loadProducts = require('../loadProducts');

const fields = ['website', 'model', 'brand', 'price'];

var productList = [];

class Product {
  constructor(website, model, brand, price){
    this.website = website;
    this.model = model;
    this.brand = brand;
    this.price = price
  }
}

const bikezone = () => {

  var website = 'Bikezone'

  for (let i = 1; i < 20; i++){
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

        productList.push(new Product (website, model, brand, price));
        productList = getSellingPrice(productList);
        // fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
        loadProducts(productList);
       });

       productList = [];
    });
  }
}
module.exports = bikezone
