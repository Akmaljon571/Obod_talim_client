// import "./Layout.scss";
import log from "../../img/photo.png";
import home from "../../img/Home.svg";
import teacher from "../../img/teacher.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function LayoutTeacher() {

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
            to={"/statistika"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img src={home} alt="home" width={25} height={25} />
            <p className="box_wrapper_list_item_text">Statistika</p>
          </NavLink>

          <NavLink
            to={"/groups/teacher"}
            className={({ isActive }) =>
              isActive
                ? "box_wrapper_list_item"
                : "box_wrapper_list_item_noactive"
            }
          >
            <img src={teacher} alt="home" width={25} height={25} />
            <p className="box_wrapper_list_item_text">Guruhlar</p>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default LayoutTeacher;
