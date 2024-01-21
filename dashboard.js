const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const routes = require("./routes/dashboardRoutes")
const env = require("dotenv").config()

const port = process.env.DASHBOARD_PORT;
const mongoURL = process.env.DATABASE_URL


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoURL);
    console.log("Connected to Database")
}

const app = express();


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



app.use("/", routes);





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
