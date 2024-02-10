import "../Yunalish.scss";
import React, { useRef, useState } from "react";
import { Modal, message } from "antd";
import updateImg from "../../../img/update.svg";
import useMyHook from "../../../hooks/hooks";

const Update = ({ id, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { yonalishCount, setYonalishCount } = useMyHook()
  const token = localStorage.getItem("token");
  const yonalishRef = useRef();

  const YonalishUpdate = (id) => {
    const yonalish = yonalishRef.current.value;
    const key = "delete";

    fetch(`http://localhost:2004/yonalish/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(token),
      },
      body: JSON.stringify({
        title: yonalish,
      }),
    }).then((data) => {
      if (data.ok) {
        setYonalishCount(yonalishCount + 1)
        messageApi.open({
          key,
          type: "success",
          content: "Yo'nalish o'zgartirildi",
          duration: 2,
        });
      } else {
        messageApi.open({
          key,
          type: "error",
          content: "Yo'nalish o'zgartirilmadi!",
          duration: 2,
        });
      }
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    YonalishUpdate(id);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileContent(file?.name);
  };
  return (
    <>
      {contextHolder}
      <button className="guruh_list_box_btn" type="primary" onClick={showModal}>
        <img src={updateImg} alt="" />
      </button>
      <Modal
        title="O'qituvchi o'zgartirish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal_form2">
          <label className="modal_form_label">
            Yonalish
            <input
              className="modal_form_inp2"
              type="text"
              name="yonalish"
              ref={yonalishRef}
              defaultValue={title}
            />
          </label>
        </form>
      </Modal>
    </>
  );
};
export default Update;
