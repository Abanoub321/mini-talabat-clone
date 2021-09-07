const express = require("express");
const {createResturant ,getResturant, getResturants} = require('../controller/restaurantcontroller');

const resturantRoutes = express.Router();

resturantRoutes.post("/create",createResturant);
resturantRoutes.get('/:restId',getResturant);
resturantRoutes.get('/',getResturants);

module.exports = resturantRoutes