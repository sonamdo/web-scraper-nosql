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

const bikezone = () => {

  var website = 'Bikezone'

  for (let i = 1; i < 72; i++){
    request("http://thebikezone.com/shop-bikes/?sort=featured&page=" + i, function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.Odd').each(function( index ) {
        productList = [];
        var brand = "";
        var model = $(this).find('.pname').text().trim();
        var price = $(this).find('.p-price').text().trim();
        var link = "http://thebikezone.com/" + model.replace(/\s+/g, '-');

        productList.push(new Product (website, model, brand, price, link));
        productList = getSellingPrice(productList);
        fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
        console.log(model)
        // loadProducts(productList);
       });

       $('.Even').each(function( index ) {
        productList = [];
        var brand = "";
        var model = $(this).find('.pname').text().trim();
        var price = $(this).find('.p-price').text().trim();
        var link = "http://thebikezone.com/" + model.replace(/\s+/g, '-');

        productList.push(new Product (website, model, brand, price, link));
        productList = getSellingPrice(productList);
        fs.appendFile('BikeList.js',JSON.stringify(productList) + ',');
        console.log(model)
        // loadProducts(productList);
       });
    });
  }
}
module.exports = bikezone
