var express = require('express');
var router = express.Router();

// controller models
const car_controller = require("../controllers/carController");
const carsinstock_controller = require("../controllers/carinstockController");


router.get('/',  car_controller.inventory_index);

// CAR ROUTES
// get car list
router.get("/car_list", car_controller.car_list);

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


// CARSINSTOCK ROUTES
// get carsinstock list
router.get("/carsinstock_list", carsinstock_controller.carsinstock_list);

// get carsinstock details
router.get("/carsinstock/:id", carsinstock_controller.carsinstock_detail);

// get and post carsinstock create form
router.get("/carsinstock/create", carsinstock_controller.carsinstock_create_get);
router.post("/carsinstock/create", carsinstock_controller.carsinstock_create_post);

// get and post carsinstock delete
router.get("/carsinstock/:id/delete", carsinstock_controller.carsinstock_delete_get);
router.post("/carsinstock/:id/delete", carsinstock_controller.carsinstock_delete_post);

// get and post carsinstock update
router.get("/carsinstock/:id/update", carsinstock_controller.carsinstock_update_get);
router.post("/carsinstock/:id/update", carsinstock_controller.carsinstock_update_post);









module.exports = router;