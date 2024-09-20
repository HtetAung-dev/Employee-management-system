require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const db = require('./model');
const bodyParser = require("body-parser");
const corsMiddleware  = require("./middleware/cors.middleware");
const routeNotFound = require("./middleware/routeNotFound.middleware");
const sequelize = require("sequelize");
const auth = require('./routes/auth.routes');
const role = require('./routes/role.routes');
const user = require('./routes/user.routes');
const staff = require('./routes/staff.routes');
const department = require('./routes/department.routes');

// declare app to use Express
const app = express();
const port = process.env.SERVER_PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

// declare middleware function here
app.use(corsMiddleware);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



db.sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Successfully Synced with mySQL DB.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(port, () => {
  console.log(`App is listening at ${process.env.SERVER_HOST}${process.env.SERVER_PORT}`);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).json({ error: message });
});

// define routes
app.use('/api/v1/auth',auth);
app.use('/api/v1/role',role);
app.use('/api/v1/user', user);
app.use('/api/v1/staff',staff)
app.use('/api/v1/dept', department)


app.get('/helloworld', (req, res, next) => {
    return res.status(200).json({message: "Hello World"});
})

app.use(routeNotFound);