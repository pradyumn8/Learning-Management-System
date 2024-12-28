import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard";
import Authpage from "./pages/auth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";

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
      <Route path="" element={<StudentHomePage/>}/>
      <Route path="home" element={<StudentHomePage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
