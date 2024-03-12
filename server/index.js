require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const connection = require("./models/users");

connection()

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port $...'));

