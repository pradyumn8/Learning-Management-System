import { courseCurriculumInitialFormData } from "@/config";
import { createContext, useState } from "react";


export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }){

    const [courseLandingFormData, setCourseLandingFormData] = useState(courseCurriculumInitialFormData)

    return <InstructorContext.Provider value={{courseLandingFormData, setCourseLandingFormData}}>{children}</InstructorContext.Provider>
}