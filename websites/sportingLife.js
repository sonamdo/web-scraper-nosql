var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var getSellingPrice = require('../getSellingPrice');
var loadProducts = require('../loadProducts');

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

  for (let i = 1; i < 4; i++){
    request("https://www.sportinglife.ca/search/searchResults.jsp?needResults=&currentContext=&_DARGS=/search/facets.jsp_AF&_dynSessConf=966755343731519965&_D%3Aqfh_ft=+&qfh_ft=27005%3ARoad+Bikes&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=+&qfh_fsr=true&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=numprop&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=+&_D%3Aqfh_fsr=+&_D%3Aqfh_ci=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=ascending&qfh_rct=0371958902&qfh_ci=BIKE_TYPES&_D%3Aqfh_rct=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=marketingPriority&_D%3Afh_sr=+&trail=27005%3ARoad+Bikes&fh_sr=true&_D%3Afh_gtp=+&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=+&fh_gtp=" + i, function(error, response, body)
    {
      console.log(i)
      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);
        console.log(i)

      var $ = cheerio.load(body);
       $('.product-card').each(function( index ) {
         productList = [];
         
         var brand = $(this).find('.product-name > h2').text().trim();
         var model = $(this).find('a > h2').text().trim();
         var price = $(this).find('.price > div').text().trim();
         var link = $(this).find('.product-name > a').attr('href')

         productList.push(new Product (website, model, brand, price, link));
         productList = getSellingPrice(productList);
         fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
         // loadProducts(productList);
       });

    });
  }

  for (let i = 1; i < 4; i++){
    request("https://www.sportinglife.ca/search/searchResults.jsp?needResults=&currentContext=&_DARGS=/search/facets.jsp_AF&_dynSessConf=-4392655603270447437&_D%3Aqfh_ft=+&qfh_ft=27005%3AFitness+%26+Urban+Bikes&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=+&qfh_fsr=true&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=numprop&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=+&_D%3Aqfh_fsr=+&_D%3Aqfh_ci=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=ascending&qfh_rct=0371817884&qfh_ci=BIKE_TYPES&_D%3Aqfh_rct=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=marketingPriority&_D%3Afh_sr=+&trail=27005%3AFitness+%26+Urban+Bikes&fh_sr=true&_D%3Afh_gtp=+&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=+&fh_gtp=" + i, function(error, response, body)
    {
      console.log(i)
      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);
        console.log(i)

      var $ = cheerio.load(body);
       $('.product-card').each(function( index ) {
         productList = [];
         var brand = $(this).find('.product-name > h2').text().trim();
         var model = $(this).find('a > h2').text().trim();
         var price = $(this).find('.price > div').text().trim();
         var link = $(this).find('.product-name > a').attr('href')

         productList.push(new Product (website, model, brand, price, link));
         productList = getSellingPrice(productList);
         fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
         // loadProducts(productList);
       });

    });
  }

  for (let i = 1; i < 4; i++){
    request("https://www.sportinglife.ca/search/searchResults.jsp?needResults=&currentContext=&_DARGS=/search/facets.jsp_AF&_dynSessConf=966755343731519965&_D%3Aqfh_ft=+&qfh_ft=27005%3AMountain+Bikes&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=+&qfh_fsr=true&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=numprop&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSort=+&_D%3Aqfh_fsr=+&_D%3Aqfh_ci=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortOrder=ascending&qfh_rct=0371958902&qfh_ci=BIKE_TYPES&_D%3Aqfh_rct=+&/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=marketingPriority&_D%3Afh_sr=+&trail=27005%3AMountain+Bikes&fh_sr=true&_D%3Afh_gtp=+&_D%3A/atg/commerce/search/catalog/QueryFormHandler.previousSearchRequest.docSortProp=+&fh_gtp=" + i, function(error, response, body)
    {
      console.log(i)
      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);
        console.log(i)

      var $ = cheerio.load(body);
       $('.product-card').each(function( index ) {
         productList = [];
         var brand = $(this).find('.product-name > h2').text().trim();
         var model = $(this).find('a > h2').text().trim();
         var price = $(this).find('.price > div').text().trim();
         var link = $(this).find('.product-name > a').attr('href')

         productList.push(new Product (website, model, brand, price, link));
         productList = getSellingPrice(productList);
         fs.appendFile('ProductList.js',JSON.stringify(productList) + ',');
         // loadProducts(productList);
       });

    });
  }
}

module.exports = sportingLife;
