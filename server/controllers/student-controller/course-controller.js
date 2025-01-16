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
          message: "No course details found",
          data: null,
        });
      }
  
      res.status(200).json({
        success: true,
        data: courseDetails,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };
  const checkCoursePurchaseInfo = async (req, res) => {
    try {
        const { id, studentId } = req.params;

        // Fetch the student's purchased courses
        const studentCourses = await StudentCourses.findOne({ userId: studentId });

        // If no record exists, the user has no purchased courses
        if (!studentCourses) {
            return res.status(200).json({
                success: true, // Explicit success for easier frontend handling
                data: false,   // No course is purchased
                message: "No courses purchased by this user.",
            });
        }

        // Check if the specified course is in the purchased list
        const ifStudentAlreadyBoughtCurrentCourse =
            studentCourses.courses.some(
                (item) => item.courseId.toString() === id.toString()
            );

        return res.status(200).json({
            success: true,
            data: ifStudentAlreadyBoughtCurrentCourse,
        });
    } catch (e) {
        console.error("Error in checkCoursePurchaseInfo:", e);

        return res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};

module.exports = { getAllStudentViewCourses, getStudentViewCourseDetails, checkCoursePurchaseInfo }