const express = require("express");
const {getLandingPage,getSoloRegisterPage, getBasketballRegisterPage,postContactForm, getCricketRegisterPage, getFootballRegisterPage, getKabaddiRegisterPage, getKhoKhoRegisterPage, postRegisterSoloForm ,postRegisterTeamForm} = require("../controller/homeController.js");

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

module.exports = router;