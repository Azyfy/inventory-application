const Category = require("../models/category");

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
exports.category_detail = (req, res) => {
    res.send('NOT IMPLEMENTED');
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