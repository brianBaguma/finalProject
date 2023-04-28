"use strict";

const express = require("express");
const userControllor = require("../controllors/userController");

const route = express.Router();

route.get("/", userControllor.getAll);
route.post("/", userControllor.save);
route.put("/", userControllor.edit);
route.get("/:id", userControllor.findById);
route.delete("/:id", userControllor.delete);

module.exports = route;
