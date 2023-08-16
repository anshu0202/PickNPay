import axios from "axios";

const URL = process.env.REACT_APP_API;

export const RegisterData = async (body) => {
  try {
   
    const res=await axios.post(`${URL}/api/v1/auth/register`, body)
    return res;
  } catch (error) {
    console.log("Error while register api call ", error.message);
  }
};

export const LoginData = async (body) => {
  try {
    
    const res=await axios.post(`${URL}/api/v1/auth/login`, body)
    return res;
  } catch (error) {
    console.log("Error while login api call ", error.message);
  }
};

export const updateProfile=async(body)=>{
       const {data}=await axios.put(`${URL}/api/v1/auth/update-profile`,body);
       return data;
}

export const ForgotPasswordData = async (body) => {
  try {
    const res=await axios.post(`${URL}/api/v1/auth/forgot-password`, body)
    return res;
  } catch (error) {
    console.log("Error while forgot-password api call ", error.message);
  }
};
