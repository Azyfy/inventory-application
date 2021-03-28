const Car = require("../models/car");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category");

const async = require("async");

const { body, validationResult } = require("express-validator");

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
exports.car_list = (req, res, next) => {

    Car.find({}, "model manufacturer")
        .populate("manufacturer")
        .exec( (err, list_cars) => {
            if (err) { return next(err); }

            res.render("car_list", { title: "Car List", car_list: list_cars });
        });

};

// Display details of a car
exports.car_detail = (req, res, next) => {
   
    async.parallel({
        car: (callback) => {

            Car.findById(req.params.id)
                .populate("manufacturer")
                .populate("category")
                .exec(callback);
        },
        in_stock: (callback) => {

            CarsInStock.find({ "car": req.params.id})
                .exec(callback);
        },
    },
        (err, results) => {
            if(err) { return next(err); }

            if(results.car == null) {
                let err = new Error ("Car no found");
                err.status = 404;
                return next(err);
            }

            res.render("car_detail", { title: results.car.model, car: results.car, in_stock: results.in_stock[0] }) 
        }
    );
};

// Display car create form on GET
exports.car_create_get = (req, res, next) => {
    
// Get all stuff, which we can use for adding to our car.
async.parallel({
    manufacturers: (callback) => {
        Manufacturer.find(callback);
    },
    categories: (callback) => {
        Category.find(callback);
    },
},  (err, results) => {
        if(err) {return next(err); }

        res.render("car_form", { title: "Add a car", manufacturers: results.manufacturers, categories: results.categories })
}
);
};

// Handle car create on POST
exports.car_create_post = [

    // Validate and sanitise 
    body("model", "Model cant be empty").trim().isLength({min: 1}).escape(),
    body("manufacturer", "Manufacturer cant be empty").trim().isLength({min: 1}).escape(),
    body("category", "Category cant be empty").trim().isLength({min: 1}).escape(),
    body("m_year_start", "Year start cant be empty").trim().isLength({min: 4, max: 4}).escape(),
    body("m_year_end", "Year end cant be empty").trim().isLength({min: 4, max: 4}).escape(),
    body("horsepower", "Horsepower cant be empty").trim().isLength({min: 1}).escape(),
    body("top_speed", "Top speed cant be empty").trim().isLength({min: 1}).escape(),
    body("price", "Price cant be empty").trim().isLength({min: 1}).escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // image
        let filename = "cartemplate.jpeg";
        if(req.file != undefined) {

            filename = req.file.originalname;
        }


        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a car object with escaped and trimmed data.
        let car = new Car(
            {
                model: req.body.model,
                manufacturer: req.body.manufacturer,
                category: req.body.category,
                imgname: filename,
                m_year_start: req.body.m_year_start,
                m_year_end: req.body.m_year_end,
                horsepower: req.body.horsepower,
                top_speed: req.body.top_speed,
                price: req.body.price
            }
        );

        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.

            // Get all stuffs for form.
            async.parallel({
                manufacturers: (callback) => {
                    Manufacturer.find(callback);
                },
                categories: (callback) => {
                    Category.find(callback);
                },
            },  (err, results) => {
                    if(err) {return next(err); }
                    
                    res.render("car_form", { title: "Add a car", manufacturers: results.manufacturers, categories: results.categories, car: car, errors: errors.array() })
            }
            );
            return;
        }
        else {
             // Data from form is valid. Save car.
             car.save( (err) => {
                 if(err) { return next(err); }
                 //successful - redirect to new car
                 res.redirect(car.url);
             });
        }
    }
];

// Display car delete form on GET
exports.car_delete_get = (req, res, next) => {

    Car.findById(req.params.id).populate("manufacturer").exec( (err, car) => {
        if(err) { return next(err); }

        res.render("car_delete", { title: "Delete car", car: car });
    });

};

// Handle car delete on POST
exports.car_delete_post = (req, res, next) => {

    body("password", "Password does not match").trim().escape().equals("secretpoassword")

    if ( req.body.password === "secretpassword" ) {

        Car.findByIdAndRemove(req.body.carid, function deleteCar(err) {
            if(err) { return next(err); }

            res.redirect("/inventory/car_list");
        });
    }
    else {
        let err = new Error("Secret password does not match secretpassword");
        return next(err);
    }
 

};

// Display car update form on GET
exports.car_update_get = (req, res, next) => {
    
    async.parallel({
        car: (callback) => {
            Car.findById(req.params.id).populate("manufacturer")
                .populate("category")
                .exec(callback);
        },
        manufacturers: (callback) => {
            Manufacturer.find(callback);
        },
        categories: (callback) => {
            Category.find(callback);
        }, 
    },  (err, results) => {
        if(err) { return next(err); }
        if(results.car==null) {
            let err = new Error("Car not found");
            err.status = 404;
            return next(err);
        }

        //is oki
        res.render("car_form", { title: "Update car", car: results.car, manufacturers: results.manufacturers, categories: results.categories })
    }
    );
}

// Handle car update on POST
exports.car_update_post = [

    //same code as for creating just added _id(so no new is assigned) and at the end is to update
    // vali and sani
    body("model", "Model cant be empty").trim().isLength({min: 1}).escape(),
    body("manufacturer", "Manufacturer cant be empty").trim().isLength({min: 1}).escape(),
    body("category", "Category cant be empty").trim().isLength({min: 1}).escape(),
    body("m_year_start", "Year start cant be empty").trim().isLength({min: 4, max: 4}).escape(),
    body("m_year_end", "Year end cant be empty").trim().isLength({min: 4, max: 4}).escape(),
    body("horsepower", "Horsepower cant be empty").trim().isLength({min: 1}).escape(),
    body("top_speed", "Top speed cant be empty").trim().isLength({min: 1}).escape(),
    body("price", "Price cant be empty").trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a car object with escaped and trimmed data.
        let car = new Car(
            {
                model: req.body.model,
                manufacturer: req.body.manufacturer,
                category: req.body.category,
                m_year_start: req.body.m_year_start,
                m_year_end: req.body.m_year_end,
                horsepower: req.body.horsepower,
                top_speed: req.body.top_speed,
                price: req.body.price,
                _id: req.params.id //This is required, or a new ID will be assigned!
            }
        );

        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.

            // Get all stuffs for form.
            async.parallel({
                manufacturers: (callback) => {
                    Manufacturer.find(callback);
                },
                categories: (callback) => {
                    Category.find(callback);
                },
            },  (err, results) => {
                    if(err) {return next(err); }
            
                    res.render("car_form", { title: "Add a car", manufacturers: results.manufacturers, categories: results.categories, car: car, errors: errors.array() })
            }
            );
            return;
        }
        else {
             // Data from form is valid. Update it.
             Car.findByIdAndUpdate( req.params.id, car, {}, function (err, thecar) {
                 if(err) { return next(err); }
                 //successful - redirect to the car
                 res.redirect(thecar.url);
             });
        }
    }

  
]