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

var skiisandbiikes = () => {

  var https = require('https');
  var website = 'Skiisandbiikes';
  var agentOptions;
  var agent;

  var agentOptions = {
    host: 'www.skiisandbiikes.com'
  , port: '443'
  , path: '/'
  , rejectUnauthorized: false
  };

  agent = new https.Agent(agentOptions);

  for (let i = 1; i < 2; i++){
    request({
    url: "https://skiisandbiikes.com/pages/search-results-page?collection=road&page=" + i,
    method: 'GET',
    agent: agent
  }
  , function(error, response, body) {

    if(error) {
      console.log("Error: " + error);
    }
      console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
    $('.snize-product').each(function( index ) {
      productList = [];

      var brand = "";
      var model = $(this).find('.product-title').text().trim();
      var price = $(this).find('span.amount').text().trim();
      var link2 = "https://bikedepot.com/product/" + model.replace(/\s+/g, '-');
      var link = link2.replace('-–-', '-')
      console.log

      productList.push(new Product (website, model, brand, price, link));
      productList = getSellingPrice(productList);
      fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
      // loadProducts(productList);
      });
    });
  }
}

module.exports = skiisandbiikes
