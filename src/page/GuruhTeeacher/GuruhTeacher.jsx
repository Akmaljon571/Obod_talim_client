import "./GuruhTeacher.scss";
import search from "../../img/search.svg";
import { useNavigate } from "react-router-dom";
import LayoutTeacher from "../LayoutTeacher/LayoutTeacher";
import { useEffect, useState } from "react";

function GuruhTeacher() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [guruh, setGuruh] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/teacher/${teacher?._id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data?.guruh));
  }, []);



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
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Mavjud Guruhlar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input
                  className="xisobot_flex_inp"
                  type="text"
                  name="search"
                  placeholder="Guruh nomini kiriting"
                />
              </div>
            </div>
            <div className="guruh">
              <div className="guruh_list">
                <p className="teacher_guruh_text">№</p>
                <p className="teacher_guruh_text">Guruh nomi</p>
                <p className="teacher_guruh_text">Guruh raqami</p>
                <p className="teacher_guruh_text">Dars kunlari</p>
              </div>

              <div className="guruh_list_box">
                {guruh?.map((e, i) => {
                  return (
                    <div
                      onClick={() => navigate("/groups/teacher/" + e._id)}
                      className="guruh_list_item"
                      style={{ cursor: "pointer" }}
                      key={i + 1}
                    >
                      <div className="teacher_guruh_text">
                        <p>{i + 1}</p>
                      </div>
                      <div className="teacher_guruh_text">
                        <p>{e.title}</p>
                      </div>
                      <div className="teacher_guruh_text">
                        <p>{e.sequence}</p>
                      </div>
                      <div className="teacher_guruh_text">
                        <p>{e.kun}</p>
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

export default GuruhTeacher;
