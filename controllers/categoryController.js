const Category = require("../models/category");
const Car = require("../models/car");

const async = require("async");

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
exports.category_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

// Handle category create on POST
exports.category_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED');
};

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