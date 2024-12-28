

import CourseCurriculum from '@/components/instructor-view/courses/add-new-course/course-curriculum'
import CourseLanding from '@/components/instructor-view/courses/add-new-course/course-landing-page'
import CourseSettings from '@/components/instructor-view/courses/add-new-course/course-settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'

function AddNewCoursePage() {
  return (
    <div className='container mx-auto p-4'>
        <div className='flex justify-between'>
            <h1 className='text-3xl font-extrabold mb-5'>Create a new course</h1>
            <Button className='text-sm tracking-wider font-bold px-8'>SUBMIT</Button>
        </div>
        <Card>
              <CardContent>
                <div className="container mx-auto p-4">
                  <Tabs defaultValue="curriculum" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="curriculum" className='p-1 mr-1 border-2 border-solid'>Curriculum</TabsTrigger>
                      <TabsTrigger value="course-landing-page" className='p-1 mr-1 border-2 border-solid'>
                        Course Landing Page
                      </TabsTrigger>
                      <TabsTrigger value="settings" className='p-1 border-2 border-solid'>Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curriculum">
                      <CourseCurriculum />
                    </TabsContent>
                    <TabsContent value="course-landing-page">
                      <CourseLanding />
                    </TabsContent>
                    <TabsContent value="settings">
                      <CourseSettings />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
    </div>
  )
}

export default AddNewCoursePage