import "./Xisobot.scss";
import Layout from "../Layout/Layout";
import studentphoto from "../../img/iconstudent.png";
import teacher1 from "../../img/iconteacher.png";
import guruh1 from "../../img/iconguruhlar.png";
import ketganlar from "../../img/iconketganlar.png";
import { useEffect, useState } from "react";

function Xisobot() {
  const token = localStorage.getItem("token");
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [guruh, setGuruh] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2004/teacher/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:2004/guruh/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:2004/student/all", {
      headers: {
        authorization: JSON.parse(token),
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
            <h2 className="xisobot_box_h2">Xisobot</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div>
            <ul className="xisobot_list">
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={studentphoto} alt="" width={70} height={80} />
                  <p className="xisobot_list_item_box_text">O‘quvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {student.length} <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={guruh1} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">Guruhlar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {guruh.length} <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={teacher1} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">O‘qituvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {teacher.length} <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={ketganlar} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">
                    Shu oy tark etganlar
                  </p>
                </div>
                <p className="xisobot_list_item_text">
                  0 <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Xisobot;
