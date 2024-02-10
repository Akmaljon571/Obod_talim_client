import "./Statistika.scss";
import student from "../../img/iconstudent.png";
import guruh from "../../img/iconguruhlar.png";
import LayoutTeacher from "../LayoutTeacher/LayoutTeacher";

function Statistika() {
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
                  <img src={student} alt="" width={70} height={80} />
                  <p className="xisobot_list_item_box_text">O‘quvchilar</p>
                </div>
                <p className="xisobot_list_item_text">
                  0 <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
              <li className="xisobot_list_item">
                <div className="xisobot_list_item_box">
                  <img src={guruh} alt="" width={70} height={70} />
                  <p className="xisobot_list_item_box_text">Guruhlar</p>
                </div>
                <p className="xisobot_list_item_text">
                  0 <span className="xisobot_list_item_spn">+</span>
                </p>
              </li>
            </ul>
            <div className="statistika_box">
              <p className="statistika_box_heading">Tezkor xabarlar</p>
              <p className="statistika_box_text">Salom</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistika;
