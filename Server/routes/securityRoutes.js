"use strict";

const express = require("express");

const securityController = require("../controllors/securityController");

const router = express.Router();

router.post("/", securityController.login);

module.exports = router;
