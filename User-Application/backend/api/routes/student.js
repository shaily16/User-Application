'use strict';

module.exports = function(express) {
    var router = express.Router();
    var studentController = require('../controllers/StudentController');
    router.post('/add-student', studentController.addStudent);
    router.get('/list-student', studentController.listStudent);
    router.post('/delete-subject', studentController.deleteStudent);
    router.post('/update-student', studentController.updateStudent);
    return router;
}