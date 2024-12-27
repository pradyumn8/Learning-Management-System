


import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentViewCommonLayout() {
  return (
    <div>
        common Content
        <Outlet/>
    </div>
  )
}

export default StudentViewCommonLayout