import { createContext, useState } from "react";



export const StudentContext = createContext(null)

<<<<<<< HEAD
export default function StudentProvider({ children }) {
    const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);
    const [loadingState, setLoadingState] = useState(true)

    return <StudentContext.Provider
        value={{ studentViewCoursesList, setStudentViewCoursesList, loadingState, setLoadingState }}
=======
export default function StudentProvider({children}){    
    const [studentViewCoursesList, setStudentViewCoursesList]=useState([]);
    const [loadingState,setLoadingState]=useState(true)
    
    return <StudentContext.Provider 
    value={{studentViewCoursesList, setStudentViewCoursesList,loadingState,setLoadingState}}
>>>>>>> 436afd0449a690c28ef6976b52bb435e856d7024
    >
        {children}
    </StudentContext.Provider>
}