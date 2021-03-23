const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");

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
exports.manufacturer_detail = (req, res, next) => {
    
    async.parallel({

        manufacturer: (callback) => {
            Manufacturer.findById(req.params.id)
                .exec(callback);
        },

        car: (callback) => {
            Car.find({ "manufacturer": req.params.id })
                .exec(callback);
        },
    },  (err, results) => {
            if(err) { return next(err); }

            if(results.manufacturer == null) {
                let err = new Error ("Manufacturer not found");
                err.status = 404;
                return next(err);
            }

            res.render("manufacturer_detail", { title: results.manufacturer.name, manufacturer: results.manufacturer, cars: results.car });
    }
    );
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