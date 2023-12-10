import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"; // Link, Redirect
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
// import alertify from 'alertifyjs';

function LoginLink(props) {
  const dispatch = useDispatch();
  const history = useHistory()

  const onRedirect = () => {
    const vertifyLogout = window.confirm("Bạn có chắc muốn đăng xuất chứ?");
    if (vertifyLogout) {
      return UserAPI.postLogout()
        .then((response) => {
          alert(response?.meta.message || "Server đã bị lỗi vui lòng thử lại!");
        })
        .then(() => {
          const action = deleteSession("");
          dispatch(action);
          return localStorage.clear();
        })
        .then(() => {
          history.push('/signin');
          return window.location.reload(); 
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <a className="nav-link" to='/signin'>
        ( Logout )
      </a>
    </li>
  );
}

export default LoginLink;
