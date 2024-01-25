const express = require("express");
const { check } = require('express-validator');

const {getLandingPage,getSoloRegisterPage, getBasketballRegisterPage,postContactForm, getCricketRegisterPage, getFootballRegisterPage, getKabaddiRegisterPage, getKhoKhoRegisterPage, postRegisterSoloForm ,postRegisterTeamForm, getLoginPage, postLoginPage} = require("../controller/homeController.js");

const {
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
    getDashboard,
    getFootballPage,
    getKabaddiPage,
    postAthleticSchedule,
    postTeamSchedule,
    getTableTennisPage,
    getkhokhoPage
  } = require("../controller/dashboardController.js")

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


router.get("/", getLandingPage);

router.get("/register/cricket", getCricketRegisterPage)

router.get("/register/football", getFootballRegisterPage)

router.get("/register/basketball", getBasketballRegisterPage)

router.get("/register/khokho", getKhoKhoRegisterPage)

router.get("/register/kabaddi", getKabaddiRegisterPage)

router.get("/register/individual", getSoloRegisterPage)

router.post("/register/team", postRegisterTeamForm)

router.post("/register/solo", postRegisterSoloForm)

router.post("/register/contact", postContactForm);

router.get("/login", getLoginPage);

router.post("/login", postLoginPage);


// dashboard
router.get("/dashboard/", getDashboard);
router.get("/dashboard/athletics", getAthleticPage);
router.get("/dashboard/cricket", getCricketPage);
router.get("/dashboard/football", getFootballPage);
router.get("/dashboard/khokho", getkhokhoPage);
router.get("/dashboard/kabaddi", getKabaddiPage);
router.get("/dashboard/basketball", getBasketballPage);
router.get("/dashboard/chess", getChessPage);
router.get("/dashboard/carrom", getCarromPage);
router.get("/dashboard/badminton", getBadmintonPage);
router.get("/dashboard/tabletennis", getTableTennisPage);

router.post("/dashboard/one/athletics", postAthleticSchedule);
router.post("/dashboard/team/schedule",[
  check('team1').notEmpty().withMessage('Team 1 is required'),
  check('team2')
    .notEmpty().withMessage('Team 2 is required')
    .custom((value, { req }) => {
      if (value === req.body.team1) {
        throw new Error('Team 1 and Team 2 should be different');
      }
      return true;
    }),
], postTeamSchedule);

router.get("/dashboard/team/cancel/:id", getCancelTeamGame)
router.post("/dashboard/team/declare/:id", postTeamGameWinner)
router.get("/dashboard/solo/cancel/:id", getCancelSoloGame)
router.post("/dashboard/solo/declare/:id", postSoloGameWinner)
router.get("/dashboard/contactissue", getContactIssuePage)
router.get("/dashboard/resolve/:id", getResolveIssue)
router.get('/dashboard/registrations', getRegistrationPage);

router.get("/dashboard/logout", logout);



// schedule

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