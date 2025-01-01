import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard";
import Authpage from "./pages/auth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCommonLayout from "./student-view/common-layout";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";

function App() {

  const {auth} = useContext(AuthContext)

  return (
    <Routes>
      <Route
      path="/auth"
      element={
        <RouteGuard
        element={<Authpage/>}
        authenticated={auth.authenticate}
        user={auth?.user}
        />
      }
      />
      <Route
      path="/instructor"
      element={
        <RouteGuard
        element={
          <InstructorDashboardPage/>
        }
        authenticated={auth?.authenticate}
        user={auth?.user}
        />
      }
     />
      <Route
      path="/instructor/create-new-course"
      element={
        <RouteGuard
        element={
          <AddNewCoursePage/>
        }
        authenticated={auth?.authenticate}
        user={auth?.user}
        />
      }
     />
      <Route
      path="/instructor/edit-course/:courseId"
      element={
        <RouteGuard
        element={
          <AddNewCoursePage/>
        }
        authenticated={auth?.authenticate}
        user={auth?.user}
        />
      }
     />
      <Route
      path="/"
      element={
        <RouteGuard
        element={
          <StudentViewCommonLayout/>
        }
        authenticated={auth?.authenticate}
        user={auth?.user}
        />
      }
     >

      
      <Route path="" element={<StudentHomePage/>}/>
      <Route path="home" element={<StudentHomePage/>}/>
      <Route path="courses" element={<StudentViewCoursesPage/>}/>
      <Route path="course/details/:id" element={<StudentViewCourseDetailsPage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
