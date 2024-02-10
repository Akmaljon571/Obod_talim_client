import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { message } from "antd";
import useMyHook from "../../../hooks/hooks";

const Modall = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const { groupCount, setGroupCount } = useMyHook()
  const token = localStorage.getItem("token");
  const squenseRef = useRef();
  const titleRef = useRef();
  const uqituvchiRef = useRef();
  const darskunRef = useRef();
  const darsvaqtRef = useRef();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetch("http://localhost:2004/teacher/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data)
        setGroupCount(groupCount + 1)
      });
  }, []);

  const addGuruh = () => {
    const squense = squenseRef.current.value;
    const title = titleRef.current.value;
    const uqituvchi = uqituvchiRef.current.value;
    const darskun = darskunRef.current.value;
    const darsvaqt = darsvaqtRef.current.value;
    const key = "add";

    if (squense && title && uqituvchi && darskun && darsvaqt) {
      fetch("http://localhost:2004/guruh/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(token),
        },
        body: JSON.stringify({
          title: title,
          sequence: squense,
          kun: darskun,
          soat: darsvaqt,
          teacher_id: uqituvchi,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 201) {
            messageApi.open({
              key,
              type: "success",
              content: "Muvaffaqiyatli",
              duration: 2,
            });
          } else {
            messageApi.open({
              key,
              type: "error",
              content: "Muvaffaqiyatsiz!",
              duration: 2,
            });
          }
          squenseRef.current.value = ""
          titleRef.current.value = ""
          uqituvchiRef.current.value = ""
          darskunRef.current.value = ""
          darsvaqtRef.current.value = ""
        });
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Hamma malumotni to'ldiring",
        duration: 2,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    addGuruh();
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
        title="O'qituvchi qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="modal_form">
          <label className="modal_form_bir">
            Guruh nomi
            <input
              ref={titleRef}
              className="modal_form_inp"
              type="text"
              name="title"
            />
          </label>
          <label className="modal_form_bir">
            Guruh raqami
            <input
              ref={squenseRef}
              className="modal_form_inp"
              type="number"
              name="sequence"
            />
          </label>
          <label className="modal_form_bir">
            O'qituvchi
            <select
              ref={uqituvchiRef}
              className="modal_form_inp"
              name="teacher_id"
            >
              <option selected disabled>
                O'qituvchi
              </option>
              {teacher?.data?.map((e, i) => {
                return (
                  <option key={i} value={e._id}>
                    {e.username}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="modal_form_bir">
            Dars kunlari
            <select ref={darskunRef} className="modal_form_inp" name="kun">
              <option disabled selected>
                Dars kunlari
              </option>
              <option value="Du Cho Ju">Du Cho Ju</option>
              <option value="Se Pa Sha">Se Pa Sha</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Dars vaqti
            <select ref={darsvaqtRef} className="modal_form_inp" name="soat">
              <option defaultValue={"Dars vaqti"} selected disabled>
                Dars vaqti
              </option>
              <option value="9:00 11:00">9:00 11:00</option>
              <option value="11:00 13:00">11:00 13:00</option>
            </select>
          </label>
        </form>
      </Modal>
    </>
  );
};
export default Modall;
