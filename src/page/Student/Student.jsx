import "./Student.scss";
import Layout from "../Layout/Layout";
import search from "../../img/search.svg";
import Addmodal from "./helper/modal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Student() {
  const token = JSON.parse(localStorage.getItem("token"));
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:2004/student/all`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">O‘quvchilar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Bizning o’quvchilar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input className="xisobot_flex_inp" type="text" name="search" />
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
