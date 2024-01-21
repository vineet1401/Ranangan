// models/Schedule.js
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    sportName: {
        type: String,
        require: true
    },
    dateTime: {
        type: Date,
        required: true,
    },
    coordinatorName: {
        type: String,
        required: true,
    },
    coordinatorContact: {
        type: String,
        required: true,
    },
    team1: {
        type: String,
        requried: true,
    },
    team2: {
        type: String,
        requried: true,
    },
    completed : {
        type : Boolean,
        default : false
    },
    winner : {
        type : String,
        default : ""
    },
    gameType:{
        type:String,
        default:"team"
    }
});

const teamScheduleModel = mongoose.model("TeamGameSchedule", scheduleSchema);

module.exports = teamScheduleModel;
