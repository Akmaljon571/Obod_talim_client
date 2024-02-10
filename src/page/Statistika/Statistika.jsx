import "./Statistika.scss";
import student from "../../img/iconstudent.png";
import guruh from "../../img/iconguruhlar.png";
import LayoutTeacher from "../LayoutTeacher/LayoutTeacher";
import { useEffect, useState } from "react";

function Statistika() {
  const token = JSON.parse(localStorage.getItem("token"));
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [all, setAll] = useState([]);
  const [sms, setSms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:2004/admin/teacher`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setAll(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/sms/one`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setSms(data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <LayoutTeacher />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">Home</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div className="statistika">
            <ul className="statistika_list">
              <li className="xisobot_list_item2">
                <div className="xisobot_list_item_box">
                  <img src={student} alt="" width={70} height={80} />
                  <p className="xisobot_list_item_box_text">O‘quvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {all?.data?.students === null ? 0 : all?.data?.students}{" "}
                  <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item2">
                <div className="xisobot_list_item_box">
                  <img src={guruh} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">Guruhlar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {all?.data?.groups === null ? 0 : all?.data?.groups}{" "}
                  <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
            </ul>
            <div className="statistika_box">
              <p className="statistika_box_heading">Tezkor xabarlar</p>
              {sms?.data?.map((e, i) => {
                return (
                  <p className="statistika_box_text" key={i + 1}>
                    {e?.desc}
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
