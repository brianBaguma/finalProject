"use strict";

const User = require("../models/User");

exports.login = (req, res) => {
  try {
    const user = User.findUserByUsername(req.body.username);
    if (user.password != req.body.password) throw "Password is incorrect!";

    res.status(200).json({
      error: false,
      statusCode: 200,
      message: "Token generated successfully!",
      data: { token: `${user.id}-${user.username}-${Date.now().toString()}` },
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      statusCode: 404,
      message: error,
      data: null,
    });
  }
};
