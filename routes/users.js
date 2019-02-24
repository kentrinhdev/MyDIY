const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('../model');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 8,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = '', email} = req.body;
  console.log(username, password, firstName, lastName, email);
  firstName = firstName.trim();
  lastName = lastName.trim();
  return User.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        console.log('There is existing user line 104');
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      console.log('No existing user line 112');
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        firstName,
        lastName,
        userName: username,
        password: hash,
        email
      });
    })
    .then(user => {
      console.log("User created");
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      console.log(err);
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.post('/login', jsonParser, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(username, password);

  let user;
  User.findOne({ userName: username })
    .then(_user => {
      user = _user;
      if (!user) {
        console.log("No user found!");
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return res.json(user.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      console.log(err);
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
  });

router.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;