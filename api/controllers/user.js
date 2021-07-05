const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        res.status(409).json({
          message: "The User Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User Created Successfully!",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status;
              });
          }
        });
      }
    })
    .catch();
};

exports.login_user = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          message: "Authorization Failed, as User Does Not Exist!",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              { email: user[0].email, userId: user[0].__id },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );
            res.status(200).json({
              message: "Authorization Successfull!",
              token: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: err,
      });
    });
};

exports.delete_user = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "The User Deleted Successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
