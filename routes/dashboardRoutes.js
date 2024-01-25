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



router.get("/", getDashboard);
router.get("/athletics", getAthleticPage);
router.get("/cricket", getCricketPage);
router.get("/football", getFootballPage);
router.get("/khokho", getkhokhoPage);
router.get("/kabaddi", getKabaddiPage);
router.get("/basketball", getBasketballPage);
router.get("/chess", getChessPage);
router.get("/carrom", getCarromPage);
router.get("/badminton", getBadmintonPage);
router.get("/tabletennis", getTableTennisPage);

router.post("/one/athletics", postAthleticSchedule);
router.post("/team/schedule",[
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

router.get("/team/cancel/:id", getCancelTeamGame)
router.post("/team/declare/:id", postTeamGameWinner)
router.get("/solo/cancel/:id", getCancelSoloGame)
router.post("/solo/declare/:id", postSoloGameWinner)
router.get("/contactissue", getContactIssuePage)
router.get("/resolve/:id", getResolveIssue)
router.get('/registrations', getRegistrationPage);

router.get("/logout", logout);


module.exports = router;