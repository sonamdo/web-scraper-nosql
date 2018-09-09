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
    this.link = link
  }
}

var corbbets = () => {

  var https = require('https');
  var website = 'Corbbets';
  var agentOptions;
  var agent;

  var agentOptions = {
    host: 'www.corbetts.com'
  , port: '443'
  , path: '/'
  , rejectUnauthorized: false
  };

  agent = new https.Agent(agentOptions);

  for (let i = 1; i < 2; i++){
    request({
    url: "https://www.corbetts.com/categories/ski/skis.html#?Category0=ski&Category1=skis&search_return=all&page=" + i,
    method: 'GET',
    agent: agent
  }
  , function(error, response, body) {

    if(error) {
      console.log("Error: " + error);
    }
    // console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
     $('.product-grid-item').each(function( index ) {
      productList = [];
       var brand = $(this).find('.product-details > .product-brand').text().trim();
       var model = $(this).find('.product-details > .product-title').text().trim();
       var price = $(this).find('.product-details > .product-price').text().trim();
       var link = "https://www.corbetts.com/" + model.replace(/\s+/g, '-')

       productList.push(new Product (website, model, brand, price, link));
       productList = getSellingPrice(productList);
       fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
       console.log(model)
       // loadProducts(productList);
     });
    });
  }
}

module.exports = corbbets
