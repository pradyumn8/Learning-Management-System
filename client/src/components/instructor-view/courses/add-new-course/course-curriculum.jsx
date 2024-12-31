import MediaProgressbar from '@/components/media-progress-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import VideoPlayer from '@/components/video-player';
import { courseLandingInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import { mediaDeleteService, mediaUploadService } from '@/services';
import React, { useContext } from 'react';


function CourseCurriculum() {

  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage
  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseLandingInitialFormData[0]
      }
    ])
  }


  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculamFormData = [...courseCurriculumFormData];
    // console.log(cpyCourseCurriculamFormData,'cpyCourseCurriculamFormData');
    cpyCourseCurriculamFormData[currentIndex] = {
      ...cpyCourseCurriculamFormData[currentIndex],
      title: event.target.value
    }
    // console.log(cpyCourseCurriculamFormData, 'cpyCourseCurriculamFormData')
    setCourseCurriculumFormData(cpyCourseCurriculamFormData)
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculamFormData = [...courseCurriculumFormData];
    // console.log(cpyCourseCurriculamFormData,'cpyCourseCurriculamFormData');
    cpyCourseCurriculamFormData[currentIndex] = {
      ...cpyCourseCurriculamFormData[currentIndex],
      freePreview: currentValue,
    };
    // console.log(cpyCourseCurriculamFormData, 'cpyCourseCurriculamFormData')
    setCourseCurriculumFormData(cpyCourseCurriculamFormData)
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append('file', selectedFile)

      console.log(typeof mediaUploadProgress, 'Type of mediaUploadProgress');

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
        if (response.success) {
          let cpyCourseCurriculamFormData = [...courseCurriculumFormData];
          cpyCourseCurriculamFormData[currentIndex] = {
            ...cpyCourseCurriculamFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id
          }
          setCourseCurriculumFormData(cpyCourseCurriculamFormData)
          setMediaUploadProgress(false);
        }
        console.log(response, 'response');

      } catch (error) {
        console.log(error)
      }
    }
  }

  
  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );
    
    console.log(deleteCurrentMediaResponse,'deleteCurrentMediaResponse')

    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
          item.title.trim() !== "" &&
          item.videoUrl.trim() !== ""
      );
    });
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
        {
          mediaUploadProgress ?
            <MediaProgressbar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercentage}
            /> : null
        }
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData?.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className='flex gap-5 items-center'>
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className='max-w-96'
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
                </div>
                <div className="mt-6">
                  {courseCurriculumFormData[index]?.videoUrl ? (
                    <div className="flex gap-3">
                      <VideoPlayer
                        url={courseCurriculumFormData[index]?.videoUrl}
                        width="450px"
                        height="200px"
                      />
                      <Button onClick={() => handleReplaceVideo(index)}>
                        Replace Video
                      </Button>
                      <Button
                        onClick={() => handleDeleteLecture(index)}
                        className="bg-red-900"
                      >
                        Delete Lecture
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(event) =>
                        handleSingleLectureUpload(event, index)
                      }
                      className="mb-4"
                    />
                  )}
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
