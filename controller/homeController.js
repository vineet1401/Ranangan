const soloRegistrationModel = require("../models/registrationSoloSchema")
const teamRegistrationModel = require("../models/registrationTeamSchema")
const contactFormModel = require("../models/contactFormSchema")
const { generateToken_JWT } = require("../services/jwtToken.js");


const getLandingPage = async (req, res) => {
    return res.render("index", { home: true });
}

const getCricketRegisterPage = async (req, res) => {
    res.render("registerTeam", { sportname: "Cricket", schedule: true });
}
const getFootballRegisterPage = async (req, res) => {
    res.render("registerTeam", { sportname: "Football", schedule: true });
}
const getKhoKhoRegisterPage = async (req, res) => {
    res.render("registerTeam", { sportname: "Kho-Kho", schedule: true });
}
const getBasketballRegisterPage = async (req, res) => {
    res.render("registerTeam", { sportname: "Basketball", schedule: true });
}
const getKabaddiRegisterPage = async (req, res) => {
    res.render("registerTeam", { sportname: "Kabaddi", schedule: true });
}
const getSoloRegisterPage = async (req, res) => {
    res.render("registerSolo", { sportname: "Individual", schedule: true });
}

const postRegisterTeamForm = async (req, res) => {
    const { sportName, teamName, departmentName, year, captainName, prnNo } = req.body;
    try {
        // Create a new document using the Mongoose model
        const newRegistration = new teamRegistrationModel({
            teamName,
            departmentName,
            year,
            captainName,
            prnNo,
            sportName
        });
        await newRegistration.save();
        res.redirect("/");
    } catch (error) {
        res.status(400).send("<h1>Try Again !!!</h1> ")
    }
};

const postRegisterSoloForm = async (req, res) => {
    const { Name, departmentName, year, gameName, prnNo } = req.body;
    try {
        const newRegistration = new soloRegistrationModel({
            Name,
            departmentName,
            year,
            gameName,
            prnNo
        });
        await newRegistration.save();
        // Render a thank you page or redirect as needed
        res.redirect("/");
    } catch (error) {
        console.error('Error saving to database:', error);
        // Handle the error (e.g., send an error response)
        res.status(400).send("<h1>Try Again !!!</h1> ")
    }
};

const postContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const contactFormInstance = new contactFormModel({
            name,
            email,
            subject,
            message,
        });
        await contactFormInstance.save();
        res.redirect("/");
    } catch (error) {
        res.redirect("/");
    }
};

const getLoginPage = async(req, res)=>{
    res.render("login.ejs")
}

const postLoginPage = async(req, res)=>{
    const {username, password} = req.body;
    const token = generateToken_JWT(username, password);
    return res.cookie('token', token, { maxAge: 60000 * 60}).redirect("/dashboard");
}


module.exports = {postLoginPage, getLoginPage, getLandingPage, getBasketballRegisterPage, getCricketRegisterPage, getFootballRegisterPage, getKabaddiRegisterPage, getKhoKhoRegisterPage,getSoloRegisterPage, postRegisterTeamForm, postRegisterSoloForm, postContactForm }