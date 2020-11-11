'use strict';

var mongoose = require('mongoose'),
    Student = mongoose.model('Students'),
    Response = require('../helpers/response');

module.exports = {
    addStudent: addStudent,
    listStudent: listStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,

};

function addStudent(req, res) {
    async function addStudent() {
        if (!req.body.first_name && !req.body.last_name && !req.body.class) {
            return res.json(Response(402, "failed", "Please fill all the required fields."));
        } else {
            var studentData = {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "number": req.body.number,

            };
            Student.insertMany(studentData)
                .then(result => {

                    return res.json({
                        'code': 200,
                        'status': 'success',
                        "message": 'Student Added Successfully',
                        "data": result
                    });
                })
        }
    }
    addStudent().then();
}

function listStudent(req, res) {
    async function listStudent() {
        Student.find({
            isDeleted: false
        }).then(result => {
            return res.json({
                'code': 200,
                'status': 'success',
                "message": 'Student list get Successfully.',
                "data": result
            });
        });
    }
    listStudent().then();
}

function deleteStudent(req, res) {
    async function deleteStudent() {

        Student.findOneAndUpdate({ _id: req.body.student_id }, { $set: { isDeleted: true } })
            .then(result => {
                if (result) {
                    return res.json({
                        'code': 200,
                        'status': 'success',
                        "message": 'Student Deleted Successfully.',
                        "data": result
                    });
                }

            })

    }
    deleteStudent().then();
}

function searchStudent(req, res) {
    async function searchStudent() {
        Student.aggregate([
            { $match: { first_name: req.body.name } },
            { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id", as: "subjectsData" } }
        ]).then(result => {
            return res.json({
                'code': 200,
                'status': 'success',
                "message": 'Search Student list get Successfully.',
                "data": result
            });
        });
    }
    searchStudent().then();
}

function filterStudent(req, res) {
    async function filterStudent() {
        if (req.body.filter == 'class') {
            Student.aggregate([
                { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id", as: "subjectsData" } },
                { $sort: { "class": -1 } },
            ]).then(result => {
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Students Filter by Class Successfully.',
                    "data": result
                });
            });
        } else {
            Student.aggregate([
                { $lookup: { from: 'subjects', localField: "_id", foreignField: "student_id", as: "subjectsData" } },
                { $sort: { "subjects.subject": 1 } },
            ]).then(result => {
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Students  Filter by Subject Successfully.',
                    "data": result
                });
            });
        }
    }
    filterStudent().then();
}

function updateStudent(req, res) {
    async function updateStudent() {
        Student.findOneAndUpdate({ _id: req.body.student_id }, { $set: { first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, number: req.body.number } })
            .then(result => {
                console.log("result, ", result)
                return res.json({
                    'code': 200,
                    'status': 'success',
                    "message": 'Student Updated Successfully.',
                    "data": result
                });
            })
    }
    updateStudent().then();
}