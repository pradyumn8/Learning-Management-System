import InstructorCourses from '@/components/instructor-view/courses'
import { Button } from '@/components/ui/button'
import React from 'react'

function InstructorDashboardPage() {

  const menuItems = [
    {
      icon: BarChart,
      label : 'Dashboard',
      value : 'dashboard',
      component : <InstructorDashboardPage/>
    },
    {
      icon : Book,
      label : 'Courses',
      value : 'courses',
      component : <InstructorCourses/>
    },
    {
      icon : LogOut,
      label : 'Logout',
      value : 'logout',
      component : null
    }
  ]
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <aside className='w-64 bg-white shadow-md hidden md:block'>
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
        <nav>
{
  menuItems.map(menuItems=> <Button
  className="w-full justify-start mb-2"
  key={menuItem.value}
  >
    <menuItem.icon className="mr-2 h-4 w-4"/>
    {menuItem.label}
  </Button>)
}
        </nav>
      </div>
      </aside>
    </div>
  )
}

export default InstructorDashboardPage