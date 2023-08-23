import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

import "../../style/login.css";
import toast from "react-hot-toast";
import { LoginData } from "../../services/LoginApi";
import { useAuth } from "../../context/auth";

import { useNavigate, useLocation } from "react-router-dom";
import login from "../../images/login.png";

const Login = () => {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginData({ email, password });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error while register ", error);
      toast.error(`Something went wrong ${error.message}`);
    }
  };

  //   return (
  //     <Layout title={"Login"}>
  //       <div className="register">
  //         <form onSubmit={handleSubmit}>
  //          <h3>LOGIN FORM</h3>

  //           <div className="mb-3">
  //             <label htmlFor="exampleInputEmail1" className="form-label">
  //               Email
  //             </label>
  //             <input
  //               type="email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               className="form-control"
  //               id="exampleInputEmail"
  //               required
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="exampleInputEmail1" className="form-label">
  //               Password
  //             </label>
  //             <input
  //               type="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               className="form-control"
  //               id="exampleInputPassword"
  //               required
  //             />
  //           </div>
  //           <div className="mb-3">

  //           <button type="submit" className="btn btn-primary">
  //             Login
  //           </button>

  //           </div>
  //           <button type="button" className="btn btn-primary" onClick={()=>navigate("/forgot-password")}>
  //             Forgot Password
  //           </button>
  //         </form>
  //       </div>
  //     </Layout>
  //   );
  // };

  return (
    <Layout title={"Login"}>
      <div className="logged">
        <div className="mainlogin">
          <div className="loginLeft">
            <h4 className="text-center" style={{ color: "white" }}>
              Welcome to Login
            </h4>
            <img src={login} alt="login img" className="img_login" />
          </div>
          <div className="loginForm">
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn_log">
                  Login
                </button>
              </div>
              <button
                type="button"
                className="btn btn_log"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
