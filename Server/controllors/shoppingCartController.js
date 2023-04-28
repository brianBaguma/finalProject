"use strict";

const Product = require("../models/Product");
const User = require("../models/User");

exports.addProduct = (req, res) => {
  const product = Product.findById(req.body.productId);
  const user = User.findUserById(req.userId);

  let products = [];
  req.body.quantity
    ? (products = user.addProduct(product, req.body.quantity))
    : (products = user.addProduct(product));

  res
    .status(200)
    .json({ error: false, statusCode: 200, message: "", data: products });
};

exports.removeProduct = (req, res) => {
  const user = User.findUserById(req.userId);
  const products = user.removeProduct(req.body.productId);

  res
    .status(200)
    .json({ error: false, statusCode: 200, message: "", data: products });
};

exports.placeOrder = (req, res) => {
  const user = User.findUserById(req.userId);
  const cart = user.shoppingCart;

  for (let p of cart) {
    const product = Product.findById(p.id);
    product.quantity -= p.quantity;
    product.edit();
  }

  const products = user.resetShoppingCart();

  res
    .status(200)
    .json({ error: false, statusCode: 200, message: "", data: products });
};

exports.getUserCart = (req, res) => {
  const user = User.findUserById(req.userId);

  res.status(200).json({
    error: false,
    statusCode: 200,
    message: "",
    data: user.shoppingCart,
  });
};
