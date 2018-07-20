var fs = require('fs');

const Products = [
  {
    website : 'Broadway',
    model : 'Cannondale Forray 2',
    brand : '',
    price : 74999
  },
  {
    website : 'Gears',
    model : 'Domane AR3',
    brand : 'Trek',
    price : 14999
  },
  {
    website : 'Gears',
    model : 'Domane Gioni',
    brand : 'Trek',
    price : 15000
  }
]

fs.writeFile('ProductList.js',JSON.stringify(Products))
