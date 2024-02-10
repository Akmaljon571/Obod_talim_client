import "./Guruh.scss";
import Layout from "../Layout/Layout";
import deletee from "../../img/delete.svg";
import search from "../../img/search.svg";
import { message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import Modall from "./helper/modal";
import UpdateGuruh from "./helper/updatemodal";
import { useEffect, useState } from "react";

function Guruh() {
  const navigate = useNavigate();
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [guruh, setGuruh] = useState([]);
  const [count, setCount] = useState(0);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:2004/guruh/all", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, [count]);

  const deleteGuruh = (id) => {
    fetch("http://localhost:2004/guruh/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }).then((data) => {
      if (data.ok) {
        setCount(count + 1);
      }
    });
  };

  const confirm = (id) => {
    message.success("Click on Yes");
    deleteGuruh(id);
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
            <h2 className="xisobot_box_h2">Guruhlar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div>
            <div className="xisobot_flex">
              <h3 className="xisobot_flex_heading">Mavjud Guruhlar</h3>
              <div className="xisobot_flex_wrap">
                <img
                  className="xisobot_flex_wrap_img"
                  src={search}
                  alt="search"
                />
                <input
                  className="xisobot_flex_inp"
                  type="text"
                  name="search"
                  placeholder="Guruh nomini kiriting"
                />
              </div>
              <Modall />
            </div>
            <div className="guruh">
              <div className="guruh_list">
                <p className="guruh_list_text">№</p>
                <p className="guruh_list_text2 guruh_list_right">Guruh nomi</p>
                <p className="guruh_list_text3 guruh_list_right">
                  Guruh raqami
                </p>
                <p className="guruh_list_more guruh_list_right right">More</p>
              </div>

              <div className="guruh_list_box">
                {guruh?.data?.map((e, i) => {
                  return (
                    <div key={i} className="guruh_list_item">
                      <div
                        onClick={() => navigate("/groups/" + e._id)}
                        className="guruh_list_text"
                      >
                        <p>{i + 1}</p>
                      </div>
                      <div
                        onClick={() => navigate("/groups/" + e._id)}
                        className="guruh_list_text2"
                      >
                        <p>{e.title}</p>
                      </div>
                      <div
                        onClick={() => navigate("/groups/" + e._id)}
                        className="guruh_list_text3"
                      >
                        <p>№ {e.sequence}</p>
                      </div>
                      <div className="guruh_list_more">
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
                        <UpdateGuruh id={e._id} />
                      </div>
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

export default Guruh;
