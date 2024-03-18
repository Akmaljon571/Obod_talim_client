import { createContext, useState } from "react";

export const State = createContext()
export const url = 'http://localhost:2004/'
export const img_url = 'http://localhost:2004/image/'
export const video_url = ''

export const StatePriveder = ({ children }) => {
    const [teacherCount, setTeacherCount] = useState(0);
    const [groupCount, setGroupCount] = useState(0);
    const [yonalishCount, setYonalishCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);

    const data = { teacherCount, setTeacherCount, groupCount, setGroupCount, yonalishCount, setYonalishCount, studentCount, setStudentCount }
    return <State.Provider value={data}>{children}</State.Provider>
}