import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
// import alertify from 'alertifyjs';

function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = () => {
    const vertifyLogout = window.confirm("Bạn có chắc muốn đăng xuất chứ?");
    if (vertifyLogout) {
      return UserAPI.postLogout()
        .then((response) => {
          alert(response?.meta || "Server đã bị lỗi vui lòng thử lại!");
        })
        .then(() => {
          const action = deleteSession("");
          dispatch(action);
          return localStorage.clear();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
