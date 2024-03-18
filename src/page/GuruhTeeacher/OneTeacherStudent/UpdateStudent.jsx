import React, { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import download from "../../../img/download.svg";
import useMyHook from "../../../hooks/hooks";
import update from "../../../img/update.svg";
import { url } from "../../../context";

const UpdateStudent = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const { studentCount, setStudentCount } = useMyHook();
  const token = JSON.parse(localStorage.getItem("token"));
  const usernameRef = useRef();
  const familyaRef = useRef();
  const emailRef = useRef();
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
    fetch(url + "guruh/all", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);

  useEffect(() => {
    fetch(url + "student/one/" + id, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [studentCount]);

  const studentUpdate = (id) => {
    const username = usernameRef.current.value;
    const familya = familyaRef.current.value;
    const email = emailRef.current.value;
    const img = imageRef.current.files[0];
    const kocha = kochaRef.current.value;
    const uy = uyRef.current.value;
    const jsh = jshRef.current.value;
    const tugilgan = tugilgansanaRef.current.value;
    const otasiniismi = otasiniismiRef.current.value;
    const guruhraqami = guruhRaqamiRef.current.value;
    const jinsi = jinsiRef.current.value;
    const raqam = String(raqamRef.current.value);
    const key = "update";

    const formData = new FormData();
    formData.append("familiya", familya);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("kocha", kocha);
    formData.append("uy", uy);
    formData.append("jsh", jsh);
    formData.append("tugilgan_sana", tugilgan);
    formData.append("otasini_ismi", otasiniismi);
    formData.append("jinsi", Boolean(jinsi));
    formData.append("raqam", raqam);
    formData.append("guruh_id", String(guruhraqami));
    if (img) {
      formData.append("image", img);
    }
    fetch(url + "student/update/" + id, {
      method: "PATCH",
      headers: {
        authorization: token,
      },
      body: formData,
    }).then((data) => {
      if (data.ok) {
        setStudentCount(studentCount + 1);
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
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    studentUpdate(id);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileContent(file?.name);
  };

  return (
    <>
      {contextHolder}
      <button className="guruh_list_box_btn" type="primary" onClick={showModal}>
        <img src={update} alt="" />
      </button>
      <Modal
        className="check"
        title="O'quvchini o'zgartirish"
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
              defaultValue={student?.data?.email}
            />
          </label>
          <label className="modal_form_bir">
            Ko’cha nomi
            <input
              className="modal_form_inp"
              type="text"
              name="kocha"
              ref={kochaRef}
              defaultValue={student?.data?.kocha}
            />
          </label>
          <label className="modal_form_bir">
            Uy raqami
            <input
              className="modal_form_inp"
              type="text"
              name="uy"
              ref={uyRef}
              defaultValue={student?.data?.uy}
            />
          </label>
          <label className="modal_form_bir">
            JSHSHIR
            <input
              className="modal_form_inp"
              type="text"
              name="jsh"
              ref={jshRef}
              defaultValue={student?.data?.jsh}
            />
          </label>
          <label className="modal_form_bir">
            Tug’ilgan
            <input
              className="modal_form_inp"
              type="text"
              name="sana"
              ref={tugilgansanaRef}
              defaultValue={student?.data?.tugilgan_sana}
            />
          </label>
          <label className="modal_form_bir">
            Familya
            <input
              className="modal_form_inp"
              type="text"
              name="familya"
              ref={familyaRef}
              defaultValue={student?.data?.familiya}
            />
          </label>
          <label className="modal_form_bir">
            Ism
            <input
              className="modal_form_inp"
              type="text"
              name="ism"
              ref={usernameRef}
              defaultValue={student?.data?.username}
            />
          </label>
          <label className="modal_form_bir">
            Otasining ismi
            <input
              className="modal_form_inp"
              type="text"
              name="otasiismi"
              ref={otasiniismiRef}
              defaultValue={student?.data?.otasini_ismi}
            />
          </label>
          <label className="modal_form_bir">
            Guruh raqami
            <select
              className="modal_form_inp"
              ref={guruhRaqamiRef}
              defaultValue={student?.data?.guruh_id}
            >
              {guruh?.data?.map((e, i) => {
                return (
                  <option key={i} value={e._id}>
                    {e.sequence}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="modal_form_bir">
            Telefon raqami
            <input
              className="modal_form_inp"
              type="tel"
              name="raqam"
              ref={raqamRef}
              defaultValue={student?.data?.raqam}
            />
          </label>
          <label className="modal_form_bir">
            Jinsi
            <select
              className="modal_form_inp"
              name="jinsi"
              ref={jinsiRef}
              defaultValue={student?.data?.jinsi}
            >
              <option value={true}>Erkak</option>
              <option value={false}>Ayol</option>
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
                name="file"
                ref={imageRef}
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateStudent;
