import "./Login.scss";
import vector from "../../img/Vector.svg";
import logo from "../../img/logo.svg";
import { useRef, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [step, setStep] = useState(1);
  const emailRef = useRef();
  const passwordRef = useRef();
  const codeeRef = useRef();
  const navigate = useNavigate();
  const key = "login";

  const click = (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      messageApi.open({
        key: "1",
        type: "loading",
        content: "loading...",
        duration: 2,
      });
      fetch("http://localhost:2004/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((re) => re.json())
        .then((data) => {
          if (data.status === 200) {
            setStep(2);
            localStorage.setItem("data", JSON.stringify(data.data));
          }
        });
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Error",
        duration: 2,
      });
    }
  };

  const sendCode = (e) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const codeee = codeeRef.current.value;
    if (data.code === codeee && data.status === "admin") {
      messageApi.open({
        key: "",
        type: "loading",
        content: "Loading...",
        duration: 2,
      });
      fetch("http://localhost:2004/admin/login/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((re) => re.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem("token", JSON.stringify(data.token));
            navigate("/xisobot");
          }
        })
        .catch(console.log);
    } else if (data.code === codeee && data.status === "teacher") {
      messageApi.open({
        key: "",
        type: "loading",
        content: "Loading...",
        duration: 2,
      });
      fetch("http://localhost:2004/admin/login/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((re) => re.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem("teacher", JSON.stringify(data.find));
            localStorage.setItem("token", JSON.stringify(data.token));
            navigate("/statistika");
          }
        })
        .catch(console.log);
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Code Error",
        duration: 2,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="wrapper">
        <img
          className="vect_img"
          src={vector}
          alt="logo"
          width={792}
          height={592}
        />

        <div>
          <div className="form">
            <img
              className="logo"
              src={logo}
              alt="logo"
              width={164}
              height={107}
            />

            <div className="form_box">
              {step === 1 ? (
                <>
                  <p className="form_text">Email orqali</p>
                  <input
                    type="email"
                    className="form_input"
                    placeholder="Email"
                    ref={emailRef}
                  />

                  <p className="form_text">Parol</p>
                  <input
                    type="password"
                    className="form_input"
                    placeholder="Parolingizni kiriting"
                    ref={passwordRef}
                  />
                </>
              ) : (
                <>
                  <p className="form_text">Code</p>
                  <input
                    className="form_input"
                    placeholder="Email code"
                    type="number"
                    ref={codeeRef}
                  />
                </>
              )}
              <button
                onClick={() => (step === 1 ? click() : sendCode())}
                className="form_btn"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
