


import StudentViewCommonHeader from '@/components/student-view/header'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function StudentViewCommonLayout() {
  const location = useLocation()
  return (
    <div>
      {
        !location.pathname.includes('course-progress') ? (
          <StudentViewCommonHeader/>
        ) : null
      }
        <Outlet/>
    </div>
  )
}

export default StudentViewCommonLayout