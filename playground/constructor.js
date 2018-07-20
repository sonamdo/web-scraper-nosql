var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

const fields = ['name', 'model', 'brand', 'price'];
var name = 'Sportinglife';

var productList = [];

class Product {
  constructor(name, model, brand, price){
    this.name = name;
    this.model = model;
    this.brand = brand;
    this.price = price
  }
}

const csvParser = () => {
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(productList);

  console.log(csv);
  fs.writeFile('PriceList.csv', csv, function(err){
    if (err) throw err;
    console.log('Saved!')
  })
}

webRequest()

setTimeout(function(){
  csvParser()
},10000)
