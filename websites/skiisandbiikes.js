var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var getSellingPrice = require('../getSellingPrice');
var loadProducts = require('../loadProducts');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

    request({
    url: "https://skiisandbiikes.com/pages/search-results-page?collection=road&page=2",
    method: 'GET',
    agent: agent,
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36' }
  }
  , function(error, response, body) {

    if(error) {
      console.log("Error: " + error);
    }
      console.log("Status code: " + response.statusCode);

      const dom = new JSDOM(body,{
          features: {
            FetchExternalResources   : ['script'],
            ProcessExternalResources : ['script'],
            MutationEvents           : '2.0',
            runScripts: "dangerously",
            resources: "usable"
        }

    });
      //optional, to run external scripts, { runScripts: "dangerously" , resources: "usable"}
      // console.log(dom.window.document.querySelector(".snize-product").innerHTML)
    // var $ = cheerio.load(body);
    fs.appendFile('SB.html',dom.window.document.querySelector("body").innerHTML);
    //console.log( $('script').get()[0].attribs['src'] );
    // $('.snize-product').each(function( index ) {
    //   console.log("working")
      // productList = [];
      //
      // var brand = "";
      // var model = $(this).find('.product-title').text().trim();
      // var price = $(this).find('span.amount').text().trim();
      // var link = $(this).find('.a').attr('href')
      //
      // productList.push(new Product (website, model, brand, price, link));
      // productList = getSellingPrice(productList);
      // fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
      // loadProducts(productList);
      // });
    });
}

module.exports = skiisandbiikes
