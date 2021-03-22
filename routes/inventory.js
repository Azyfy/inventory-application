var express = require('express');
var router = express.Router();

// controller models
const car_controller = require("../controllers/carController");


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Test!' });
  });

router.get('/cars', car_controller.car_list);

module.exports = router;