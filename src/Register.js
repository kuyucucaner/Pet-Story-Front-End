import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { variables } from './Variables';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { useNavigate } from "react-router-dom";
import './Register.css';
import image from './image/köpke2.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setFormData({ ...formData, [e.target.name]: numericValue });
  };
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username.trim() === '' ||
      formData.password.trim() === '' ||
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.phoneNumber.trim() === '' ||
      formData.address.trim() === ''
    ) {
      setError(true);
      toastr.error('Bilgilerinizi Eksik Girdiniz.', 'Dikkat!');
    } else {
      fetch(variables.API_URL + '/LoginUsers/CreateLoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    };
    setError(false);
    console.log('Form submitted');
    toastr.success('Giriş Sayfasına Yönlendiriliyorsunuz.');
    toastr.success('Başarıyla Kayıt Oldunuz.', 'Teşekkürler');

    navigate('/');
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
                          <h4 className="giris"><FontAwesomeIcon icon={faShieldCat} size="lg" beat />    Pet Story    <FontAwesomeIcon icon={faShieldCat} size="lg" beat /></h4>
                          <h4 className="giris">Yeni Üyelik Bilgilerini Giriniz.</h4>
                        </div>
                        <div className="tum7-2">
                          <div className="form-1">
                            <form onSubmit={handleSubmit}>
                              {error && <div className="alert alert-danger">Lütfen tüm alanları doldurunuz.</div>}
                              <div className="bilgi">
                                <label htmlFor="username" className="lbl2">
                                  Kullanıcı Adı
                                </label>
                                <label htmlFor="password" className="lbl2">
                                  Şifre
                                </label>
                                <div className="kullanici-inp2">
                                  <input
                                    className="kullanici-input"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Kullanıcı Adınızı Giriniz"
                                    required
                                  />
                                  <input
                                    className="kullanici-input"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Şifrenizi Giriniz."
                                    required
                                  />
                                </div>
                              </div>
                              <div className="bilgi">
                                <label htmlFor="firstName" className="lbl3">
                                  Ad
                                </label>
                                 <label htmlFor="lastName" className="lbl3" style={{ marginLeft: "220px" }}>
                                  Soyad
                                </label>
                                <div className="kullanici-inp2">
                                  <input
                                    className="kullanici-input"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Adınızı Giriniz."
                                    required
                                  />
                                  <input
                                    className="kullanici-input"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Soyadınızı Giriniz."
                                    required
                                  />
                                </div>
                              </div>
                              <div className="bilgi">
                                <label htmlFor="phoneNumber" className="lbl">
                                  Telefon Numarası
                                </label>
                                <div className="kullanici-inp">
                                  <input
                                    className="kullanici-input"
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange2}
                                    placeholder="555-555-5555"
                                    maxLength="10"
                                    pattern="[0-9]*"
                                     
                                  />
                                </div>
                              </div>
                              <div className="bilgi">
                                <label htmlFor="address" className="lbl">
                                  Adres
                                </label>
                                <div className="kullanici-inp">
                                  <textarea
                                    className="kullanici-input2"
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Adresinizi Giriniz."
                                    required
                                  />
                                </div>
                              </div>

                              <div className="enter">
                                <div className="enter-2">
                                  <button type="submit" className="buton">
                                    Kayıt Ol
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="unut">
                                <Link to="/">Giriş Yap</Link>
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
