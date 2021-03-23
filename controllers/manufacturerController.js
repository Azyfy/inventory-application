const Manufacturer = require("../models/manufacturer");

const async = require("async");

// Display manufacturer list
exports.manufacturer_list = (req, res, next) => {

    Manufacturer.find()
        .exec( (err, list_manufacturer) => {
            if(err) { return next(err); }

            res.render("manufacturer_list", { title: "List of manufacturers",  manufacturer_list: list_manufacturer });
        });

};

// Display details of manufacturer
exports.manufacturer_detail = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display manufacturer create form on GET
exports.manufacturer_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle manufacturer create on POST
exports.manufacturer_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display manufacturer delete form on GET
exports.manufacturer_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle manufacturer delete on POST
exports.manufacturer_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display manufacturer update form on GET
exports.manufacturer_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
}

// Handle manufacturer update on POST
exports.manufacturer_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};