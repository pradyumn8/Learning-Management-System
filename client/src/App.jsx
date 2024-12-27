import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/auth';
import RouteGuard from './components/route-guard';
import { AuthContext } from './context/auth-context';
import InstructorDashboardPage from './pages/instructor';
import StudentViewCommonLayout from './components/student-view/common-layout';
import StudentHomePage from './pages/student/home';
import NotFoundPage from './pages/not-found';

function App() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth?.authenticate) {
      console.log("Redirecting based on role:", auth.user.role);
      if (auth.user.role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/");
      }
    }
  }, [auth, navigate]);
  
  return (
    <Routes>
      <Route 
        path='/auth' 
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route 
        path='/instructor' 
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route 
        path='/' 
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route path='' element={<StudentHomePage />} />
      <Route path='home' element={<StudentHomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
