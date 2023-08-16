import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";

const AdminRoute=()=>{
    const [ok,setOk]=useState(false);
    const URL = process.env.REACT_APP_API;


    const [auth]= useAuth();

    useEffect(()=>{
        const authCheck=async()=>{
                const res=await axios.get(`${URL}/api/v1/auth/admin-auth`)
                if(res.data.ok){
                    setOk(true);
                }   
        }
        if(auth?.token){
                authCheck()
        }
    },[auth?.token]);

    return ok?<Outlet/>:<Spinner path=""/>
}

export default AdminRoute;