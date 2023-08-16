import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

import toast  from "react-hot-toast";
import { RegisterData } from "../../services/LoginApi";


import {useNavigate} from "react-router-dom"

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate=useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
     try{

      const res= await RegisterData({name,email,phone,address,password, answer})

      if(res && res.data.success){
        toast.success(res.data && res.data.message)
        navigate("/login")
      }
      else{
        toast.error(res.data.message)
      }

     }
     catch(error){
         console.log("error while register ", error);
         toast.error(`Something went wrong ${error.message}`)
     }
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              What is your favourite sports ?
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmai2"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
                      </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
