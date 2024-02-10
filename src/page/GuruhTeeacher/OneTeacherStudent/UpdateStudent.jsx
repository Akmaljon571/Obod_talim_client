import "./OneTeacherStudent.scss";
import React, { useState } from "react";
import { Modal } from "antd";
import download from "../../../img/download.svg";
import deletee from "../../../img/update.svg";

const UpdateStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
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
      <button className="btn" type="primary" onClick={showModal}>
        <img src={deletee} alt="" />
      </button>
      <Modal
        className="check"
        title="O'qituvchi o'zgartirish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal_form">
          <label className="modal_form_bir">
            Mahalla
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Ko’cha nomi
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Uy raqami
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            JSHSHIR
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Pasport
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Tug’ilgan sana
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Familya
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Ism
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Otasining ismi
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label>
            Guruh raqami
            <select className="modal_form_inp">
              <option value="">n37</option>
              <option value="">n38</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Telefon raqami
            <input className="modal_form_inp" type="text" name="" />
          </label>
          <label className="modal_form_bir">
            Jinsi
            <select className="modal_form_inp" name="" id="">
              <option value="erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
          </label>

          <div className="modal_form_box2">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <p>Rasm yuklash</p>
              <label
                className="modal_form_inp"
                style={{
                  cursor: "pointer",
                  paddingRight: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  className="modal_form_img"
                  src={download}
                  alt="modal_img"
                />
                <span className="modal_form_spn">{fileContent}</span>
                <input
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  className="modal_form_inp"
                  type="file"
                  name=""
                />
              </label>
            </div>
            <label className="modal_form_bir">
              Holati
              <select className="modal_form_inp" name="" id="">
                <option value="uqimoqda">O’qimoqda</option>
                <option value="ketti">Ketti</option>
                <option value="tamomladi">Tamomladi</option>
              </select>
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateStudent;
