import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../apiHelpers/apiHelper";
import { useDispatch } from "react-redux";
import { userActions } from "../store";

const Auth = () => {
  const dispatch = useDispatch()
  const onReceiveFunction = (data)=>{
    dispatch(userActions.login)
    localStorage.setItem("user Id" , data.id)
  }


  const getData = (data) => {
    console.log(data, "from auth");
    sendUserAuthRequest(data.input, data.signup)
    .then(onReceiveFunction)
    .catch((err) => console.log("err in auth"));
  };
  return (
    <div>
      { false ?  < AuthForm onSubmit={getData} isAdmin={false} /> : " " }
    </div>
  );
};

export default Auth;
