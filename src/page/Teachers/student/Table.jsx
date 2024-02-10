import "./Students.scss";
import deletee from "../../../img/delete.svg";
import { message, Popconfirm, Tabs } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Table() {
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const confirm = (e) => {
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/teacher/${id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);
  const guruh2 = guruh?.guruh?.map((e) => e);

  // let myBtns = document.querySelector(".guruh_btn");
  const oneStudent = (guruh_id) => {
    fetch(`http://localhost:2004/student/guruh/${guruh_id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  };

  return (
    <>
      <div className="table">
        <div className="table_list">
          <div className="guruh_box4">
            {guruh2?.map((e, i) => {
              return (
                <button
                  className="guruh_btn"
                  key={i + 1}
                  onClick={() => oneStudent(e._id)}
                >
                  {e.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="box_student">
          {student?.data?.length ? (
            student?.data?.map((e, i) => {
              return (
                <div className="table_list_item" key={i}>
                  <p className="table_list_text">{i + 1}</p>
                  <p className="table_list_text">{e.username}</p>
                  <p className="table_list_text">+{e.raqam}</p>
                  <div>
                    <Popconfirm
                      title="Delete"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className="guruh_list_box_btn">
                        <img src={deletee} alt="delete" />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              );
            })
          ) : (
            <p>malumot yoq</p>
          )}
        </div>

        <div className="table_form">
          <h4 className="table_form_heading">Ustozga vazifa yuborish</h4>
          <form className="table_form_form">
            <textarea className="table_form_form_inp" type="text"></textarea>
            <button className="table_form_form_btn">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Table;
