var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var getSellingPrice = require('../getSellingPrice');
var loadProducts = require('../loadProducts');

const fields = ['website', 'model', 'brand', 'price'];

var productList = [];

class Product {
  constructor(website, model, brand, price, link){
    this.website = website;
    this.model = model;
    this.brand = brand;
    this.price = price;
    this.link = link;
  }
}

const broadway = () => {

  var website = 'Broadway'

  for (let i = 1; i < 2; i++){
    request("https://bikedepot.com/product-category/bikes/page/" + i + "/?et_per_page=36", function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.content-product').each(function( index ) {
         productList = [];

         var brand = "";
         var model = $(this).find('.product-title').text().trim();
         var price = $(this).find('span.amount').text().trim();
         var link2 = "https://bikedepot.com/product/" + model.replace(/\s+/g, '-');
         var link = link2.replace('-–-', '-')
         console.log

         productList.push(new Product (website, model, brand, price, link));
         productList = getSellingPrice(productList);
         fs.appendFile('BikeList.js',JSON.stringify(productList) + ',');
         // loadProducts(productList);
       });

    });
  }
}

module.exports = broadway;
