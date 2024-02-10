import React, { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import download from "../../../img/download.svg";

const Addmodal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const token = localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [count, setCount] = useState(0);
  const [guruh, setGuruh] = useState([]);
  const usernameRef = useRef();
  const familyaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const imageRef = useRef();
  const kochaRef = useRef();
  const uyRef = useRef();
  const jshRef = useRef();
  const tugilgansanaRef = useRef();
  const otasiniismiRef = useRef();
  const guruhRaqamiRef = useRef();
  const jinsiRef = useRef();
  const raqamRef = useRef();

  useEffect(() => {
    fetch("http://localhost:2004/guruh/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, [count]);

  const sent = () => {
    const username = usernameRef.current.value;
    const familya = familyaRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const img = imageRef.current.files[0];
    const kocha = kochaRef.current.value;
    const uy = uyRef.current.value;
    const jsh = jshRef.current.value;
    const tugilgan = tugilgansanaRef.current.value;
    const otasiniismi = otasiniismiRef.current.value;
    const guruhraqami = guruhRaqamiRef.current.value;
    const jinsi = jinsiRef.current.value;
    const raqam = String(raqamRef.current.value);
    const jins = jinsi === "true" ? true : false;
    const key = "add";
    if (
      username &&
      familya &&
      email &&
      password &&
      img &&
      kocha &&
      uy &&
      jsh &&
      tugilgan &&
      otasiniismi &&
      guruhraqami &&
      jinsi &&
      raqam
    ) {
      const formData = new FormData();
      formData.append("familiya", familya);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("kocha", kocha);
      formData.append("uy", uy);
      formData.append("jsh", jsh);
      formData.append("tugilgan_sana", tugilgan);
      formData.append("otasini_ismi", otasiniismi);
      formData.append("jinsi", jins);
      formData.append("raqam", raqam);
      formData.append("guruh_id", String(guruhraqami));
      formData.append("image", img);
      formData.append("holati", "oqimoqda");
      fetch("http://localhost:2004/student/create", {
        method: "POST",
        headers: {
          authorization: JSON.parse(token),
        },
        body: formData,
      }).then((data) => {
        if (data.ok) {
          setCount(count + 1);
          messageApi.open({
            key,
            type: "success",
            content: "Successfully",
            duration: 2,
          });
        } else {
          messageApi.open({
            key,
            type: "error",
            content: "Failed!",
            duration: 2,
          });
        }
      });
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Failed!",
        duration: 2,
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileContent(file?.name);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    sent();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <button className="xisobot_flex_btn" type="primary" onClick={showModal}>
        Qo’shish
      </button>
      <Modal
        className="check"
        title="O'quvchi qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal_form">
          <label className="modal_form_bir">
            Email
            <input
              className="modal_form_inp"
              type="email"
              name="email"
              ref={emailRef}
            />
          </label>
          <label className="modal_form_bir">
            Password
            <input
              className="modal_form_inp"
              type="password"
              name="password"
              ref={passwordRef}
            />
          </label>
          <label className="modal_form_bir">
            Ko’cha nomi
            <input
              className="modal_form_inp"
              type="text"
              name="kocha"
              ref={kochaRef}
            />
          </label>
          <label className="modal_form_bir">
            Uy raqami
            <input
              className="modal_form_inp"
              type="text"
              name="uy"
              ref={uyRef}
            />
          </label>
          <label className="modal_form_bir">
            JSHSHIR
            <input
              className="modal_form_inp"
              type="text"
              name="jsh"
              ref={jshRef}
            />
          </label>
          <label className="modal_form_bir">
            Tug’ilgan sana
            <input
              className="modal_form_inp"
              type="date"
              name="sana"
              ref={tugilgansanaRef}
            />
          </label>
          <label className="modal_form_bir">
            Familya
            <input
              className="modal_form_inp"
              type="text"
              name="familya"
              ref={familyaRef}
            />
          </label>
          <label className="modal_form_bir">
            Ism
            <input
              className="modal_form_inp"
              type="text"
              name="ism"
              ref={usernameRef}
            />
          </label>
          <label className="modal_form_bir">
            Otasining ismi
            <input
              className="modal_form_inp"
              type="text"
              name="otasiniismi"
              ref={otasiniismiRef}
            />
          </label>
          <label className="modal_form_bir">
            Telefon raqami
            <input
              className="modal_form_inp"
              type="text"
              defaultValue={"998"}
              ref={raqamRef}
            />
          </label>

          <label className="modal_form_bir">
            Jinsi
            <select className="modal_form_inp" ref={jinsiRef}>
              <option value="erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Guruh raqami
            <select className="modal_form_inp" ref={guruhRaqamiRef}>
              {guruh?.data?.map((e, i) => {
                return (
                  <option key={i} value={e._id}>
                    {e.sequence}
                  </option>
                );
              })}
            </select>
          </label>
          <div
            className="modal_form_bir"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <p>Rasm yuklash</p>
            <label
              className="modal_form_inp"
              style={{
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <img className="modal_form_img" src={download} alt="modal_img" />
              <span className="modal_form_spn">{fileContent}</span>
              <input
                style={{ display: "none" }}
                onChange={handleFileChange}
                className="modal_form_inp"
                type="file"
                ref={imageRef}
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Addmodal;
