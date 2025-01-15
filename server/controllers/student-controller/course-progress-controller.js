
const CourseProgress = require('../../models/CourseProgress');
const Course = require('../../models/Course');
const StudentCourses = require('../../models/StudentCourses');

// Mark current lecture as completed
const markCurrentLectureAsCompleted = async (req, res) => {
    try {
        const {userId, courseId, lectureId} = req.body;

        let progress = await CourseProgress.findOne({userId, courseId});

        if(!progress){
            progress = new CourseProgress({
                userId,
                courseId,
                lecturesProgress : [
                    {
                        lectureId, completed : true, dateCompleted: new Date()
                    }
                ]
            })
            await progress.save()
        } else {
            const lectureProgress = progress.lecturesProgress.find(item => item.lectureId === lectureId);
            
            if(lectureProgress){
                lectureProgress.completed = true;
                lectureProgress.dateViewed = new Date();
            } else {
                progress.lecturesProgress.push({
                    lectureId,
                    completed : true, dateCompleted: new Date()
                })
            }
            await progress.save()
        }

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success : false,
                message : 'Course not found'
            })
        }
        // check all the lectures are completed or not
        const allLecturesCompleted = progress.lecturesProgress.length ===
        course.curriculum.length && progress.lecturesProgress.every(item=>item.completed);

        if(allLecturesCompleted) {
            progress.completed = true;
            progress.completionDate = new Date();

            await progress.save()
        }

        res.status(200).json({
            success : true,
            message : 'Lecture',
            data : progress
        })

    } catch (error) {
        console.log(error)
        res.CourseProgress(500).json({ success: false, message: 'Error marking lecture as completed' })
    }
}

//get current lecture progress
const getCurrentCourseProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.params;

        const studentPurchasedCourses = await StudentCourses.findOne({ userId });

        const isCurrentCoursePurchasedByCurrentUserOrNot =
            studentPurchasedCourses?.courses?.findIndex(item => item.courseId === courseId) > -1;

        if (!isCurrentCoursePurchasedByCurrentUserOrNot) {
            return res.status(200).json({
                success: false,
                data: {
                isPurchased: true,
                },
                message: 'You have not purchased this course'
            })
        }

        const currentUserCourseProgress = await CourseProgress.findOne({ 
            userId, courseId });

        if (!currentUserCourseProgress || currentUserCourseProgress?.lectureProgress?.length === 0) {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: 'Course not found' })
            }
            return res.status(200).json({
                success: true,
                message: 'No progress found, you have not started the course yet',
                data: {
                    courseDetails: course,
                    progress: [],
                    isPurchased: true,
                    // completed: true,
                },
            });
        }

        const courseDetails = await Course.findById(courseId);


        res.status(200).json({
            success: true,
            message: 'Course progress found',
            data: {
                courseDetails,
                progress: currentUserCourseProgress.lecturesProgress,
                completed: currentUserCourseProgress.completed,
                completionDate: currentUserCourseProgress.completionDate,
                isPurchased: true
            },
        });

    } catch (error) {
        console.log(error)
        res.CourseProgress(500).json({ success: false, message: 'Error getting course progress' })
    }
}


//reset course progress

const resetCurrentCourseProgress = async (req, res) => {
    try {

        const {userId, courseId} = req.body;

        const progress = await CourseProgress.findOne({userId, courseId});

        if(!progress){
            return res.status(404).json({
                success : false,
                message : 'Progress not found!'
            })
        }

        progress.lecturesProgress = [];
        progress.completed = false;
        progress.completionDate = null;

        await progress.save();

        res.status(200).json({
            success : true,
            message : 'Course progress has been reset',
            data : progress
        })

    } catch (error) {
        console.log(error)
        res.CourseProgress(500).json({ success: false, message: 'Error resetting course progress' })

    }
};

module.exports = { markCurrentLectureAsCompleted, getCurrentCourseProgress, resetCurrentCourseProgress };