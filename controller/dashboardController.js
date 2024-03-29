const athleticScheduleModel = require("../models/athleticsSchema.js");
const teamScheduleModel = require("../models/teamGameSchema.js")
const soloRegistrationModel = require("../models/registrationSoloSchema")
const teamRegistrationModel = require("../models/registrationTeamSchema")
const contactFormModel = require("../models/contactFormSchema.js")
const { validationResult } = require('express-validator');

const getDashboard = async (req, res) => {
    
    try {
        // Use the countDocuments method to get the total count of documents in the Team game
        const totalCount1 = await teamRegistrationModel.countDocuments().exec();

        // Use the countDocuments method to get the total count of documents in the Solo game
        const totalCount2 = await soloRegistrationModel.countDocuments().exec();

        // count for registration 
        const registrationcount = totalCount1 + totalCount2;

        // Use the countDocuments method to get the total count of documents in the Athletic Schedule
        const totalCount3 = await athleticScheduleModel.countDocuments({});

        // Use the countDocuments method to get the total count of documents in the Team Schedule
        const totalCount4 = await teamScheduleModel.countDocuments({});

        const ScheduleCount = totalCount3 + totalCount4;

        // Use the countDocuments method to get the count of completed Athletic Schedules
        const completedCount1 = await athleticScheduleModel.countDocuments({ completed: true }).exec();

        // Use the countDocuments method to get the count of completed Team Schedules
        const completedCount2 = await teamScheduleModel.countDocuments({ completed: true }).exec();

        const completedCount = completedCount1 + completedCount2;
        const PendingCount = ScheduleCount - completedCount;


        res.render("dashboard.ejs", { registrationcount, ScheduleCount, completedCount, PendingCount });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const getAthleticPage = async (req, res) => {
    const Match = await athleticScheduleModel.find({completed:false}).exec();
    const soloWinner = await athleticScheduleModel.find({ completed: true, gameType: "solo" }).exec()
    const registration = await soloRegistrationModel.find({})
    res.render("athletics.ejs", { scheduleMatch: Match, winnerList: soloWinner, registered:registration });
}
const getCricketPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Cricket" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Cricket" }).exec();
    const registered = await teamRegistrationModel.find({sportName :"Cricket"}).exec()
    res.render("teamgame.ejs", {registered:registered, sport: "Cricket", scheduleMatch: schedule, winnerList: teamWinner });
}

const getFootballPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Football" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Football" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Football"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Football", scheduleMatch: schedule, winnerList: teamWinner });
}

const getkhokhoPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Kho-Kho" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Kho-kho" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Kho-Kho"}).exec()
    res.render("teamgame.ejs", {registered:registered, sport: "Kho-Kho", scheduleMatch: schedule, winnerList: teamWinner });
}

const getKabaddiPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Kabaddi" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Kabaddi" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Kabaddi"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Kabaddi", scheduleMatch: schedule, winnerList: teamWinner });
}

const getBasketballPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Basketball" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Basketball" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Basketball"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Basketball", scheduleMatch: schedule, winnerList: teamWinner });
}

const getChessPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Chess" }).exec()
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Basketball" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Basketball"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Chess", scheduleMatch: schedule, winnerList: teamWinner });
}

const getCarromPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Carrom" }).exec();
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Carrom" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Carrom"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Carrom", scheduleMatch: schedule, winnerList: teamWinner });
}

const getBadmintonPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Badminton" }).exec();
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Badminton" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Badminton"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Badminton", scheduleMatch: schedule, winnerList: teamWinner });
}

const getTableTennisPage = async (req, res) => {
    const schedule = await teamScheduleModel.find({completed:false, sportName: "Table Tennis" }).exec();
    const teamWinner = await teamScheduleModel.find({ completed: true, sportName: "Table Tennis" }).exec();
    const registered = await teamRegistrationModel.find({sportName : "Table Tennis"}).exec();
    res.render("teamgame.ejs", {registered:registered, sport: "Table Tennis", scheduleMatch: schedule, winnerList: teamWinner });
}

const postAthleticSchedule = async (req, res) => {
    try {
        const {
            sportName,
            dateTime,
            participants,
            coordinatorName,
            coordinatorContact,
        } = req.body;
        const athleticsInstance = new athleticScheduleModel({
            sportName,
            participants,
            dateTime,
            coordinatorName,
            coordinatorContact,
        });
        const data = await athleticsInstance.save();
        res.status(200).send("<h1>Match Scheduled Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");
    } catch (error) {
        res.status(400).send("<h1>Try Again</h1> <br/> <a href='/dashboard'>Go Home</a>");
    }
};


const postTeamSchedule = async (req, res) => {
    const { sportName, dateTime, coordinatorName, coordinatorContact, team1, team2 } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const schedule = await teamScheduleModel.create({
            sportName: sportName,
            dateTime: dateTime,
            coordinatorName: coordinatorName,
            coordinatorContact: coordinatorContact,
            team1: team1,
            team2: team2
        });
        res.status(200).send("<h1>Match Scheduled Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");

    } catch (err) {
        res.status(400).send("<h1>Try Again</h1> <br/> <a href='/dashboard'>Go Home</a>");
    }
}

const getCancelTeamGame = async (req, res) => {
    const id = req.params.id;
    await teamScheduleModel.deleteOne({ _id: id }).exec();
    return res.status(200).send("<h1>Match Cancelled Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");
}

const getCancelSoloGame = async (req, res) => {
    const id = req.params.id;
    await athleticScheduleModel.deleteOne({ _id: id }).exec();
    return res.status(200).send("<h1>Match Cancelled Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");
}

const postTeamGameWinner = async (req, res) => {
    const { winner } = req.body;
    const id = req.params.id;
    await teamScheduleModel.findByIdAndUpdate(id, { winner: winner}).exec();
    await teamScheduleModel.findByIdAndUpdate(id, { completed: true }).exec();
    return res.status(200).send("<h1>Winner Declared Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");
}

const postSoloGameWinner = async (req, res) => {
    const { winner } = req.body;
    const id = req.params.id;
    await athleticScheduleModel.findByIdAndUpdate(id, { winner: winner }).exec();
    await athleticScheduleModel.findByIdAndUpdate(id, { completed: true }).exec();
    return res.status(200).send("<h1>Winner Declared Successfull</h1> <br/> <a href='/dashboard'>Go Home</a>");
}

const getContactIssuePage = async (req, res) => {
    const contactIssue = await contactFormModel.find({}).exec();
    res.render("contactIssue.ejs", { contactQueries: contactIssue })
}

const getResolveIssue = async (req, res) => {
    await contactFormModel.findByIdAndDelete({ _id: req.params.id }).exec();
    res.redirect('/contactissue');
}

const getRegistrationPage = async (req, res) => {
    try {
        // Fetch all registrations from the database
        const soloParticipants = await soloRegistrationModel.find({}).exec();
        const teamParticipants = await teamRegistrationModel.find({}).exec();

        // Render the EJS file and pass the registrations data
        res.render('gameRegistration.ejs', { soloParticipants, teamParticipants });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).send('Internal Server Error');
    }
}
const logout = async(req, res)=>{
    if(req.session){
        res.clearCookie("token")
        return res.redirect("/")
    }
    res.clearCookie("token")
    return res.redirect("/")
}

module.exports = {
    logout,
    postTeamGameWinner,
    postSoloGameWinner,
    getContactIssuePage,
    getRegistrationPage,
    getResolveIssue,
    getAthleticPage,
    getBadmintonPage,
    getBasketballPage,
    getCancelSoloGame,
    getCancelTeamGame,
    getCarromPage,
    getChessPage,
    getCricketPage,
    getContactIssuePage,
    getDashboard,
    getFootballPage,
    getKabaddiPage,
    postAthleticSchedule,
    postTeamSchedule,
    getTableTennisPage,
    getkhokhoPage
}