var express = require('express');
var router = express.Router();

// controller models
const car_controller = require("../controllers/carController");


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Test!' });
  });

// get car list
router.get("/cars", car_controller.car_list);

// get car details
router.get("/car/:id", car_controller.car_detail);

// get and post car create form
router.get("/car/create", car_controller.car_create_get);
router.post("/car/create", car_controller.car_create_post);

// get and post car delete
router.get("/car/:id/delete", car_controller.car_delete_get);
router.post("/car/:id/delete", car_controller.car_delete_post);

// get and post car update
router.get("/car/:id/update", car_controller.car_update_get);
router.post("/car/:id/update", car_controller.car_update_post);

module.exports = router;