const mongoose = require("mongoose");

const athleticsSchema = new mongoose.Schema({
sportName: {
    type: String,
    required: true,
},
participants: {
    type: [],
    default:[],
    required: true,
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
completed : {
    type : String,
    default : false
},
winner : {
    type : String,
    default : ""
}, 
gameType:{
    type:String,
    default:"solo"
}
});

const athleticScheduleModel = mongoose.model("athletic",athleticsSchema);

module.exports = athleticScheduleModel;
