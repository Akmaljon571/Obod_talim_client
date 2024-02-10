import React, { useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import update from "../../../img/update.svg";
import useMyHook from "../../../hooks/hooks";

const UpdateGuruh = (params) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { groupCount, setGroupCount } = useMyHook()
  const token = localStorage.getItem("token");
  const [teacher, setTeacher] = useState([]);
  const [one, setOne] = useState([]);
  const sequenceRef = useRef();
  const titleRef = useRef();
  const uqituvchiRef = useRef();
  const kunRef = useRef();
  const vaqtRef = useRef();
  const id = params.id;

  useEffect(() => {
    fetch("http://localhost:2004/teacher/all", {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data));
  }, []);

  const oneGuruh = (id) => {
    fetch(`http://localhost:2004/guruh/one/${id}`, {
      headers: {
        authorization: JSON.parse(token),
      },
    })
      .then((res) => res.json())
      .then((data) => setOne(data));
  };

  const guruhUpdate = (id) => {
    const sequence = String(sequenceRef.current.value);
    const title = titleRef.current.value;
    const uqituvchi = uqituvchiRef.current.value;
    const kun = kunRef.current.value;
    const vaqt = vaqtRef.current.value;
    const key = "update";

    fetch(`http://localhost:2004/guruh/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(token),
      },
      body: JSON.stringify({
        title,
        sequence,
        kun,
        soat: vaqt,
        teacher_id: uqituvchi,
      }),
    })
      .then(re => re.json())
      .then((data) => {
        if (data.status == 200) {
          setGroupCount(groupCount + 1)
          messageApi.open({
            key,
            type: "success",
            content: data.message,
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
      });
  };

  const showModal = () => {
    oneGuruh(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    guruhUpdate(id);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <button className="guruh_list_box_btn" onClick={showModal}>
        <img src={update} alt="update" />
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
              className="modal_form_inp"
              type="text"
              ref={titleRef}
              defaultValue={one?.title}
            />
          </label>
          <label className="modal_form_bir">
            Guruh raqami
            <input
              className="modal_form_inp"
              type="number"
              ref={sequenceRef}
              defaultValue={one?.sequence}
            />
          </label>
          <label className="modal_form_bir">
            O'qituvchi
            <select
              ref={uqituvchiRef}
              className="modal_form_inp"
              name="teacher_id"
              defaultValue={one?.uqituvchi_id}
            >
              {/* <option selected disabled>
                O'qituvchi
              </option> */}
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
            <select
              ref={kunRef}
              className="modal_form_inp"
              name="kun"
              defaultValue={one?.kun}
            >
              <option value="Du Cho Ju">Du Cho Ju</option>
              <option value="Se Pa Sha">Se Pa Sha</option>
            </select>
          </label>
          <label className="modal_form_bir">
            Dars vaqti
            <select
              ref={vaqtRef}
              className="modal_form_inp"
              name="soat"
              defaultValue={one?.soat}
            >
              <option value="9:00 11:00">9:00 11:00</option>
              <option value="11:00 13:00">11:00 13:00</option>
            </select>
          </label>
        </form>
      </Modal>
    </>
  );
};
export default UpdateGuruh;
