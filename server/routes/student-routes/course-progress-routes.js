const express = require('express');
const { 
    getCurrentCourseProgress,
    markCurrentLectureAsCompleted,
    resetCurrentCourseProgress
 } = require('../../controllers/student-controller/course-progress-controller');

const router = express.Router();

router.get('/get/:userId/:courseId', getCurrentCourseProgress);
router.post('/mark-lecture-viewed', markCurrentLectureAsCompleted);
router.post('/reset-progress', resetCurrentCourseProgress);

module.exports = router;