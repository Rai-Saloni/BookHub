import React,{useState,useEffect} from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import {Navigate,useParams} from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { otpVerification,resetAuthSlice } from "../store/slices/authSlice";
import {toast} from "react-toastify";


const OTP = () => {
  const {email} = useParams();
  const [otp,setOtp] = useState("");
  const dispatch=useDispatch();


const { loading , error , message , user , isAuthenticated }= useSelector((state)=>state.auth);
const handleOtpVerification =(e)=>{
  e.preventDefault();
  dispatch(otpVerification(email,otp));
};



useEffect(()=>{
  if(message){
    toast.success(message);
  }
  if(error){
    toast.error(error);
    dispatch(resetAuthSlice());
  }
},[message,error,navigateTo,dispatch]);

if(isAuthenticated) {
  return <Navigate to={"/"} />;
}


  return <></>;
};

export default OTP;
