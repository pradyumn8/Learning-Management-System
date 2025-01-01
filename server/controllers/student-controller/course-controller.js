const Course = require('../../models/Course')



const getAllStudentViewCourses = async (req, res) => {
    try {
<<<<<<< HEAD
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
=======

        const { 
            category = [], 
            level = [], 
            primaryLanguage = [], 
            sortBy = "price-lowtohigh" 
        } = req.query

        let filters = {};
        if(category.length){
            filters.category={$in : category.split(',')}
        }
        if(level.length){
            filters.category={$in : level.split(',')}
        }
        if(primaryLanguage.length){
            filters.category={$in : primaryLanguage.split(',')}
        }

        let sortParam = {};
        switch (sortBy) {
            case 'price-lowtohigh':
                sortParam.pricing = 1
                break;
        
            case 'price-hightolow':
                sortParam.pricing = -1
                break;
        
            case 'title-atoz':
                sortParam.title = 1
                break;
        
            case 'title-ztoa':
                sortParam.title = -1
                break;
        
            default:
                sortParam.pricing = 1
                break;
        }

>>>>>>> 436afd0449a690c28ef6976b52bb435e856d7024
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
            })
        }
        res.status(200).json({
            success: true,
            data: courseDetails,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
};


module.exports = { getAllStudentViewCourses, getStudentViewCourseDetails }