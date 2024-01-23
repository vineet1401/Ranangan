const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const mongoose = require('mongoose');
const env = require("dotenv").config()

const checkAuthentication = require('./services/authentication.js');
const homeRoutes = require("./routes/homeRoutes.js");
const scheduleRoutes = require("./routes/scheduleRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const mongoURL = process.env.DATABASE_URL
const port = process.env.WEBSITE_PORT

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

// Home Routes
app.use("/dashboard",checkAuthentication("token"), dashboardRoutes)
app.use("/", homeRoutes);
app.use("/schedule", scheduleRoutes)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
