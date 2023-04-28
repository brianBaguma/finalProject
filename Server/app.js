"use strict";

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const securityRoutes = require("./routes/securityRoutes");
const shoppingCartRoutes = require("./routes/shoppingCartRoutes");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// put routes here that don't user authentication
app.use("/login", securityRoutes);

// make sure token is provided
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    res.status(401).json({
      error: true,
      statusCode: 401,
      message: "Unauthorized",
      data: null,
    });
  }
  const token = auth.split(" ")[1];
  if (token === "null") {
    res.status(401).json({
      error: true,
      statusCode: 401,
      message: "Unauthorized",
      data: null,
    });
  }
  req.userId = token.split("-")[0];

  next();
});

// make sure user exists
app.use((req, res, next) => {
  try {
    const user = User.findUserById(req.userId);

    next();
  } catch (error) {
    res.status(404).json({
      error: true,
      statusCode: 404,
      message: error,
      data: null,
    });
  }
});

// put routes that need user authentication
app.use("/user/shopping-cart", shoppingCartRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => console.log("Server is listening on port 3000"));
