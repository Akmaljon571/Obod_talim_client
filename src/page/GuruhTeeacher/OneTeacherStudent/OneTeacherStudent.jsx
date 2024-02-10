import "./OneTeacherStudent.scss";
import person from "../../../img/person.svg";
import LayoutTeacher from "../../LayoutTeacher/LayoutTeacher";
import UpdateStudent from "./UpdateStudent";
// import Modall from "./modal";

function OneTeacherStudent() {
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

          <div className="oneguruh">
            <div>
              <li className="xisobot_flex_list_item2">
                <div className="xisobot_flex_list_item_box">
                  <p className="xisobot_flex_list_item_box_text">
                    Muxamadaliyev Ibroxim
                  </p>
                  <div style={{ marginLeft: "15px" }}>
                    <img src={person} width={130} alt="person" />
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Ism</p> <span>Hayrulla</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Ta’lim yo‘nalishi:</p>{" "}
                      <span>Node.js</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Tug’ilgan sana</p>{" "}
                      <span>01.01.01</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Telefon raqam:</p>{" "}
                      <span>+998906082280</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Ta’lim darajasi</p>{" "}
                      <span>Senior</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginBottom: "8px",
                      }}
                    >
                      <p className="textt">Otasining ismi</p>{" "}
                      <span>Mirjalol</span>
                    </div>
                  </div>
                </div>
              </li>

              <div className="xisobot_flex_list_item_box box2">
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
              </div>
            </div>
            <div className="guruh one_guruh">
              <div className="guruh_list">
                <p className="one_student_with">№</p>
                <p className="one_student_with">O'quvchi</p>
                <p className="one_student_with">Guruh raqami</p>
                <p className="one_student_with2">More</p>
              </div>

              <div className="guruh_list_box guruh_list_box2">
                <div className="guruh_list_item">
                  <div className="one_student_with">
                    <p>1</p>
                  </div>
                  <div className="one_student_with">
                    <p>Muhammadjavohir</p>
                  </div>
                  <div className="one_student_with">
                    <p>n12</p>
                  </div>
                  <div className="one_student_with2">
                    <UpdateStudent />
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

export default OneTeacherStudent;
