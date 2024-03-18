import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import search from "../../img/search.svg";
import Addmodal from "./helper/modal";
import { Header } from "../../components";
import useMyHook from "../../hooks/hooks";
import "./Student.scss";
import { url } from "../../context";

function Student() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [studentAll, setStudentAll] = useState({});
  const { studentCount } = useMyHook()

  useEffect(() => {
    fetch(url + `student/all`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudent(data)
        setStudentAll(data)
      });
  }, [studentCount]);

  const searchFN = (e) => {
    const text = e.target.value.toLowerCase()
    if (text) {
      setStudent({ data: studentAll.data.filter(e => e.username.toLowerCase().includes(text)) })
    } else {
      setStudent(studentAll)
    }
  }

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <Header />

          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Bizning o’quvchilar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input onChange={searchFN} className="xisobot_flex_inp" type="text" name="search" placeholder="Serach" />
              </div>
              <Addmodal />
            </div>

            <div>
              <div className="student">
                <div className="student_list">
                  <p className="student_list_text">№</p>
                  <p className="student_list_text2">O'quvchi</p>
                  <p className="student_list_text2">Telefon raqam</p>
                </div>

                <div className="student_box">
                  {student?.data?.map((e, i) => {
                    return (
                      <div
                        onClick={() => navigate("/student/" + e._id)}
                        className="student_box_list"
                        key={i + 1}
                      >
                        <div className="student_box_list_text">
                          <p>{i + 1}</p>
                        </div>
                        <div className="student_box_list_text2">
                          <p>{e.username}</p>
                        </div>
                        <div className="student_box_list_text2">
                          <p>{e.raqam}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
