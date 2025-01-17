const mongoose = require('mongoose');

const LetureProgressSchema = new mongoose.Schema({
    lectureId : String,
    viewed : Boolean,
    dateViewed : Date
})

const CourseProgressSchema = new mongoose.Schema({
    userId : String,
    courseId : String,
    completed : Boolean,
    completionDate : Date,
    lecturesProgress : [LetureProgressSchema]
});

module.exports = mongoose.model('Progress',CourseProgressSchema)