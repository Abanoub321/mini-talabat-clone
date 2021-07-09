const express = require("express");
const { createUser ,getUser,loginUser, updateUserAddress} = require("../controller/usercontroller");
const requireLogin = require("../MiddleWares/requireLogin");

const userRoute = express.Router();

userRoute.post("/register",createUser);
userRoute.get('/:userId',getUser);
userRoute.post('/login',loginUser);
userRoute.put('/').use(requireLogin,updateUserAddress);

module.exports = userRoute