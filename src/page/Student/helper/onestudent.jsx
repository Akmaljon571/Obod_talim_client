import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { message, Popconfirm } from "antd";
import Layout from "../../Layout/Layout";
import UpdateStudent from "../helper/updatemodal";
import useMyHook from "../../../hooks/hooks";
import { Header } from "../../../components";
import { img_url } from "../../../context";
import "./onestudent.scss";

function Onestudent() {
  const [student, setStudent] = useState(0);
  const [guruh, setGuruh] = useState("");
  const { studentCount, setStudentCount } = useMyHook();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  const textRef = useRef();

  useEffect(() => {
    fetch("http://localhost:2004/student/one/" + id, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data1) => {
        setStudent(data1);
        fetch("http://localhost:2004/guruh/all", {
          headers: {
            authorization: JSON.parse(token),
          },
        })
          .then((res) => res.json())
          .then(({ data }) =>
            setGuruh(data.find((e) => e._id == data1?.data?.guruh_id)?.title)
          );
      });
  }, [studentCount]);

  const studentDelete = (id) => {
    fetch("http://localhost:2004/student/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: JSON.parse(token),
      },
    }).then((data) => {
      if (data.ok) {
        setStudentCount(studentCount + 1);
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

  const send = () => {
    const desc = textRef.current.value;
    fetch("http://localhost:2004/sms/send", {
      method: "POST",
      headers: {
        authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc,
        send_id: id,
        status: "student",
      }),
    });
    textRef.current.value = "";
  };

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <Header />

          <div className=" boxhalf">
            <div className="student_flex">
              <ul>
                <li className="item">
                  <div className="half_box_inner innerflex">
                    <img
                      style={{ borderRadius: "20px" }}
                      src={img_url + student?.data?.image}
                      alt="person"
                      width={140}
                      height={120}
                    />
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
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              marginBottom: "8px",
                            }}
                          >
                            <p className="textt">Holati:</p>{" "}
                            <span>{student?.data?.holati}</span>
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
                            <span>
                              {student?.data?.jinsi === true ? "Erkak" : "Ayol"}
                            </span>
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
                            <span>{guruh}</span>
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
              <form>
                <textarea
                  placeholder="O’quvchiga xabar yuborish"
                  className="onestudent_form_inp"
                  name="text"
                  ref={textRef}
                  style={{ borderRadius: "20px" }}
                ></textarea>
                <button
                  onClick={send}
                  type="button"
                  className="onestudent_form_btn"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Onestudent;
