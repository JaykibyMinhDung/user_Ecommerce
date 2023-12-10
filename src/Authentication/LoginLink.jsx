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
    console.log(vertifyLogout)
    if (vertifyLogout) {
      return UserAPI.postLogout()
        .then((response) => {
          console.log('b1')
          alert(response?.meta.message || "Server đã bị lỗi vui lòng thử lại!");
        })
        .then(() => {
          console.log('b2')
          const action = deleteSession("");
          dispatch(action);
          return localStorage.clear();
        })
        .then(() => {
          console.log('b3')
          return history.push('/signin');
          // <Redirect to='signin' />
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
