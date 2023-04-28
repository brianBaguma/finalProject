"use strict";

const express = require("express");
const productController = require("../controllors/productControllor");

const route = express.Router();

route.get("/", productController.getAll);
route.post("/", productController.save);
route.put("/", productController.edit);
route.get("/:id", productController.findById);
route.delete("/:id", productController.delete);

module.exports = route;
