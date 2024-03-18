import { useRef } from "react";
import "./Students.scss";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { url } from "../../../context";

function Table() {
  const textRef = useRef();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("token");
  const key = "add"

  const send = () => {
    const desc = textRef.current.value;
    fetch(url + "sms/send", {
      method: "POST",
      headers: {
        authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc,
        send_id: id,
        status: "teacher",
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
          window.location.reload(true);
        } else {
          messageApi.open({
            key,
            type: "error",
            content: "Loaded!",
            duration: 2,
          });
        }
      });
    textRef.current.value = "";
  };

  return (
    <>
      {contextHolder}
      <div className="table">
        <form style={{ marginTop: "-17px" }} className="table_form_form">
          <textarea
            ref={textRef}
            placeholder="Ustozga habar yuborish"
            style={{ borderRadius: "10px", height: "250px" }}
            className="table_form_form_inp"
            type="text"
          ></textarea>
          <button
            onClick={send}
            type="button"
            style={{ padding: "10px 20px" }}
            className="table_form_form_btn"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Table;
