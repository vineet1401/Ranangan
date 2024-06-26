const athleticScheduleModel = require("../models/athleticsSchema.js");
const teamScheduleModel = require("../models/teamGameSchema.js")

const images = {
    cricket : "/img/banners/Cricket.jpg",
    football : "/img/banners/Football.jpg",
    basketball : "/img/banners/Basketball.jpg",
    kabaddi : "/img/banners/Kabaddi.jpg",
    khokho : "/img/banners/Kho-Kho.jpg",
    chess : "/img/banners/Chess.jpg",
    carrom : "/img/banners/Carrom.jpg",
    badminton : "/img/banners/Badmintom.jpg",
    tabletennis : "/img/banners/TableTennis.jpg",
    athletics : "/img/banners/Athletics.jpg"
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
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Cricket"});
        const teamGames = await teamScheduleModel.find({sportName:"Cricket"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.cricket, sportName : "Cricket"});
}

const getFootballSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Football"});
        const teamGames = await teamScheduleModel.find({sportName:"Football"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.football, sportName : "Football"});
}

const getBasketballSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Basketball"});
        const teamGames = await teamScheduleModel.find({sportName:"Basketball"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.basketball, sportName : "Basketball"});
}

const getTableTennisSchedule = async (req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Table Tennis"});
        const teamGames = await teamScheduleModel.find({sportName:"Table Tennis"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.tabletennis, sportName : "Table Tennis"});
}

const getKhoKhoSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Kho-Kho"});
        const teamGames = await teamScheduleModel.find({sportName:"Kho-Kho"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.khokho, sportName : "Kho-Kho"});
}

const getKabaddiSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Kabaddi"});
        const teamGames = await teamScheduleModel.find({sportName:"Kabaddi"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.kabaddi, sportName : "Kabaddi"});
}

const getChessSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Chess"});
        const teamGames = await teamScheduleModel.find({sportName:"Chess"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.chess, sportName : "Chess"});
};

const getCarromSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Carrom"});
        const teamGames = await teamScheduleModel.find({sportName:"Carrom"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.carrom, sportName : "Carrom"});
};

const getBadmintonSchedule = async(req, res)=>{
    const teamschdeule = await teamScheduleModel.find({completed:false, sportName : "Badminton"});
        const teamGames = await teamScheduleModel.find({sportName:"Badminton"})
    return res.render("schedule.ejs", {registrations2:teamGames, schedule:teamschdeule, image:images.badminton, sportName : "Badminton"});
}

const getAthleticsSchedule = async(req, res)=>{
    const teamschdeule = await athleticScheduleModel.find({sportName : "Athletics"});
        const soloGames = await athleticScheduleModel.find({})
    return res.render("schedule.ejs", {registrations1:soloGames, schedule:teamschdeule, image:images.athletics, sportName : "Athletics"});
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