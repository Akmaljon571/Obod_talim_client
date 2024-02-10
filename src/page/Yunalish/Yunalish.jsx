import "./Yunalish.scss";
import Layout from "../Layout/Layout";
import { Popconfirm, message } from "antd";
import deletee from "../../img/delete.svg";
import { useEffect, useRef, useState } from "react";
import Update from "./helper/updatemodal";

function Yunalish() {
  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [count, setCount] = useState(0);
  const title = useRef("");
  const token = localStorage.getItem("token");

  const [yonalish, setYonalish] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2004/yonalish/all")
      .then((res) => res.json())
      .then((data) => setYonalish(data));
  }, [count]);

  const sent = (e) => {
    e.preventDefault();
    const nomi = title.current.value;
    const key = "add";

    if (nomi) {
      fetch("http://localhost:2004/yonalish/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(token),
        },
        body: JSON.stringify({
          title: nomi,
        }),
      }).then((data) => {
        if (data.ok) {
          setCount(count + 1);
          messageApi.open({
            key,
            type: "success",
            content: "Yo'nalish qo'shildi",
            duration: 2,
          });
        }
      });
    }
    title.current.value = "";
  };

  const deleteYonalish = (id) => {
    fetch("http://localhost:2004/yonalish/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: JSON.parse(token),
      },
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1);
      }
    });
  };
  const confirm = (id) => {
    message.success("Yo'nalish uchirildi");
    deleteYonalish(id);
  };
  const cancel = (e) => {
    message.error("Yo'nalish uchirilmadi");
  };
  return (
    <>
      {contextHolder}
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">Yunalishlar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div className="yunalish">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 className="yunalish_heading">Mavjud yunalishlar</h3>
            </div>

            <div className="box">
              <div className="box_form">
                <p className="yunalish_list_item">Yunalish Qo'shish</p>
                <form style={{ padding: "20px" }}>
                  <p>Nomi</p>
                  <label>
                    <input className="box_form_inp" type="text" ref={title} />
                  </label>
                  <button onClick={sent} className="box_form_btn">
                    Qo'shish
                  </button>
                </form>
              </div>
              <div style={{ width: "100%" }}>
                <div className="yunalish_list_item">
                  <p className="yunalish_list_item_text">№</p>
                  <p className="yunalish_list_item_text2">Yunalish</p>
                  <p style={{ marginRight: "41px" }}>More</p>
                </div>

                <ul className="yunalish_list">
                  {yonalish.data?.map((e, i) => {
                    return (
                      <li key={i} className="yunalish_list_item2">
                        <p className="yunalish_list_item2_text">{i + 1}</p>
                        <p className="yunalish_list_item2_text2">{e.title}</p>
                        <div className="guruh_list_more">
                          <Update id={e._id} title={e.title} />
                          <Popconfirm
                            title="Delete"
                            onConfirm={() => confirm(e._id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button className="guruh_list_box_btn">
                              <img src={deletee} alt="delete" />
                            </button>
                          </Popconfirm>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Yunalish;
