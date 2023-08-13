import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Login.css';
import './App';
import { variables } from './Variables';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import image from './image/köpke2.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";


export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {

  }, []);
  async function login() {
    let item = { username, password };
    let result = await fetch(variables.API_URL + '/Auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))
    localStorage.setItem('kullanici-sifre', JSON.stringify({ username, password }));
    console.log(localStorage.getItem('kullanici-sifre'));
    console.log(localStorage.getItem('user-info'));
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo && userInfo.hata === true) {
      navigate("/home");
      toastr.success('Girişiniz Başarılı.', 'Tebrikler');
    }
    else {
      toastr.error('Hatalı Giriş.', 'Dikkat!');
    }

  }
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
    }}>
      <img src={image} alt="Background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(70%)',
      }} />
      <div className="login">
        <div className="container">
          <div className="tum">
            <div className="tum-2">
              <div className="tum-3">
                <div className="tum-4">
                  <div className="tum-5">
                    <div className="tum-6">
                      <div className="tum-7">
                        <div className="tum-7-1">
                          <div className="tum-7-1-1">
                            <h4 className="giris"> <FontAwesomeIcon icon={faShieldCat} size="lg" beat />    Pet Story    <FontAwesomeIcon icon={faShieldCat} size="lg" beat /></h4>
                            <h4 className="giris">Üyelik Bilgilerinizi Giriniz.</h4>
                          </div>
                          <div className="tum7-2">
                            <div className="form-1">
                              <form onSubmit={(e) => e.preventDefault()}>
                                <div className="bilgi">
                                  {/* <div className="alert alert-danger" for=""> Geçersiz Kullanıcı Adı veya Şifre</div> */}
                                  <label htmlFor="username" className="lbl">
                                    Kullanıcı Adı
                                  </label>
                                  <div className="kullanici-inp">
                                    <input className="kullanici-input" autoComplete="username" onChange={(e) => setUserName(e.target.value)} type="text" id="username"
                                      placeholder="Kullanıcı Adınız" required />
                                  </div>
                                </div>
                                <div className="bilgi">
                                  <label htmlFor="password" className="lbl">
                                    Şifre
                                  </label>
                                  <div className="kullanici-inp">
                                    <input className="kullanici-input" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Şifreniz"
                                      required />
                                  </div>
                                </div>
                                <div className="enter">
                                  <div className="enter-2">
                                    <button onClick={login} className="buton">Giriş
                                      <i className="fa-solid fa-right-to-bracket"></i></button>
                                  </div>
                                </div>
                                <div className="unut">
                                  <Link to="/Register">Kayıt Ol</Link>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
