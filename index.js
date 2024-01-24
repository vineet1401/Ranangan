const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const mongoose = require('mongoose');
const env = require("dotenv").config()
let session = require("express-session");
let flash = require("connect-flash");
const formidableMiddleware = require("express-formidable-v2");
let sessionOptions = session({
  secret: "********",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100 * 60 * 60 * 24,
    httpOnly: true,
  },
});

const checkAuthentication = require('./services/authentication.js');
const homeRoutes = require("./routes/homeRoutes.js");
const scheduleRoutes = require("./routes/scheduleRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const mongoURL = process.env.DATABASE_URL
const port = process.env.WEBSITE_PORT || 4000;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoURL);
    console.log("Connected to Database")
}

const app = express();


app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));
app.use(cookieParser());
app.use(flash());
app.use(sessionOptions);
app.use(express.json({ limit: "25mb" }));
app.use(formidableMiddleware())

// Home Routes
app.use("/dashboard",checkAuthentication("token"), dashboardRoutes)
app.use("/", homeRoutes);
app.use("/schedule", scheduleRoutes)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
