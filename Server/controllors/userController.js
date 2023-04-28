"use strict";

const User = require("../models/User");

exports.save = (req, res) => {
  const user = new User(req.boby.username, req.boby.password);

  res.status(201).json({
    error: false,
    statusCode: 201,
    message: "User created successfully!",
    data: user,
  });
};

exports.edit = (req, res) => {
  let user = new User(req.boby.username, req.boby.password, req.boby.id);

  try {
    user = user.edit();

    res.status(200).json({
      error: false,
      statusCode: 200,
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};

exports.getAll = (req, res) => {
  // console.log("ok");
  res
    .status(200)
    .json({ error: false, statusCode: 200, message: "", data: User.getAll() });
};

exports.findById = (req, res) => {
  try {
    const user = User.findUserById(req.params.id);

    res
      .status(200)
      .json({ error: false, statusCode: 200, message: "", data: user });
  } catch (error) {
    res.status(404).json({
      error: true,
      statusCode: 404,
      message: error,
      data: null,
    });
  }
};

exports.findByUsername = (req, res) => {
  try {
    const user = User.findUserByUsername(req.params.username);

    res
      .status(200)
      .json({ error: false, statusCode: 200, message: "", data: user });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};

exports.delete = (req, res) => {
  try {
    const user = User.deleteUser(req.params.id);

    res.status(200).json({
      error: false,
      statusCode: 200,
      message: "User deleted successfully!",
      data: user,
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};
