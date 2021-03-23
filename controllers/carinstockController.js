const Car = require("../models/car");
const CarsInStock = require("../models/carinstock");

const async = require("async");


// Display carsinstock list
exports.carsinstock_list = (req, res, next) => {

    CarsInStock.find()
        .populate("car")
        .exec( (err, list_carsinstock) => {
            if(err) { return next(err); }

            res.render("carsinstock_list", { title: "Cars in stock", carsinstock_list: list_carsinstock });
        });

};

// Display details of carsinstock
exports.carsinstock_detail = (req, res, next) => {
    res.send('NOT IMPLEMENTED');
};

// Display carsinstock create form on GET
exports.carsinstock_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle carsinstock create on POST
exports.carsinstock_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display carsinstock delete form on GET
exports.carsinstock_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle carsinstock delete on POST
exports.carsinstock_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display carsinstock update form on GET
exports.carsinstock_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
}

// Handle carsinstock update on POST
exports.carsinstock_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};