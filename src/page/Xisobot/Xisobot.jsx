import { useEffect, useState } from "react";
import { Header } from "../../components";
import Layout from "../Layout/Layout";
import studentphoto from "../../img/iconstudent.png";
import teacher1 from "../../img/iconteacher.png";
import guruh1 from "../../img/iconguruhlar.png";
import ketganlar from "../../img/iconketganlar.png";
import "./Xisobot.scss";

function Xisobot() {
  const token = localStorage.getItem("token");
  const [datas, setDatas] = useState();

  useEffect(() => {
    fetch("http://localhost:2004/admin/dashboard", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then(({ data }) => setDatas(data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <Header />
          <div>
            <ul className="xisobot_list">
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={studentphoto} alt="" width={70} height={80} />
                  <p className="xisobot_list_item_box_text">O‘quvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {datas?.students} <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={guruh1} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">Guruhlar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {datas?.groups} <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={teacher1} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">O‘qituvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  {datas?.teachers} <span className="xisobot_list_item_spn">+</span>
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
                  {datas?.ketgan} <span className="xisobot_list_item_spn">+</span>
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
