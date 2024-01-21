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

router.get("/", getSchedulePage)

router.get("/see/cricket", getCricketSchedule);

router.get("/see/football", getFootballSchedule);

router.get("/see/basketball", getBasketballSchedule);

router.get("/see/tabletennis", getTableTennisSchedule);

router.get("/see/khokho", getKhoKhoSchedule);
router.get("/see/kabaddi", getKabaddiSchedule);
router.get("/see/chess", getChessSchedule);
router.get("/see/carrom", getCarromSchedule);
router.get("/see/badminton", getBadmintonSchedule);
router.get("/see/athletics", getAthleticsSchedule);


module.exports = router;