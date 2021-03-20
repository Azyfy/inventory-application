#! /usr/bin/env node

console.log('This script populates some test data to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/<test>?retryWrites=true');

// run with: node populatedb <your mongodb url>

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

// models
const Car = require('./models/car')
const CarInStock = require('./models/carinstock')
const Category = require('./models/category')
var Manufacturer = require('./models/manufacturer')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// data array
const cars = []
const carsinstock = []
const categories = []
const manufacturers = []


function carCreate(model, manufacturer, category, m_year_start, m_year_end, horsepower, top_speed, price, cb) {
  let cardetail = {
      model: model , 
      manufacturer: manufacturer ,
      category: category ,
      m_year_start: m_year_start , 
      m_year_end: m_year_end , 
      horsepower: horsepower , 
      top_speed: top_speed , 
      price: price
    }

  let car = new Car(cardetail);
       
  car.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Car: ' + car);
    cars.push(car)
    cb(null, car)
  }  );
}

function carinstockCreate(car, in_stock, cb) {
  let carinstock = new CarInStock(
      { 
          car: car,
          in_stock: in_stock 
        }
      );
       
  carinstock.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New CarInStock: ' + carinstock);
    carsinstock.push(carinstock)
    cb(null, carinstock);
  }   );
}

function manufacturerCreate(name, country,  cb) {
  let manufacturerdetail = { 
    name: name,
    country: country,
  }
  // if (genre != false) bookdetail.genre = genre
    
  let manufacturer = new Manufacturer(manufacturerdetail);    
  manufacturer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Manufacturer: ' + manufacturer);
    manufacturers.push(manufacturer)
    cb(null, manufacturer)
  }  );
}


function categoryCreate(category, cb) {
  categorydetail = { 
    category: category
  }    
//  if (due_back != false) bookinstancedetail.due_back = due_back
//  if (status != false) bookinstancedetail.status = status
    
  var category = new Category(categorydetail);    
  category.save(function (err) {
    if (err) {
      console.log('ERROR CREATING category: ' + category);
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}


function createManufacturerCategory(cb) {
    async.series([
        function(callback) {
          manufacturerCreate("Mercedes-Benz", "Germany", callback);
        },
        function(callback) {
            manufacturerCreate("Aston Martin", "UK", callback);
        },
        function(callback) {
            manufacturerCreate("Volkswagen", "Germany", callback);
        },
        function(callback) {
          categoryCreate("Exotic", callback);
        },
        function(callback) {
          categoryCreate("Muscle", callback);
        },
        function(callback) {
          categoryCreate("Tuner", callback);
        },
        ],
        // optional callback
        cb);
}


function createCar(cb) {
    async.parallel([
        function(callback) {
          carCreate('CLK 500', manufacturers[0], categories[0], 2002, 2006, 320, 259, 50000, callback);
        },
        function(callback) {
            carCreate("DB 9", manufacturers[1], categories[0], 2004, 2016, 470, 299, 100000, callback);
        },
        function(callback) {
            carCreate("Golf R32", manufacturers[2], categories[2], 2005, 2008, 247, 249, 45000, callback);
        }
        ],
        // optional callback
        cb);
}


function createCarInStock(cb) {
    async.parallel([
        function(callback) {
          carinstockCreate(cars[0], 2, callback)
        },
        function(callback) {
            carinstockCreate(cars[1], 9, callback)
        },
        function(callback) {
            carinstockCreate(cars[2], 1, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createManufacturerCategory,
    createCar,
    createCarInStock
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Finish ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});