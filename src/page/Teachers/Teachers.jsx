import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import search from "../../img/search.svg";
import Modall from "./helper/Modal";
import useMyHook from "../../hooks/hooks";
import Header from "../../components/header/header";
import { img_url } from "../../context";
import "./Teachers.scss";

function Teachers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [teacher, setTeacher] = useState([]);
  const [teacherAll, setTeacherAll] = useState([]);
  const { teacherCount } = useMyHook();

  useEffect(() => {
    fetch("http://localhost:2004/teacher/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data);
        setTeacherAll(data);
      });
  }, [teacherCount]);

  const searchFN = (e) => {
    const text = e.target.value;
    if (text) {
      setTeacher({
        data: teacherAll.data.filter((e) =>
          e.username.toLowerCase().includes(text.toLowerCase())
        ),
      });
    } else {
      setTeacher(teacherAll);
    }
  };
  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <Header />
          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Mavjud O'qituvchilar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input
                  onChange={searchFN}
                  className="xisobot_flex_inp"
                  type="text"
                  name="search"
                  placeholder="Search"
                />
              </div>
              <Modall />
            </div>

            <ul className="xisobot_flex_list">
              {teacher?.data?.length
                ? teacher?.data?.map((e, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => navigate("/teachers/" + e._id)}
                        className="xisobot_flex_list_item"
                        style={{ textDecoration: "none", width: "30%" }}
                      >
                        <div className="xisobot_flex_list_item_box">
                          <p className="xisobot_flex_list_item_box_text">
                            {e.username} {e.familiya}
                          </p>
                          <div style={{ padding: "20px" }}>
                            <img
                              // style={{ borderRadius: "50%" }}
                              src={img_url + e.image}
                              width={150}
                              height={140}
                              alt="person"
                            />
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
                              <p className="textt">Jinsi:</p>{" "}
                              <span>{e.jinsi === true ? "Erkak" : "Ayol"}</span>
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
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teachers;
