import { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import download from "../../../img/download.svg";
import useMyHook from "../../../hooks/hooks";
import "./Modal.scss";

const Modall = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yonalish, setYonalish] = useState([]);
  const { teacherCount, setTeacherCount } = useMyHook()
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
  const key = "add";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:2004/yonalish/all")
      .then((res) => res.json())
      .then((data) => setYonalish(data));
  }, []);

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
    const yonalish = yonalishidRef.current.value;
    const jinsi = jinsiRef.current.value;
    const raqam = Number(raqamRef.current.value);
    const daraja = darajaRef.current.value;
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
      yonalish &&
      raqam &&
      daraja
    ) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("familiya", familya);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", img);
      formData.append("kocha", kocha);
      formData.append("uy", uy);
      formData.append("jsh", jsh);
      formData.append("tugilgan_sana", tugilgan);
      formData.append("otasini_ismi", otasiniismi);
      formData.append("yonalish_id", yonalish);
      formData.append("jinsi", jinsi);
      formData.append("raqam", raqam);
      formData.append("izoh", daraja);
      fetch("http://localhost:2004/teacher/create", {
        method: "POST",
        headers: {
          authorization: JSON.parse(token),
        },
        body: formData,
      }).then((data) => {
        if (data.ok) {
          setTeacherCount(teacherCount + 1)
          messageApi.open({
            key,
            type: "success",
            content: "Loaded!",
            duration: 2,
          });
        } else {
          messageApi.open({
            key,
            type: "error",
            content: "Loaded!",
            duration: 2,
          });
        }
      });
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Loaded!",
        duration: 2,
      });
    }
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

  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileContent(file?.name);
  };
  return (
    <>
      {contextHolder}
      <button className="xisobot_flex_btn" type="primary" onClick={showModal}>
        Qo’shish
      </button>
      <Modal
        className="check"
        title="O'qituvchi qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal_form">
          <label className="modal_form_bir">
            Email
            <input className="modal_form_inp" type="email" ref={emailRef} />
          </label>
          <label className="modal_form_bir">
            Password
            <input
              className="modal_form_inp"
              type="password"
              ref={passwordRef}
            />
          </label>
          <label className="modal_form_bir">
            Ko’cha nomi
            <input className="modal_form_inp" type="text" ref={kochaRef} />
          </label>
          <label className="modal_form_bir">
            Uy raqami
            <input className="modal_form_inp" type="number" ref={uyRef} />
          </label>
          <label className="modal_form_bir">
            JSHSHIR
            <input className="modal_form_inp" type="text" ref={jshRef} />
          </label>
          <label className="modal_form_bir">
            Ism
            <input className="modal_form_inp" type="text" ref={usernameRef} />
          </label>
          <label className="modal_form_bir">
            Familya
            <input className="modal_form_inp" type="text" ref={familyaRef} />
          </label>
          <label className="modal_form_bir">
            Telefon raqam
            <input
              className="modal_form_inp"
              defaultValue={998}
              ref={raqamRef}
            />
          </label>
          <label className="modal_form_bir">
            Otasining ismi
            <input
              className="modal_form_inp"
              type="text"
              ref={otasiniismiRef}
            />
          </label>
          <label className="modal_form_bir">
            Ta’lim darajasi
            <input className="modal_form_inp" type="text" ref={darajaRef} />
          </label>
          <label className="modal_form_bir">
            Tug’ilgan
            <input
              className="modal_form_inp"
              type="date"
              ref={tugilgansanaRef}
            />
          </label>
          <label className="modal_form_bir">
            Jinsi
            <select className="modal_form_inp" ref={jinsiRef}>
              <option value={true}>Erkak</option>
              <option value={false}>Ayol</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Yo’nalishi
            <select
              ref={yonalishidRef}
              className="modal_form_inp"
              name=""
              id=""
            >
              {yonalish?.data?.map((e) => {
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
                overflow: "hidden",
              }}
            >
              <img className="modal_form_img" src={download} alt="modal_img" />
              <span className="modal_form_spn">{fileContent}</span>
              <input
                ref={imageRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                className="modal_form_inp"
                type="file"
                name=""
              />
            </label>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Modall;
