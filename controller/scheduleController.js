const athleticScheduleModel = require("../models/athleticsSchema.js");
const teamScheduleModel = require("../models/teamGameSchema.js")

const images = {
    cricket : "/img/banners/Cricket.png",
    football : "/img/banners/Football.png",
    basketball : "/img/banners/Basketball.png",
    kabaddi : "/img/banners/Kabaddi.png",
    khokho : "/img/banners/Kho-Kho.png",
    chess : "/img/banners/Chess.png",
    carrom : "/img/banners/Carrom.png",
    badminton : "/img/banners/Badmintom.png",
    tabletennis : "/img/banners/TableTennis.png",
    athletics : "/img/banners/Athletics.png"
}

const getSchedulePage = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false}).maxTimeMS(20000);
    const athleteschdeule = await athleticScheduleModel.find({completed:false}).maxTimeMS(20000);
    const teamGames = await teamScheduleModel.find({})
    const soloGames = await athleticScheduleModel.find({})
    const combine = teamschdeule.concat(athleteschdeule)
    return res.render("schedule.ejs", {schedule:combine, image:"/images/logo.jpg", registrations1:soloGames, registrations2:teamGames});
}

const getCricketSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Cricket"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.cricket, sportName : "Cricket"});
}

const getFootballSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Football"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.football, sportName : "Football"});
}

const getBasketballSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Basketball"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.basketball, sportName : "Basketball"});
}

const getTableTennisSchedule = async (req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Table Tennis"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.tabletennis, sportName : "Table Tennis"});
}

const getKhoKhoSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Kho-Kho"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.khokho, sportName : "Kho-Kho"});
}

const getKabaddiSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Kabaddi"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.kabaddi, sportName : "Kabaddi"});
}

const getChessSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Chess"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.chess, sportName : "Chess"});
};

const getCarromSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Carrom"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.carrom, sportName : "Carrom"});
};

const getBadmintonSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({sportName : "Badminton"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.badminton, sportName : "Badminton"});
}

const getAthleticsSchedule = async(req, res)=>{
    const teamschdeule = await athleticScheduleModel.find({sportName : "Athletics"});
    return res.render("schedule.ejs", {schedule:teamschdeule, image:images.athletics, sportName : "Athletics"});
}

module.exports = {
    getAthleticsSchedule,
    getSchedulePage,
    getCricketSchedule,
    getFootballSchedule,
    getBasketballSchedule,
    getTableTennisSchedule,
    getKhoKhoSchedule,
    getKabaddiSchedule,
    getChessSchedule,
    getCarromSchedule,
    getBadmintonSchedule
}