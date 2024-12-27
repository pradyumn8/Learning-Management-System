import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard";
import Authpage from "./pages/auth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";

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
      <Route path="" element={<StudentHomePage/>}/>
      <Route path="home" element={<StudentHomePage/>}/>
    </Routes>
  );
}

export default App;
