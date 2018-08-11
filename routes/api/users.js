const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/constants");
const passport = require("passport");
//Load user model
const User = require("../../model/User");
//load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@Route    GET /api/users/test
//@Desc     tests users route
//@Access   public
router.get("/test", (req, res) => {
  res.send("hello from users");
});

//@Route    POST /api/users/register
//@Desc     register a user
//@Access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //first find if user exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg",
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@Route    POST /api/users/login
//@Desc     login user / returns JWT token
//@Access   public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find the user by email

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        // res.json({ msg: "success" });
        //create a JWT token and send it back to the user

        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            msg: "success",
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "wrong password";
        res.status(400).json(errors);
      }
    });
  });
});

//@Route    POST /api/users/current
//@Desc     return current user
//@Access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
