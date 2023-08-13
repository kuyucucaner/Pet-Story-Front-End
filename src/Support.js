import React, { useState } from 'react';
import Navbar from './Navbar';
import {variables} from './Variables';
import { useRef ,useEffect  } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import image from './image/kedyi2.webp';
const Support = () => {
  const formRef = useRef(null);
  const username = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
  const [formData, setFormData] = useState({
    username : '',
    name: '',
    email: '',
    message:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleButtonClick = () => {

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.message.trim() === '' 
    ) {
       toastr.error('Lütfen tüm alanları doldurunuz.');
       }
  else {
    fetch(variables.API_URL + '/Support/CreateSupport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept":'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Success: ' + data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      toastr.success('Mesajınız Destek Birimine Ulaştırıldı.');
  };}
  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
    setFormData({ ...formData, username: storedUsername });
  }, []);
  return (
    <div> 
        <Navbar/>
        <div style={{ margin: '0', position: 'relative', width: '100%', height: '740px', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
    <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', position: 'relative', zIndex: 1 }}>
      <div style={{marginTop:'100px', width: '30%', padding: '30px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
    <h1 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#333333', letterSpacing: '2px' }}>Bize Ulaşın</h1>
    <form ref={formRef} onSubmit={handleSubmit}>
    <div style={{ marginBottom: '10px' }}>
              <input
                disabled
                className="gizli-input"
                type="text"
                id="username"
                name="username"
                value={username}
                defaultValue={username}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name" style={{ marginBottom: '5px', display: 'block' }}>Adınız:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email" style={{ marginBottom: '5px', display: 'block' }}>E-posta Adresiniz:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="message" style={{ marginBottom: '5px', display: 'block' }}>Mesajınız:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <button  onClick={handleButtonClick} type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#88aa5b', color: '#fff', border: 'none' }}>
        Gönder
      </button>
    </form>
  </div>
</div>
</div>
    </div>
  );
};

export default Support;
