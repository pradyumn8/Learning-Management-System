import {Outlet} from 'react-router-dom'
import StudentViewCommonHeader from '../components/student-view/header';

function StudentViewCommonLayout() {
  return (
    <div>
        <StudentViewCommonHeader/>
        <Outlet/>
    </div>
  );
}

export default StudentViewCommonLayout