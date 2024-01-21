const mongoose = require('mongoose');

const teamRegistrationSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    captainName: {
        type: String,
        required: true
    },
    prnNo: {
        type: String,
        required: true
    },
    sportName : {
        type : String,
        required : true
    }
});

const teamRegistrationModel = mongoose.model('TeamRegistration', teamRegistrationSchema);

module.exports = teamRegistrationModel;
