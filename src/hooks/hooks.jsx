import { useContext } from "react";
import { State } from "../context/index";

function useMyHook() {
  const { teacherCount, setTeacherCount, groupCount, setGroupCount, yonalishCount, setYonalishCount, studentCount, setStudentCount } = useContext(State);
  return {
    teacherCount,
    setTeacherCount,
    groupCount,
    setGroupCount,
    yonalishCount,
    setYonalishCount,
    studentCount,
    setStudentCount
  };
}

export default useMyHook;
