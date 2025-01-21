const Course = require('../../models/Course')


const addNewCourse = async (req, res) => {
    try {

        const courseData = req.body;
        const newlyCreatedCourse = new Course(courseData);
        const saveCourse = await newlyCreatedCourse.save();

        if (saveCourse) {
            res.status(201).json({
                success: true,
                message: 'Course saved Successfully',
                data: saveCourse
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}


const getAllCourses = async (req, res) => {
    try {

        const courseList = await Course.find({});

            // deletion of course
            const activeCourses = courseList.filter((course) => course.isDeleted!==true);
        res.status(200).json(
            {
                success: true,
                data: activeCourses
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}


const getCourseDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const courseDetails = await Course.findById(id);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Course not found!'
            })
        }
        res.status(200).json({
            success: true,
            data: courseDetails
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData, { new: true })
        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: 'Course not found!'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Course updated Successfully',
            data: updatedCourse
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

const deleteCourseById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCourse = await Course.findByIdAndUpdate(id, { isDeleted: true });
  
      if (!deletedCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found!'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Course has been marked as deleted and hidden from student view.',
        data: null
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Some error occurred!'
      });
    }
  };
  
module.exports = { addNewCourse, getAllCourses,deleteCourseById ,updateCourseById, getCourseDetailsById }