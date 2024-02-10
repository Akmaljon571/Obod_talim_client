import "./OneTeacherStudent.scss";
import person from "../../../img/person.svg";
import LayoutTeacher from "../../LayoutTeacher/LayoutTeacher";
import UpdateStudent from "./UpdateStudent";
import useMyHook from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OneTeacherStudent() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { studentCount } = useMyHook();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [teacher, setTeacher] = useState([]);
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const [one, setOne] = useState([]);
  const { id } = useParams();

  const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:2004/teacher/one`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data?.data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/teacher/${teacher?._id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, [teacher]);

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/one/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setOne(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/student/guruh/${one?._id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data?.data));
  }, [one, studentCount]);

  return (
    <>
      <div className="xisobot">
        <LayoutTeacher />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">Guruhlar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn" onClick={logout}>
              Log out
            </button>
          </div>

          <div className="oneguruh">
            <div>
              <li className="one_teach">
                {guruh?.teacher?.map((e, i) => {
                  return (
                    <div className="xisobot_flex_list_item_box" key={i + 1}>
                      <p className="xisobot_flex_list_item_box_text">
                        {e.familiya} {e.username}
                      </p>
                      <div
                        style={{ padding: "15px", borderBottom: "1px solid" }}
                      >
                        <img src={person} width={130} alt="person" />
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Ism:</p>{" "}
                          <span>{e.username}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Yo‘nalishi:</p>{" "}
                          <span>{e.yonalish_id}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Tug’ilgan sana:</p>{" "}
                          <span>{e.tugilgan_sana}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Telefon raqam:</p>{" "}
                          <span>+{e.raqam}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Darajasi</p>{" "}
                          <span>{e.izoh}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {guruh?.guruh?.map((e, i) => {
                  return (
                    <div style={{ padding: "15px" }} key={i}>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Guruh nomi</p>{" "}
                        <span>{e.title}</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Dars kunlari</p>{" "}
                        <span>{e.kun}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Dars vaqti</p>{" "}
                        <span>{e.soat} </span>
                      </div>
                    </div>
                  );
                })}
              </li>
            </div>
            <div className="one_guruh">
              <div className="guruh_list">
                <p className="one_student_with">№</p>
                <p className="one_student_with">O'quvchi</p>
                <p className="one_student_with">Telefon</p>
                <p className="one_student_with2">More</p>
              </div>

              <div className="guruh_list_box guruh_list_box2">
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
