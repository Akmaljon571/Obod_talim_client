import "./Students.scss";
import Layout from "../../Layout/Layout";
import teacher from "../../../img/person.svg";
import { message, Popconfirm } from "antd";
import UpdateModal from "../updatemodal/UpdateModal";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TeachersStudents() {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "delete";

  const teacherDelete = (id) => {
    fetch("http://localhost:2004/teacher/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: JSON.parse(token),
      },
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1);
        navigate(-1);
      } else {
        messageApi.open({
          key,
          type: "error",
          content: "Loaded!",
          duration: 2,
        });
      }
    });
  };

  const [one, setOne] = useState([]);
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:2004/teacher/one/${id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setOne(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/teacher/${id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  const confirm = (id) => {
    message.success("Click on Yes");
    teacherDelete(id);
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <>
      {contextHolder}
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

          <div className="half">
            <div className="half_box">
              <ul className="half_box_flextable">
                <li className="item">
                  <div className="half_box_inner">
                    <img src={teacher} alt="person" width={130} />
                    <p className="textt">{one.username}</p>
                    <p className="textt">{one.familiya}</p>
                  </div>
                  <div className="xisobot_flex_list_item_box">
                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Email:</p> <span>{one.email}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Ko’cha nomi:</p>{" "}
                        <span>{one.kocha}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Uy raqami:</p>{" "}
                        <span>{one.uy}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">JSHSHIR:</p> <span>{one.jsh}</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Tug’ilgan sana:</p>{" "}
                        <span>{one.tugilgan_sana}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Jinsi:</p>{" "}
                        <span>{one.jinsi == true ? "Erkak" : "Ayol"}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Otasining ismi</p>{" "}
                        <span>{one.otasini_ismi}</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Ta’lim darajasi:</p>{" "}
                        <span>{one.izoh}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Telefon raqam:</p>{" "}
                        <span>+{one.raqam}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <p className="textt">Yo’nalishi:</p>{" "}
                        <span>{one.yonalish_id}</span>
                      </div>
                      <div className="xisobot_flex_list_item_box_flex">
                        <UpdateModal />
                        <Popconfirm
                          title="Delete"
                          onConfirm={() => confirm(one._id)}
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
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default TeachersStudents;
