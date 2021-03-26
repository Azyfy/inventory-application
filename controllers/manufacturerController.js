const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");

const async = require("async");

const { body, validationResult } = require("express-validator");

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
exports.manufacturer_create_get = (req, res, next) => {
    
    res.render("manufacturer_form", { title: "Add a manufacturer" });
};

// Handle manufacturer create on POST
exports.manufacturer_create_post = [

    // validate and sanitize
    body("name", "Manufacturer name required").trim().isLength({min: 1}).escape(),
    body("country").trim().isLength({min: 1}).escape().withMessage("Country required"),

    //process req after v and s
    (req, res, next) => {

         // extract validation error from a request
         const errors = validationResult(req);

         // create category object with escapred and trimmed data
         const manufacturer = new Manufacturer(
             {
                 name: req.body.name,
                 country: req.body.country
             }
         );

         if (!errors.isEmpty()) {
             // There are errors. Render form again with sanitized values/errors messages.
             res.render("manufacturer_form", { title: "Add manufacturer", manufacturer: req.body, errors: errors.array() });
         }
         else
             // Data from form is valid.
             // Check if manufacturer with same name already exists.

             Manufacturer.findOne({"name": req.body.name})
                        .exec( (err, found_manufacturer) => {
                            if(err) { return next(err); }
                            
                            if(found_manufacturer) {
                                 // manufacturer exists, redirect to its detail page
                                res.redirect(found_manufacturer.url);
                            }
                            else {
                                manufacturer.save( (err) => {
                                    if(err) { return next(err); }
                                      // Successful - redirect to new manufacturer record.
                                      res.redirect(manufacturer.url);
                                });
                            }

                        });

    }

];

// Display manufacturer delete form on GET
exports.manufacturer_delete_get = (req, res, next) => {
    
    async.parallel({
        manufacturer: (callback) => {
            Manufacturer.findById(req.params.id).exec(callback);
        },
        manufacturers_cars: (callback) => {
            Car.find({"manufacturer": req.params.id}).exec(callback);
        },
    },
        (err, results) => {
            if(err) { return next(err); }

            if (results.manufacturer == null) {
                res.redirect("/inventory/manufacturer_list");
            }
            // Successful
            res.render("manufacturer_delete", { title: "Delete manufacturer", manufacturer: results.manufacturer, manufacturer_cars: results.manufacturers_cars } );
        }
    );
};

// Handle manufacturer delete on POST
exports.manufacturer_delete_post = (req, res, next) => {
    
    async.parallel({
       manufacturer: (callback) => {
           Manufacturer.findById(req.body.manufacturerid).exec(callback);
       },
       manufacturers_cars: (callback) => {
            Car.find({"manufacturer": req.body.manufacturerid}).exec(callback);
       }, 
    },  (err, results) => {
        if(err) { return next(err); }

        // Success
        if(results.manufacturers_cars.length > 0) {
            //got cars
            res.render("manufacturer_delete", { title: "Delete manufacturer", manufacturer: results.manufacturer, manufacturer_cars: results.manufacturers_cars});
            return;
        }
        else {
            //no cars
            Manufacturer.findByIdAndRemove(req.body.manufacturerid, function deleteManufacturer(err) {
                if(err) { return next(err); }

                res.redirect("/inventory/manufacturer_list");
            });
        }
    }
    );

};

// Display manufacturer update form on GET
exports.manufacturer_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
}

// Handle manufacturer update on POST
exports.manufacturer_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};