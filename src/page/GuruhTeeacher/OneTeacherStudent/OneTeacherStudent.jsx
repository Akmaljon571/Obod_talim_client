import "./OneTeacherStudent.scss";
import person from "../../../img/person.svg";
import LayoutTeacher from "../../LayoutTeacher/LayoutTeacher";
import UpdateStudent from "./UpdateStudent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OneTeacherStudent() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const token = JSON.parse(localStorage.getItem("token"));
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/one/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/student/guruh/${guruh?._id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data?.data));
  }, [guruh]);

  return (
    <>
      <div className="xisobot">
        <LayoutTeacher />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">O'quvchilar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div className="one_teacher_student">
            <li className="one_student_teacher">
              <div className="xisobot_flex_list_item_box">
                <p className="xisobot_flex_list_item_box_text">
                  {teacher.familiya} {teacher.username}
                </p>
                <div style={{ padding: "15px" }}>
                  <img src={person} width={130} alt="person" />
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Ism:</p>{" "}
                    <span>{teacher.username}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Yo‘nalishi:</p>{" "}
                    <span>{teacher.yonalish_id}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Tug’ilgan sana</p>{" "}
                    <span>{teacher.tugilgan_sana}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Telefon raqam:</p>{" "}
                    <span>+{teacher.raqam}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Ta’lim darajasi</p>{" "}
                    <span>{teacher.izoh}</span>
                  </div>
                </div>
                {/* ///////////////////////////////////////////////// */}
                <div style={{ padding: "15px", borderTop: "1px solid" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Guruh nomi</p>{" "}
                    <span>{guruh.title}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Ustoz</p>{" "}
                    <span>{teacher.username}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars kunlari</p>{" "}
                    <span>{guruh.kun}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars vaqti</p>{" "}
                    <span>{guruh.soat}</span>
                  </div>
                </div>
              </div>
            </li>

            {/* <div className="xisobot_flex_list_item_box box2">
                <div style={{ marginLeft: "15px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Guruh nomi</p> <span>fghnmhjh</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Ustoz</p> <span>hjk</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars kunlari</p> <span>01.01.01</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars vaqti</p> <span>+5678 </span>
                  </div>
                </div>
              </div> */}
            <div className="one_teacher_table">
              <div className="guruh_list">
                <p className="one_student_with">№</p>
                <p className="one_student_with">O'quvchi</p>
                <p className="one_student_with">Telefon</p>
                <p className="one_student_with2">More</p>
              </div>

              <div className="guruh_list_box" style={{ height: "462px" }}>
                {student?.map((e, i) => {
                  return (
                    <div className="guruh_list_item" key={i}>
                      <div className="one_student_with">
                        <p>{i + 1}</p>
                      </div>
                      <div className="one_student_with">
                        <p>{e.username}</p>
                      </div>
                      <div className="one_student_with">
                        <p>+{e.raqam}</p>
                      </div>
                      <div className="one_student_with2">
                        <UpdateStudent id={e._id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneTeacherStudent;
