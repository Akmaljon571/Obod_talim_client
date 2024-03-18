import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import person from "../../../img/person.svg";
import "./oneguruh.scss";
import { Header } from "../../../components";
import { img_url, url } from "../../../context";

function Oneguruh() {
  const [teacher, setTeacher] = useState([]);
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();
  const [yonalish, setYonalish] = useState("");

  useEffect(() => {
    fetch(url + `guruh/one/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);

  useEffect(() => {
    fetch(url + `guruh/teacher/${guruh.teacher_id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(url + `yonalish/all`, {
          headers: {
            authorization: token,
          },
        })
          .then((res) => res.json())
          .then((yonalish) => {
            const a = yonalish?.data.find(
              (e) => e._id == data?.teacher.map((e) => e.yonalish_id)
            )?.title;
            setYonalish(a);
          });
        setTeacher(data);
      });
  }, [guruh]);

  useEffect(() => {
    fetch(url + `student/guruh/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <Header />
          <div className="oneguruh">
            <div>
              {teacher?.teacher?.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="xisobot_flex_list_item2"
                    style={{ height: "533px", width: "325px" }}
                  >
                    <div
                      className="xisobot_flex_list_item_box"
                      style={{ borderBottom: "1px solid" }}
                    >
                      <p className="xisobot_flex_list_item_box_text">
                        {e.username} {e.familiya}
                      </p>
                      <div style={{ padding: "15px" }}>
                        <img src={img_url + e.image} width={120} height={120} alt="person" />
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Ism</p> <span>{e.username}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Yo‘nalishi:</p>{" "}
                          <span>{yonalish}</span>
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
                      </div>
                    </div>
                    {/* // */}
                    <div className="box_guruh" key={guruh._id}>
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
                        <span>
                          {teacher?.teacher.map((e, i) => {
                            return <span key={i}>{e.username}</span>;
                          })}
                        </span>
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
                        <span>{guruh.soat} </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
            <div className="one_guruh">
              <div className="one_guruh_box">
                <p className="one_guruh_box_text">№</p>
                <p className="one_guruh_box_text2">O'quvchi</p>
                <p className="one_guruh_box_text3">Guruh raqami</p>
              </div>

              <div className="one_guruh_box1">
                {student?.data?.map((e, i) => {
                  return (
                    <div className="one_guruh_box1_box" key={i + 1}>
                      <p className="one_guruh_box1_box_text">{i + 1}</p>
                      <p className="one_guruh_box1_box_text2 one_guruh_box1_box_text4">
                        {e.username}
                      </p>
                      <p className="one_guruh_box1_box_text3 one_guruh_box1_box_text4">
                        {guruh.sequence}
                      </p>
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

export default Oneguruh;
