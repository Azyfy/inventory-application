const Car = require("../models/car");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category");
const CarsInStock = require("../models/carinstock");

const async = require("async");

exports.inventory_index = function (req, res)  {

    async.parallel({
          car_count: function (callback)  {
              Car.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
          },
          manufacturer_count: (callback) => {
              Manufacturer.countDocuments({}, callback);
          },
          category_count: (callback) => {
            Category.countDocuments({}, callback);
          }
      },
        function(err, results) {
            res.render('inventory', { title: 'Inventory', error: err, data: results });
        });
};

// Display car list
exports.car_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Car list');
};

// Display details of a car
exports.car_detail = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display car create form on GET
exports.car_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle car create on POST
exports.car_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display car delete form on GET
exports.car_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle car delete on POST
exports.car_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display car update form on GET
exports.car_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
}

// Handle car update on POST
exports.car_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};