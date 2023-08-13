import Navbar from './Navbar';
import { useRef } from 'react';
import React, { useState } from 'react';
import {variables} from './Variables';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import image from './image/kedyi2.webp';
const Donate = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    donate: '',
    name: '',
    email:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    formRef.current.reset();
    window.open('https://fonzip.com/haytap/bagis', '_blank');

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.donate.trim() === '' ||
      formData.name.trim() === '' ||
      formData.email.trim() === '' 
    ) {

       }
  else {
    fetch(variables.API_URL + '/Donate/CreateDonate', {
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
      toastr.success('Bağışınız İçin Teşekkür Ederiz.' , 'TEŞEKKÜRLER!');
    

  };
  

}


  return (
    <div>
        <Navbar/>
        <div style={{ margin: '0', position: 'relative', width: '100%', height: '100%', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
    <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', position: 'relative', zIndex: 1 }}>
      <div style={{marginBottom:'11%',marginTop:'100px', width: '30%', padding: '30px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
    <h1 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#333333', letterSpacing: '2px' }}>Bağış Yapın</h1>
    <form ref={formRef} onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px', display: 'block' }} htmlFor="donationAmount">Bağış Miktarı:</label>
        <input
        disabled
          type="number"
          id="donationAmount"
          name='donate'
          value={formData.donate}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px', display: 'block' }} htmlFor="donorName">İsim:</label>
        <input
        disabled
          type="text"
          id="donorName"
          name='name'
          value={formData.name}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label  style={{ marginBottom: '5px', display: 'block' }} htmlFor="donorEmail">E-posta:</label>
        <input
        disabled
          type="email"
          id="donorEmail"
          name='email'
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleReset} style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#88aa5b ', color: '#fff', border: 'none' }} >Bağış Yap</button>
    </form>
  </div>
</div>
</div>

    </div>
  );
};

export default Donate;