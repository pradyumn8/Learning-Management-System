import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { getCurrentCourseProgressService } from "@/services";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useContext, useEffect, useState } from "react";
import Confetti from 'react-confetti';
import { useNavigate, useParams } from "react-router-dom";


function StudentViewCourseProgressPage() {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [StudentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState(StudentContext);
  const [lockCourse, setLockCourse] = useState(false)
  const [currentLecture, setCurrentLecture] = useState(null)
  const [showCourseCompleteDiolog, setShowCourseCompleteDiolog] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    console.log(response, 'response');
    if (response?.success) {

      if (!response?.data?.isPurchased) {
        // console.log("isPurchased");

        setLockCourse(true)
      } else {
        setStudentCurrentCourseProgress({
          courseDatails: response?.data?.courseDatails,
          progress: response?.data?.progress
        })

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDiolog(true);
          setShowConfetti(true);

          return;
        }


        if (response?.data?.progress?.length === 0) {
          console.log(response?.data, "response?.data");

          setCurrentLecture(response?.data?.courseDatails?.curriculum[0])
        } else {
          // later

        }
      }
    }
  }

  // console.log(params);
  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id])

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 5000)
  }, [showConfetti]);

  // // console.log(lockCourse,'lockCourse');
  // console.log(StudentCurrentCourseProgress, 'StudentCurrentCourseProgress');
  console.log(currentLecture, 'currentLecture');


  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {
        showConfetti && <Confetti />
      }
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
          <h1 className="text-lg font-bold hidden md:block">
            {
              StudentCurrentCourseProgress?.courseDatails?.title
            }
          </h1>
        </div>
        <Button onClick={()=> setIsSideBarOpen(!isSideBarOpen)}>
          {
            isSideBarOpen ?
              <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
          }
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex ${isSideBarOpen ? 'mr-[400px]' : ''} transition-all duration-300`}>
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
          />
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>
        <div className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-1 border-gray-700 transition-all duration-300 ${isSideBarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Tabs defaultValue="content" className="h-full flex flex-col">
          <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
          <TabsTrigger value="content" className="text-black rounded-none h-full">
            Course Content
          </TabsTrigger>
          <TabsTrigger value="overview" className="text-black rounded-none h-full">
            Overview
          </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
          <Scrolarea>
            
          </Scrolarea>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You Can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDiolog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Congratulations!
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>aYou have completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button>My Course Page</Button>
                <Button>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StudentViewCourseProgressPage