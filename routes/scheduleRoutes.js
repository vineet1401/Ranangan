const express = require("express")
const {
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
} = require("../controller/scheduleController.js");

const router = express.Router();

router.get("/schedule/", getSchedulePage)

router.get("/schedule/see/cricket", getCricketSchedule);

router.get("/schedule/see/football", getFootballSchedule);

router.get("/schedule/see/basketball", getBasketballSchedule);

router.get("/schedule/see/tabletennis", getTableTennisSchedule);

router.get("/schedule/see/khokho", getKhoKhoSchedule);
router.get("/schedule/see/kabaddi", getKabaddiSchedule);
router.get("/schedule/see/chess", getChessSchedule);
router.get("/schedule/see/carrom", getCarromSchedule);
router.get("/schedule/see/badminton", getBadmintonSchedule);
router.get("/schedule/see/athletics", getAthleticsSchedule);


module.exports = router;