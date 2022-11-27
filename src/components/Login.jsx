import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import bgLogin from "../Img/bgLogin.png";
import logo from "../Img/Medtech_sm.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const tele = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [dataDokter, setDataDokter] = useState();

  useEffect(() => {
    axios.get("https://rolenakes-production.up.railway.app/auth/register").then((response) => {
      setDataDokter(response.data.data);
      console.log(response.data.data);
      console.log(dataDokter);
    });
  }, []);
  // for (let i = 0; i < dataDokter.length; i++) {
  //   console.log(dataDokter[i]);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAlert = false;
    for (let i = 0; i < dataDokter.length; i++) {
      // if (username === dataDokter[i].email && password === dataDokter[i].password) {
      if (username === dataDokter[i].email) {
        console.log(dataDokter[i]);
        const key = "user";
        localStorage.setItem(key, JSON.stringify(dataDokter[i]));

        // localStorage.setItem(key, JSON.stringify(1));
        isAlert = true;
        // setIsLogin(true);
        if (dataDokter[i].roles === "nakes") {
          tele("/daftar");
          break;
        } else {
          tele("/dashboard");
          break;
        }
      }
    }
    if (!isAlert) {
      alert("Masukkan username atau password yang benar");
    }
  };

  useEffect(() => {}, [isLogin]);

  return (
    <div id="login-bg">
      <div id="login" onSubmit={handleSubmit}>
        <div className="container-fluid">
          <section className="login d-flex">
            <div className="login-left w-50 h-50">
              <div className="row justify-content-center align-items-center">
                <div className="img-logo text-center">
                  <img src={logo} alt="Logo Medtech" className="img-logo img-thumbnail" style={{ backgroundColor: "#405262", borderColor: "#405262" }} />
                </div>
              </div>
              <div className="col-6">
                <div className="header">
                  <h1>Login</h1>
                </div>
                <div className="login-form">
                  <form id="userForm">
                    <label htmlFor="username" className="form-label"></label>
                    <input type="text" className="form-control" id="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="password" className="form-label"></label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className="text-center">
                      <button type="submit" className="sign-in align-items-center">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="login-right w-40 h-50">
              <img src={bgLogin} alt="Background Login" className="bg-login" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
