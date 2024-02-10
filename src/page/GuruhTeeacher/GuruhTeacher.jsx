// import "./Guruh.scss";
import search from "../../img/search.svg";
import { useNavigate } from "react-router-dom";
import LayoutTeacher from "../LayoutTeacher/LayoutTeacher";

function GuruhTeacher() {
  const navigate = useNavigate();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());

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
              {/* <Modall /> */}
            </div>
            <div className="guruh">
              <div className="guruh_list">
                <p className="guruh_list_text">№</p>
                <p className="guruh_list_text2">Ustoz</p>
                <p className="guruh_list_text3">Guruh raqami</p>
                <p className="guruh_list_more">Dars kunlari</p>
              </div>

              <div className="guruh_list_box">
                <div
                  onClick={() => navigate("/groups/teacher/students")}
                  className="guruh_list_item"
                  style={{ cursor: "pointer" }}
                >
                  <div className="guruh_list_text">
                    <p>1</p>
                  </div>
                  <div className="guruh_list_text2">
                    <p>SHerzod</p>
                  </div>
                  <div className="guruh_list_text3">
                    <p>n12</p>
                  </div>
                  <div className="guruh_list_more">
                    <p>Du CHo Ju</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuruhTeacher;
