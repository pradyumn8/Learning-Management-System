const mongoose = require('mongoose');
const StudentCourses = require('../../models/StudentCourses');

const getCoursesByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Validate studentId
        if (!mongoose.isValidObjectId(studentId)) {
            return res.status(400).json({ success: false, message: 'Invalid student ID provided.' });
        }

        // Fetch courses for the student
        const studentBoughtCourses = await StudentCourses.findOne({ userId: studentId });

        // Handle case when no data is found
        if (!studentBoughtCourses) {
            return res.status(404).json({
                success: true,
                message: 'No courses found for the given student ID.',
                data: [],
            });
        }

        // Return the courses
        res.status(200).json({
            success: true,
            data: studentBoughtCourses.courses,
        });
    } catch (error) {
        console.error('Error getting student courses:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting student courses.',
        });
    }
};

module.exports = { getCoursesByStudentId };
