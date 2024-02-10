import "./Statistika.scss";
import student from "../../img/iconstudent.png";
import guruh from "../../img/iconguruhlar.png";
import LayoutTeacher from "../LayoutTeacher/LayoutTeacher";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Statistika() {
  const navigate = useNavigate();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [all, setAll] = useState([]);
  const [sms, setSms] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:2004/admin/dashboard/teacher`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setAll(data?.data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/sms/one`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setSms(data?.data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <LayoutTeacher />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">Xisobot</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn" onClick={logout}>
              Log out
            </button>
          </div>

          <div className="box_statik">
            <ul className="statistika_list">
              <li className="xisobot_list_item" style={{ width: "100%" }}>
                <div className="xisobot_list_item_box">
                  <img src={student} alt="" width={70} height={80} />
                  <p className="xisobot_list_item_box_text">O‘quvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {all?.students === null ? 0 : all?.students}{" "}
                  <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item" style={{ width: "100%" }}>
                <div className="xisobot_list_item_box">
                  <img src={guruh} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">Guruhlar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {all?.groups === null ? 0 : all?.groups}{" "}
                  <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
            </ul>
            <div className="statistika_box">
              <p className="statistika_box_heading">Tezkor xabarlar</p>
              {sms?.map((e, i) => {
                return (
                  <p className="statistika_box_text" key={i}>
                    <span>{i + 1}.</span> {e.desc}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistika;
