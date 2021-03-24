const express = require("express");
const app = express();
const { items } = require("./fakeDb");

const itemRoutes = require("./items");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/items", itemRoutes);

module.exports = app



