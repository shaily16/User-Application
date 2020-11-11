'use strict';

var mongoose = require('mongoose');
var Students = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        default: ''
    },
    last_name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    number: {
        type: String,
        required: true,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

var Students = mongoose.model('Students', Students);
module.exports = Students;