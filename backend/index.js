const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const ConnectDB = require("./config/Database");

const UserRoutes = require("./routes/UserRoutes");

const app = express();

dotenv.config();

ConnectDB();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  console.log(req.path, req.method);
  next();
});

// a
app.use('/api/users', UserRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Barangay E-Services Management System's API",
    usage: [
      "GET /api/services for managing services of barangay",
    ],
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);