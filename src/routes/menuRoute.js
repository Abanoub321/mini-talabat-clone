const express = require("express");
const {createMenu, getMenu, updateMenu, deleteFromMenu} = require('../controller/menucontroller');

const menuRoutes = express.Router();

menuRoutes.post("/create",createMenu);
menuRoutes.get("/:restId",getMenu);
menuRoutes.put("/dish",updateMenu);
menuRoutes.delete("/dish",deleteFromMenu);

module.exports = menuRoutes