import Layout from "../../Layout/Layout";
import teacher from "../../../img/person.svg";
import { message, Popconfirm } from "antd";
import UpdateStudent from "../helper/updatemodal";
import "./onestudent.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Onestudent() {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const [count, setCount] = useState(0);
  const [student, setStudent] = useState(0);
  const date = String(today.getDate());
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:2004/student/one/" + id, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [count]);

  const studentDelete = (id) => {
    console.log(id);
    fetch("http://localhost:2004/student/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: JSON.parse(token),
      },
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1);
        navigate(-1);
      }
    });
  };

  const confirm = (id) => {
    studentDelete(id);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">O‘qituvchi </h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div className=" boxhalf">
            <div className="student_flex">
              <ul>
                <li className="item">
                  <div className="half_box_inner innerflex">
                    <img src={teacher} alt="person" width={170} />
                    <p className="textt">{student?.data?.username}</p>
                    <p className="textt">{student?.data?.familiya}</p>
                  </div>
                  <div className="xisobot_flex_list_item_box">
                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                      <div className="flexbox">
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Email</p>{" "}
                            <span>{student?.data?.email}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Ko’cha nomi</p>{" "}
                            <span>{student?.data?.kocha}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Uy raqami:</p>{" "}
                            <span>{student?.data?.uy}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">JSHSHIR:</p>{" "}
                            <span>{student?.data?.jsh}</span>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Tug’ilgan sana:</p>{" "}
                            <span>{student?.data?.tugilgan_sana}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Jinsi:</p>{" "}
                            <span>{student?.data?.jinsi === true ? "Erkak" : "Ayol"}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Otasining ismi</p>{" "}
                            <span>{student?.data?.otasini_ismi}</span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Telefon raqam:</p>{" "}
                            <span>+{student?.data?.raqam}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Guruh raqami:</p>{" "}
                            <span>{student?.data?.guruh_id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="xisobot_flex_list_item_box_flex flexboxbtn">
                        <UpdateStudent />
                        <Popconfirm
                          title="Delete"
                          onConfirm={() => confirm(student?.data?._id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button
                            style={{ background: "#b03e3e" }}
                            className="xisobot_flex_btn"
                          >
                            Delete
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="onestudent_form">
              <h4 className="onestudent_form_heading">
                O’quvchiga xabar yuborish
              </h4>
              <form>
                <textarea
                  className="onestudent_form_inp"
                  name="text"
                ></textarea>
                <button className="onestudent_form_btn">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Onestudent;
