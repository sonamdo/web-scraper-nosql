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

const sportingLife = () => {

  var website = 'Sportinglife'

  // for (let i = 0; i < 5; i++){
  //   request("https://www.sportinglife.ca/c/adult-alpine-ski-type?howMany=12&sorting=&page=" + i, function(error, response, body)
  //   {
  //
  //     if(error) {
  //       console.log("Error: " + error);
  //     }
  //       console.log("Status code: " + response.statusCode);
  //
  //     var $ = cheerio.load(body);
  //      $('.product-card').each(function( index ) {
  //        var brand = $(this).find('.product-name > h2').text().trim();
  //        var model = $(this).find('a > h2').text().trim();
  //        var price = $(this).find('.price > div').text().trim();
  //
  //        productList.push(new Product (website, model, brand, price));
  //        productList = getSellingPrice(productList);//function converts list to only show sales price, not regular price
  //      });
  //      fs.appendFile('ProductList.js',JSON.stringify(productList)+',')
  //   });
  // }

  for (i = 0; i < 5; i++){
    request("https://www.sportinglife.ca/c/bike-types-road-bikes?howMany=12&sorting=&page=" + i, function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.product-card').each(function( index ) {
         var brand = $(this).find('.product-name > h2').text().trim();
         var model = $(this).find('a > h2').text().trim();
         var price = $(this).find('.price > div').text().trim();

         productList.push(new Product (website, model, brand, price));
         productList = getSellingPrice(productList);
         // fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
         loadProducts(productList);
       });

       productList = [];
    });
  }
}

module.exports = sportingLife;
