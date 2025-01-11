const Course = require('../../models/Course')
const StudentCourses = require('../../models/StudentCourses')


const getAllStudentViewCourses = async (req, res) => {
    try {
        const {
            category = '',
            level = '',
            primaryLanguage = '',
            sortBy = 'price-lowtohigh',
        } = req.query;

        // Initialize filters
        let filters = {};
        if (category) {
            filters.category = { $in: category.split(',') };
        }
        if (level) {
            filters.level = { $in: level.split(',') }; 
        }
        if (primaryLanguage) {
            filters.primaryLanguage = { $in: primaryLanguage.split(',') }; 
        }

        // Sorting parameters
        let sortParam = {};
        switch (sortBy) {
            case 'price-lowtohigh':
                sortParam.pricing = 1;
                break;

            case 'price-hightolow':
                sortParam.pricing = -1;
                break;

            case 'title-atoz':
                sortParam.title = 1;
                break;

            case 'title-ztoa':
                sortParam.title = -1;
                break;

            default:
                sortParam.pricing = 1;
                break;
        }

        // Fetch courses from the database
        const coursesList = await Course.find(filters).sort(sortParam);

        res.status(200).json({
            success: true,
            data: coursesList,
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching courses.',
        });
    }
};


const getStudentViewCourseDetails = async (req, res) => {
    try {

        const { id } = req.params;
        const courseDetails = await Course.findById(id);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'No course details found',
                data: null,
            });
        }

        // Check if the course is already bought by the student
        // const studentCourses = await StudentCourses.findOne({ 
        //     userId: studentId
        // });

        // console.log(studentCourses, 'studentCourses');
        // const ifStudentAlreadyBoughtCurrentCourse = 
        // studentCourses.courses.findIndex(item=> item.courseId === id) > -1;
        // console.log(ifStudentAlreadyBoughtCurrentCourse, 'studentCourses');

        res.status(200).json({
            success: true,
            data: ifStudentAlreadyBoughtCurrentCourse,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
};

const checkCoursePurchaseInfo = async (req, res) => {
    try {
        const {id, studentId} = req.params;
        const studentCourses = await StudentCourses.findOne({ userId: studentId });
        const ifStudentAlreadyBoughtCurrentCourse = studentCourses.courses.findIndex(item=> item.courseId === id) > -1;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
        
    }
}

module.exports = { getAllStudentViewCourses, getStudentViewCourseDetails, checkCoursePurchaseInfo }