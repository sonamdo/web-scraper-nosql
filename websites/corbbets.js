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

var corbbets = () => {

  var https = require('https');
  var name = 'Corbbets';
  var agentOptions;
  var agent;

  var agentOptions = {
    host: 'www.corbetts.com'
  , port: '443'
  , path: '/'
  , rejectUnauthorized: false
  };

  agent = new https.Agent(agentOptions);

  for (i = 1; i < 5; i++){
    request({
    url: "https://www.corbetts.com/categories/ski/skis.html#?Category0=ski&Category1=skis&search_return=all&page=" + i,
    method: 'GET',
    agent: agent
  }
  , function(error, response, body) {

    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
     $('.product-grid-item').each(function( index ) {
       var brand = $(this).find('.product-details > .product-brand').text().trim();
       var model = $(this).find('.product-details > .product-title').text().trim();
       var price = $(this).find('.product-details > .product-price').text().trim();

       productList.push(new Product (name, model, brand, price));
       productList = getSellingPrice(productList);
     });
     fs.appendFile('ProductList.js',JSON.stringify(productList)+',');
     productList = [];
    });
  }
}

module.exports = corbbets
