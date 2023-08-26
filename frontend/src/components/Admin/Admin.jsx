import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../../apiHelpers/apiHelper";
import { useDispatch } from "react-redux";
import { adminActions } from "../store";

const Admin = () => {
  const dispatch = useDispatch()
  dispatch(adminActions.login())
  const onResRecieved = (data)=>{
    console.log(data)
      dispatch(adminActions.login)
      localStorage.setItem("adminId",data.id)
      localStorage.setItem("token",data.token)
      
  }

  const getData = (data) => {
    console.log(data, "in admin");
    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch((err) => console.log("err in admin"));
  };

  return (
    <div>
     { false ? <AuthForm onSubmit={getData} isAdmin={true} /> : " "}
    </div>
  );
};

export default Admin;
