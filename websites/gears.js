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

const gears = () => {

  var name = 'Gears'

  for (let i = 1; i < 160; i += 30){
    request("https://shop.gearsbikeshop.com/product-list/bikes-1000/?startRow=" + i, function(error, response, body)
    {

      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
       $('.seitem').each(function( index ) {
         var model = $(this).find('.seitemdata > h5').text().trim();
         var brand = "";
         var price = "";
         var price1 = $(this).find('.seregularprice').text().trim();
         var price2 = $(this).find('.sespecialprice').text().trim();
         var price3 = $(this).find('.seoriginalprice').text().trim();

         price = price.concat(price1, price2, price3)

         productList.push(new Product (name, model, brand, price));
         productList = getSellingPrice(productList);
       });
       fs.appendFile('ProductList.js',JSON.stringify(productList)+',');
       productList = [];
    });
  }
}

module.exports = gears;