const mongoose = require('mongoose');

const soloRegistrationSchema = new mongoose.Schema({
    Name: {
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
    gameName: {
        type: String,
        required: true
    },
    prnNo: {
        type: String,
        required: true
    }
});

const soloRegistrationModel = mongoose.model('IndividualRegistration', soloRegistrationSchema);

module.exports = soloRegistrationModel;
