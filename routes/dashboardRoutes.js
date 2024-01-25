const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
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


module.exports = router;