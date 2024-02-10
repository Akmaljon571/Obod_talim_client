import "./Teachers.scss";
import Layout from "../Layout/Layout";
import search from "../../img/search.svg";
import person from "../../img/person.svg";
import Modall from "./helper/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Teachers() {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  const [yonalish, setYonalish] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2004/yonalish/all")
      .then((res) => res.json())
      .then((data) => setYonalish(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:2004/teacher/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data));
  }, [count]);

  return (
    <>
      <div className="xisobot">
        <Layout name={count} />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">O‘qituvchilar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Mavjud O'qituvchilar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input className="xisobot_flex_inp" type="text" name="search" />
              </div>
              <Modall />
            </div>

            <ul className="xisobot_flex_list">
              {teacher.length &&
                teacher?.data?.map((e, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => navigate("/teachers/" + e._id)}
                      className="xisobot_flex_list_item"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="xisobot_flex_list_item_box">
                        <p className="xisobot_flex_list_item_box_text">
                          {e.username} {e.familiya}
                        </p>
                        <div style={{ padding: "20px" }}>
                          <img src={person} width={120} alt="person" />
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Ism</p>{" "}
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
                            <p className="textt">Tug’ilgan sana</p>{" "}
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
                            <span>{e.raqam}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Ta’lim darajasi</p>{" "}
                            <span>{e.izoh}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Otasining ismi</p>{" "}
                            <span>{e.otasini_ismi}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teachers;
