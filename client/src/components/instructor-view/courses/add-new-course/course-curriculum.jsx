import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { courseLandingInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import { mediaUploadService } from '@/services';
import React, { useContext } from 'react';


function CourseCurriculum() { 
  
  const { courseCurriculumFormData, setCourseCurriculumFormData, mediaUploadProgress, setMediaUploadProgress} = useContext(InstructorContext);

  function handleNewLecture(){
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseLandingInitialFormData[0]
      }
    ])
  }


  function handleCourseTitleChange(event, currentIndex){
    let cpyCourseCurriculamFormData = [...courseCurriculumFormData];
    // console.log(cpyCourseCurriculamFormData,'cpyCourseCurriculamFormData');
    cpyCourseCurriculamFormData[currentIndex] = {
      ...cpyCourseCurriculamFormData[currentIndex],
      title : event.target.value
    }
    // console.log(cpyCourseCurriculamFormData, 'cpyCourseCurriculamFormData')
    setCourseCurriculumFormData(cpyCourseCurriculamFormData)
  }
  
  function handleFreePreviewChange(currentValue, currentIndex){
    let cpyCourseCurriculamFormData = [...courseCurriculumFormData];
    // console.log(cpyCourseCurriculamFormData,'cpyCourseCurriculamFormData');
    cpyCourseCurriculamFormData[currentIndex] = {
      ...cpyCourseCurriculamFormData[currentIndex],
      freePreview : currentValue,
    };
    // console.log(cpyCourseCurriculamFormData, 'cpyCourseCurriculamFormData')
    setCourseCurriculumFormData(cpyCourseCurriculamFormData)
  }

  async function handleSingleLectureUpload(event, currentIndex){
    console.log(event.target.files);
    const selectedFile = event.target.files[0];

    if(selectedFile){
      const videoFormData = new FormData();
      videoFormData.append('file',selectedFile)

      console.log(typeof mediaUploadProgress, 'Type of mediaUploadProgress');

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        
        console.log(response, 'response');

      } catch (error) {
        console.log(error) 
      }
    }
  }

  console.log(courseCurriculumFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData?.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className='flex gap-5 items-center'>
              <h3 className="font-semibold">Lecture {index + 1}</h3>
              <Input
              name={`title-${index+1}`}
              placeholder="Enter lecture title"
              className='max-w-96'
              onChange={(event)=> handleCourseTitleChange(event,index)}
              value={courseCurriculumFormData[index]?.title}
              />
              <div className="flex items-center space-x-2">
                <Switch onCheckedChange={(value)=> handleFreePreviewChange(value, index)}
                checked={courseCurriculumFormData[index]?.freePreview}
                id={`freePreview-${index+1}`}
                />
                <Label htmlFor={`freePreview-${index+1}`}>Free Preview</Label>
              </div>
                <div className='mt-6'>
                  <Input type="file" accept="video/*" onChange={(event)=> handleSingleLectureUpload(event,index)} className="mb-4"/>
                </div>
            </div>
            </div>  
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
