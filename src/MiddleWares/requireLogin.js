const { NextFunction } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({
      status: "failed",
      error: " Access denied",
    });
  const verifyToken = authorization.replace("Bearer ", "");
  jwt.verify(
    verifyToken,
    process.env.JWTSECRET,
    (err, payload) => {
      if (err)
        return res.status(401).json({
          status: "failed",
          error: " Access denied",
        });

      const { _id } = payload;
      User.findById(_id).then((currentUser) => {
        req.user = currentUser;
        next();
      });
    }
  );
};

module.exports = requireLogin;