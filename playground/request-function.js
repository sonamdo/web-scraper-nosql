var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

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

var websites = [
  {
    website : 'Sportinglife',
    url : 'https://www.sportinglife.ca/',
    extension : 'c/bike-types-road-bikes?howMany=12&sorting=&page=1',
    category : '.product-card',
    brandPath : '.product-name > h2',
    modelPath : 'a > h2',
    pricePath : '.price'
  },
  // {
  //   website : 'bikedepot',
  //   url : 'https://bikedepot.com/',
  //   extension : 'product-category/bikes/road-bikes/',
  //   extension2 : 'https://bikedepot.com/product-category/bikes/road-bikes/page/2/?et_per_page=36',
  //   category : '.type-product',
  //   brandPath : '#test-slyle-less',
  //   modelPath : '.product-title',
  //   pricePath : '.woocommerce-Price-amount'
  // },
  {
    website : 'Gears',
    url : 'https://shop.gearsbikeshop.com/',
    extension : 'product-list/bikes-1000/?startRow=1',
    category : '.seitem',
    brandPath : '.seitemdata > h5',
    //modelPath : 'a > h2',
    pricePath : '.seitemprice > .sepricedisplay'
  }
]

const csvParser = () => {
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(productList);

  console.log(csv);
  fs.writeFile('PriceList.csv', csv, function(err){
    if (err) throw err;
    console.log('Saved!')
  })
}

const webRequest = () => {
  for (let i = 0; i < websites.length; i++){
    request( websites[i].url + websites[i].extension, function(error, response, body) {

      console.log('running for: ' + websites[i].website);
      if(error) {
        console.log("Error: " + error);
      }
        console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);
      $(websites[i].category).each(function( index ) {
        var brand = $(this).find(websites[i].brandPath).text().trim();
        var model = $(this).find(websites[i].modelPath).text().trim();
        var price = $(this).find(websites[i].pricePath).text().trim();
        var name = websites[i].website;

        productList.push(new Product (name, model, brand, price));
      });
    });
  }
 };

webRequest()

setTimeout(function(){
  csvParser()
},10000)

module.exports = webRequest;
module.exports = Product;
