import { useNavigate } from "react-router-dom";
import "./header.scss";

function Header() {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="xisobot_box">
        <h2 className="xisobot_box_h2">Obod Ta'lim</h2>
        <p className="xisobot_box_date">
          {date.length === 1 ? "0" + date : date}.
          {month.length === 1 ? "0" + month : month}.{year}
        </p>
        <button className="xisobot_box_btn" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
