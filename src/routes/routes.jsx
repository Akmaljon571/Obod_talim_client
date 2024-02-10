import { Route, Routes } from "react-router-dom";
import {
  Login,
  Xisobot,
  Teachers,
  TeachersStudents,
  Guruh,
  Student,
  Oneguruh,
  Onestudent,
  Statistika,
  GuruhTeacher,
  OneTeacherStudent,
  Yunalish,
} from "../page";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/xisobot" element={<Xisobot />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/teachers/:id" element={<TeachersStudents />} />
      <Route path="/groups" element={<Guruh />} />
      <Route path="/groups/:id" element={<Oneguruh />} />
      <Route path="/student" element={<Student />} />
      <Route path="/student/:id" element={<Onestudent />} />
      <Route path="/statistika" element={<Statistika />} />
      <Route path="/groups/teacher" element={<GuruhTeacher />} />
      <Route path="/groups/teacher/:id" element={<OneTeacherStudent />} />
      <Route path="/yunalish" element={<Yunalish />} />
      {/* <Route path="/*" element={<Error />} /> */}
    </Routes>
  );
}

export default Routers;
