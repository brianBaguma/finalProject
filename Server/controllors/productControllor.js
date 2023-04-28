"use strict";

const Product = require("../models/Product");

exports.save = (req, res) => {
  const product = new Product(
    req.body.name,
    req.body.price,
    req.body.image,
    req.body.quantity
  ).save();

  res.status(201).json({
    error: false,
    statusCode: 201,
    data: product,
    message: "Product created successfully!",
  });
};

exports.edit = (req, res) => {
  let product = new Product(
    req.body.name,
    req.body.price,
    req.body.image,
    req.body.quantity,
    req.body.id
  );

  try {
    product = product.edit();

    res
      .status(200)
      .json({
        error: false,
        statusCode: 200,
        data: product,
        message: "Product updated successfully!",
      });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};

exports.getAll = (req, res) => {
  res.status(200).json({
    error: false,
    statusCode: 200,
    message: "",
    data: Product.getAll(),
  });
};

exports.findById = (req, res) => {
  try {
    const product = Product.findById(req.params.id);

    res
      .status(200)
      .json({ error: false, statusCode: 200, message: "", data: product });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};

exports.delete = (req, res) => {
  try {
    const product = Product.delete(req.params.id);

    res.status(200).json({
      error: false,
      statusCode: 200,
      message: "Product deleted successfully!",
      data: product,
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: true, statusCode: 404, message: error, data: null });
  }
};
