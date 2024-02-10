// import "./Modal.scss";
import React, { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import { useParams } from "react-router-dom";
import download from "../../../img/download.svg";

const UpdateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [yonalishData, setYonalish] = useState([]);
  const [count, setCount] = useState(0);
  const key = "delete";
  const { id } = useParams();
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
  const yonalishidRef = useRef();
  const jinsiRef = useRef();
  const raqamRef = useRef();
  const darajaRef = useRef();

  const [one, setOne] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:2004/teacher/one/${id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setOne(data));
  }, [count]);

  useEffect(() => {
    fetch("http://localhost:2004/yonalish/all")
      .then((res) => res.json())
      .then((data) => setYonalish(data));
  }, []);

  const teacherUpdate = (id) => {
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
    const yonalish = yonalishidRef.current.value;
    const jinsi = jinsiRef.current.value;
    const raqam = Number(raqamRef.current.value);
    const daraja = darajaRef.current.value;

    const formData = new FormData();
    formData.append("username", username == "" ? one.username : username);
    formData.append("familiya", familya == "" ? one.familiya : familya);
    formData.append("email", email == "" ? one.email : email);
    formData.append("password", password == "" ? one.password : password);
    if (img) {
      formData.append("image", img);
    }
    formData.append("kocha", kocha == "" ? one.kocha : kocha);
    formData.append("uy", uy == "" ? one.uy : uy);
    formData.append("jsh", jsh == "" ? one.jsh : jsh);
    formData.append("tugilgan_sana", tugilgan == "" ? one.tugilgan_sana : tugilgan);
    formData.append("otasini_ismi", otasiniismi == "" ? one.otasini_ismi : otasiniismi);
    formData.append("yonalish_id", yonalish == "" ? one.yonalish_id : yonalish);
    formData.append("jinsi", jinsi == "" ? one.jinsi : jinsi);
    formData.append("raqam", raqam == "" ? one.raqam : raqam);
    formData.append("izoh", daraja == "" ? one.izoh : daraja);
    fetch(`http://localhost:2004/teacher/update/${id}`, {
      method: "PATCH",
      headers: {
        authorization: JSON.parse(token),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          messageApi.open({
            key,
            type: "success",
            content: "Loaded!",
            duration: 2,
          });
          window.location.reload(true)
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    teacherUpdate(id);
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
      <button className="xisobot_flex_btn" type="primary" onClick={showModal}>
        Update
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
            Email
            <input
              className="modal_form_inp"
              type="email"
              name="email"
              ref={emailRef}
              defaultValue={one?.email}
            />
          </label>
          <label className="modal_form_bir">
            Password
            <input
              className="modal_form_inp"
              type="text"
              name="password"
              ref={passwordRef}
            // defaultValue={one?.password}
            />
          </label>
          <label className="modal_form_bir">
            Familya
            <input
              className="modal_form_inp"
              type="text"
              name="familya"
              ref={familyaRef}
              defaultValue={one?.familiya}
            />
          </label>
          <label className="modal_form_bir">
            Ism
            <input
              className="modal_form_inp"
              type="text"
              name="ism"
              ref={usernameRef}
              defaultValue={one?.username}
            />
          </label>
          <label className="modal_form_bir">
            Tell raqami
            <input
              className="modal_form_inp"
              type="text"
              name="ism"
              ref={raqamRef}
              defaultValue={one?.raqam}
            />
          </label>
          <label className="modal_form_bir">
            Ko’cha nomi
            <input
              className="modal_form_inp"
              type="text"
              name="kocha"
              ref={kochaRef}
              defaultValue={one?.kocha}
            />
          </label>
          <label className="modal_form_bir">
            Uy raqami
            <input
              className="modal_form_inp"
              type="text"
              name="uy"
              ref={uyRef}
              defaultValue={one?.uy}
            />
          </label>
          <label className="modal_form_bir">
            JSHSHIR
            <input
              className="modal_form_inp"
              type="text"
              name="jsh"
              ref={jshRef}
              defaultValue={one?.jsh}
            />
          </label>
          <label className="modal_form_bir">
            Tug’ilgan sana
            <input
              className="modal_form_inp"
              type="text"
              name="tugilgan_sana"
              ref={tugilgansanaRef}
              defaultValue={one?.tugilgan_sana}
            />
          </label>

          <label className="modal_form_bir">
            Otasining ismi
            <input
              className="modal_form_inp"
              type="text"
              name="otasini_ismi"
              ref={otasiniismiRef}
              defaultValue={one?.otasini_ismi}
            />
          </label>
          <label className="modal_form_bir">
            Ta’lim darajasi
            <input
              className="modal_form_inp"
              type="text"
              name="daraja"
              ref={darajaRef}
              defaultValue={one?.izoh}
            />
          </label>
          <label className="modal_form_bir">
            Jinsi
            <select className="modal_form_inp" name="jinsi" ref={jinsiRef} defaultValue={one?.jinsi}>
              <option value={true}>Erkak</option>
              <option value={false}>Ayol</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Ta’lim berayotgan yo’nalishi
            <select className="modal_form_inp" ref={yonalishidRef} >
              {yonalishData?.data?.map((e) => {
                return (
                  <option key={e._id} value={e._id}>
                    {e.title}
                  </option>
                );
              })}
            </select>
          </label>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              marginLeft: "12px",
            }}
          >
            <p>Rasm yuklash</p>
            <label
              className="modal_form_inp"
              style={{
                cursor: "pointer",
                paddingRight: "10px",
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
                name="rasm"
                ref={imageRef}
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateModal;
