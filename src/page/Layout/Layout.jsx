import "./Layout.scss";
import log from "../../img/photo.png";
import home from "../../img/Home.svg";
import student from "../../img/student.svg";
import teacher from "../../img/teacher.svg";
import teacher2 from "../../img/o'qituvchilar.png";
import { NavLink } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="box_wrapper">
        <div className="box_wrapper_box">
          <img src={log} alt="main" width={60} height={50} />
          <a href="/xisobot" className="box_wrapper_box_text">
            OBOD <br /> TA'LIM
          </a>
        </div>

        <ul className="box_wrapper_list">
          <NavLink
            to={"/xisobot"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img src={home} alt="home" width={25} height={25} />
            <p className="box_wrapper_list_item_text">Xisobot</p>
          </NavLink>
          <NavLink
            to={"/teachers"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img src={student} alt="home" width={25} height={25} />
            <p className="box_wrapper_list_item_text">O’qituvchilar</p>
          </NavLink>
          <NavLink
            to={"/groups"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img src={teacher} alt="home" width={25} height={25} />
            <p className="box_wrapper_list_item_text">Guruhlar</p>
          </NavLink>
          <NavLink
            to={"/student"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img
              className="box_wrapper_list_item_img"
              src={teacher2}
              alt="home"
              width={25}
              height={25}
            />
            <p className="box_wrapper_list_item_text">O’quvchilar</p>
          </NavLink>
          <NavLink
            to={"/yunalish"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img
              className="box_wrapper_list_item_img"
              src={teacher2}
              alt="home"
              width={25}
              height={25}
            />
            <p className="box_wrapper_list_item_text">Yunalishlar</p>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Layout;
