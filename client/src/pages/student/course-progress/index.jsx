import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { getCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function StudentViewCourseProgressPage() {

    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [StudentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState(StudentContext);
    const [lockCourse, setLockCourse] = useState(false)
    const [currentLecture, setCurrentLecture] = useState(null)
    const [showCourseCompleteDiolog, setShowCourseCompleteDiolog] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    const {id} = useParams();

    async function fetchCurrentCourseProgress() {
      const response = await getCurrentCourseProgressService(auth?.user?._id,id);
      console.log(response,'response');
      if(response?.success){
        if(!response?.data?.isPurchased) {
          setLockCourse(true)
        } else {
          setStudentCurrentCourseProgress({
            courseDatails : response?.data?.courseDatails,
            progress : response?.data?.progress
          })

          if(response?.data?.completed){
            setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
            setShowCourseCompleteDiolog(true);
            setShowConfetti(true);

            return  
          }
        }
      }
    }

    // console.log(params);
    useEffect(()=>{
      fetchCurrentCourseProgress();
    },[id])
    
  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
        <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
            <div className="flex items-center space-x-4">
            <Button
            onClick={() => navigate("/student-courses")}
            className="text-black bg-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1></h1>
            </div>
        </div>
    </div>
  )
}

export default StudentViewCourseProgressPage