import { message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import deletee from "../../img/delete.svg";
import search from "../../img/search.svg";
import Modall from "./helper/modal";
import UpdateGuruh from "./helper/updatemodal";
import { Header } from "../../components";
import useMyHook from "../../hooks/hooks";
import "./Guruh.scss";

function Guruh() {
  const navigate = useNavigate();
  const [guruh, setGuruh] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const { groupCount, setGroupCount } = useMyHook();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:2004/guruh/all", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGuruh(data);
        setSearchData(data);
      });
  }, [groupCount]);

  const searchFn = (e) => {
    const text = e.target.value;
    if (text) {
      setGuruh({
        data: searchData.data.filter((e) =>
          e.title.toLowerCase().includes(text.toLowerCase())
        ),
      });
    } else {
      setGuruh(searchData);
    }
  };

  const deleteGuruh = (id) => {
    fetch("http://localhost:2004/guruh/delete/" + id, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }).then((data) => {
      if (data.ok) {
        setGroupCount(groupCount + 1);
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
          <Header />

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
                  onChange={searchFn}
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

              <div className="guruh_list_box" style={{ height: "400px" }}>
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
                          <button
                            style={{ paddingTop: "3px" }}
                            className="guruh_list_box_btn"
                          >
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
