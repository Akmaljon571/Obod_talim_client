import "./Yunalish.scss";
import Layout from "../Layout/Layout";
import { Popconfirm, message } from "antd";
import deletee from "../../img/delete.svg";
import { useEffect, useRef, useState } from "react";
import Update from "./helper/updatemodal";
import { Header } from "../../components";
import useMyHook from "../../hooks/hooks";
import { url } from "../../context";

function Yunalish() {
  const [messageApi, contextHolder] = message.useMessage();
  const { yonalishCount, setYonalishCount } = useMyHook()
  const title = useRef();
  const token = localStorage.getItem("token");

  const [yonalish, setYonalish] = useState([]);
  useEffect(() => {
    fetch(url + "yonalish/all")
      .then((res) => res.json())
      .then((data) => setYonalish(data));
  }, [yonalishCount]);

  const sent = (e) => {
    e.preventDefault();
    const nomi = title.current.value;
    const key = "add";

    if (nomi) {
      fetch(url + "yonalish/create", {
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
          setYonalishCount(yonalishCount + 1);
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
    fetch(url + "yonalish/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: JSON.parse(token),
      },
    }).then((data) => {
      if (data.ok) {
        setYonalishCount(yonalishCount + 1);
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
          <Header />

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
                    <input placeholder="title..." className="box_form_inp" type="text" ref={title} />
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
