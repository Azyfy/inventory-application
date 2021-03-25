const Category = require("../models/category");
const Car = require("../models/car");

const async = require("async");

const { body, validationResult } = require("express-validator");

// Display category list
exports.category_list = (req, res, next) => {

    Category.find()
        .exec( (err, list_category) => {
            if(err) { return next(err); }

            res.render("category_list", { title: "Categories", category_list: list_category });
        });

};

// Display category detail
exports.category_detail = (req, res, next) => {

    async.parallel({
        category: (callback) => {
            Category.findById(req.params.id)
                .exec(callback);
        },
        car: (callback) => {
            Car.find({ "category": req.params.id })
                .populate("manufacturer")
                .exec(callback);
        },
    },  (err, results) => {
            if(err) { return next(err); }

            if(results.category == null) {
                let err = new Error ("Category not found");
                err.status = 404;
                return next(err);
            }

            res.render("category_detail", { title: results.category.category, cars: results.car } );
    }
    );
};

// Display category create form on GET
exports.category_create_get = (req, res, next) => {

    res.render("category_form", { title: "Create a category"});
};

// Handle category create on POST
exports.category_create_post = [

    // validate and sanitize
    body("category", "Category name required").trim().isLength({min: 1}).escape(),

    //process req after v and s
    (req, res, next) => {

        // extract validation error from a request
        const errors = validationResult(req);

        // create category object with escapred and trimmed data
        let category = new Category(
            { category: req.body.category }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.render("category_form", { title:"Create category", category: category, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if category with same name already exists.
            Category.findOne({"category": req.body.category})
                    .exec( (err, found_category) => {
                        if(err) { return next(err); }

                        if (found_category) {
                             // category exists, redirect to its detail page
                            res.redirect(found_category.url);
                        }
                        else {

                            category.save( (err) => {
                                if (err) { return next(err); }

                                // category saved. Redirect to category detail page.
                                res.redirec(category.url);
                            });
                        }
                        
                    });
        }

    }
];


// Display category delete form on GET
exports.category_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle category delete on POST
exports.category_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Display category update form on GET
exports.category_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
}

// Handle category update on POST
exports.category_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};