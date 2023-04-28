"use strict";

const express = require("express");
const shoppingCartController = require("../controllors/shoppingCartController");

const router = express.Router();

router.get("/", shoppingCartController.getUserCart);
router.post("/", shoppingCartController.addProduct);
router.post("/reduce", shoppingCartController.removeProduct);
router.post("/place-order", shoppingCartController.placeOrder);

module.exports = router;
