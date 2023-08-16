import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

import toast  from "react-hot-toast";
import { ForgotPasswordData } from "../../services/LoginApi";
// import { useAuth } from "../../context/auth";

import {useNavigate} from "react-router-dom"

const ForgotPassword = () => {
  
    const [email, setEmail] = useState("");
  
    const [newPassword ,setNewPassword]= useState("");
    
    const [answer, setAnswer]= useState("");
    

  
    const navigate=useNavigate();
       //form function
    const handleSubmit = async (e) => {
      e.preventDefault();
       try{
  
        const res= await ForgotPasswordData({email,newPassword,answer})

        console.log("res fron back ",res);
  
        if(res && res.data.success){
          toast.success(res.data.message)
          navigate("/login")
        }
        else{
          toast.error(res.data.message)
        }
  
       }
       catch(error){
           console.log("error while FORGOT password ", error);
           toast.error(`Something went wrong ${error.message}`)
       }
    };



  return (
    <Layout title={"Forgo t-Password"}>
      <div className="register">
        <form onSubmit={handleSubmit}>
         <h3>Reset Password</h3> 
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              What is your favourite sports?
            </label>
            <input
              type="password"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              required
            />
          </div>
       
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form> 
      </div>
    </Layout>
  );
};

export default ForgotPassword;
