'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ProjectSchema = mongoose.Schema({
  title: 'string',
  author: 'string',
  numberOfSteps: Number,
  description: 'string'
});

//User Schema
const UserSchema = mongoose.Schema({
  firstName: 'string',
  lastName: 'string',
  userName: {
    type: 'string',
    unique: true
  },
  password: 'string',
  email: 'string',
  activated: {
    type: Boolean,
    default: false
  },
  savedProjects: [
    ProjectSchema
  ]
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    email: this.email,
    activated: this.activated,
    savedProjects: this.savedProjects
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);
module.exports = {User, Project};