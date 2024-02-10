import { useRef } from "react";
import "./Students.scss";
import { useParams } from "react-router-dom";

function Table() {
  const textRef = useRef()
  const { id } = useParams()
  const token = localStorage.getItem("token");

  const send = () => {
    const desc = textRef.current.value
    fetch('http://localhost:2004/sms/send', {
      method: "POST",
      headers: {
        authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desc,
        send_id: id,
        status: 'teacher',
      })
    })
    textRef.current.value = ''
  }

  return (
    <>
      <div className="table">
        <form style={{ marginTop: "-17px" }} className="table_form_form">
          <textarea ref={textRef} placeholder="Ustozga habar yuborish" style={{ borderRadius: '10px', height: "250px" }} className="table_form_form_inp" type="text"></textarea>
          <button onClick={send} type="button" style={{ padding: "10px 20px" }} className="table_form_form_btn">Send</button>
        </form>
      </div>
    </>
  );
}

export default Table;
