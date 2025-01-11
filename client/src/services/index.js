import axiosInstance from "@/api/axiosInstance";


export async function registerService(formData) {
    const data = await axiosInstance.post('/auth/register', {
        ...formData,
        role: 'user',
    })

    return data
}


export async function loginService(formData) {
    const data = await axiosInstance.post('/auth/login', formData)

    return data
}


// export async function checkAuthService() {
//     const data = await axiosInstance.get('/auth/check-auth')

//     return data
// }
export async function checkAuthService() {
    try {
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem("accessToken");

        // Ensure the token exists before making the request
        if (!token) {
            return { success: false, message: "No token found" };
        }

        // Make the API call with the Authorization header
        const response = await axiosInstance.get('/auth/check-auth', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Return the response data directly
    } catch (error) {
        console.error("Error in checkAuthService:", error.message);
        return { success: false, message: "Authentication failed" };
    }
}



export async function mediaUploadService(formData, onProgressCallback = () => { }) {
    const { data } = await axiosInstance.post("/media/upload", formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            if (typeof onProgressCallback === "function") {
                onProgressCallback(percentCompleted);
            } else {
                console.warn("onProgressCallback is not a function");
            }
        },
    });
    return data;
}


export async function mediaDeleteService(id) {
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);

    return data;
}

export async function fetchInstructorCourseListService() {
    const { data } = await axiosInstance.get(`/instructor/course/get`);

    return data;
}

export async function addNewCourseService(formData) {
    const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

    return data;
}


export async function fetchInstructorCourseDetailsService(id) {
    const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`);

    return data;
}



export async function updateCourseByIdService(id, formData) {
    const { data } = await axiosInstance.put(
        `/instructor/course/update/${id}`,
        formData
    );

    return data;
}



export async function mediaBulkUploadService(formData, onProgressCallback = () => { }) {
    const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            if (typeof onProgressCallback === "function") {
                onProgressCallback(percentCompleted);
            } else {
                console.warn("onProgressCallback is not a function");
            }
        },
    });
    return data;
}



export async function fetchStudentCourseListService(query) {
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);
  
    return data;
  }



export async function fetchStudentViewCourseDetailsService(courseId) {
    const { data } = await axiosInstance.get(
        `/student/course/get/details/${courseId}}`
    );
  
    return data;
  }


export async function checkCoursePurchaseInfoService(courseId) {
    const { data } = await axiosInstance.get(
        `/student/course/purchase-info/${courseId}/${studentId}`
    );
  
    return data;
  }


export async function createPaymentService(formData) {
    try {
        const { data } = await axiosInstance.post(`/student/order/create`, formData);
        return data;
    } catch (error) {
        console.error("Error in createPaymentService:", error);
        return { success: false, error: error.response?.data?.message || "An error occurred" };
    }
}

export async function captureAndFinalizePaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
    //   const { data } = await axiosInstance.post(`/student/order/capture`, captureData);
      const { data } = await axiosInstance.post(`/student/order/capture`, {razorpay_order_id, razorpay_payment_id, razorpay_signature});
  
      return data;
    } catch (error) {
      console.error("Error in captureAndFinalizePaymentService:", error);
      return { success: false, error: error.response?.data?.message || "An error occurred" };
    }
  }



//   export async function fetchStudentBoughtCoursesService(studentId) {
//       const { data } = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
    
//       return data;
//     }
  

export async function fetchStudentBoughtCoursesService(studentId) {
    try {
        console.log(`Fetching bought courses for student ID: ${studentId}`);
        const { data } = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
        console.log('Fetched courses data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching student bought courses:', error);
        return { success: false, error: error.response?.data?.message || 'An error occurred' };
    }
}
  
  