import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import resim1 from './image/profilephoto.webp';
import { variables } from './Variables';
import image from './image/kedyi2.webp';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const isAuthenticated = localStorage.getItem('kullanici-sifre');
  useEffect(() => {
    const username = JSON.parse(isAuthenticated).username;
    fetch(variables.API_URL + `/LoginUsers/LoginUserDetail?name=${encodeURIComponent(username)}&fields=firstname,lastname,phonenumber,address,isownership,ispurchase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then(data => {
        setUserDetails(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          boxShadow: '0px 0px 15px 10px rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
        }}
      >
        <img
          src={image}
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(60%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '100px',
            paddingBottom: '190px',
            height: '100vh',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
              padding: '50px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              backgroundColor: 'white',
              maxWidth: '500px', // Responsive max-width
              margin: '0 auto', // Center the content
              borderRadius: '12px',
            }}
          >
            <div style={{       borderRadius: '8px',border: '1px solid #ccc', marginBottom: '20px',  boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)', }}>
              <img style={{ width: '100px' }} src={resim1} alt="Resim 1" />
            </div>
            <div style={{  paddingTop:'15px',   paddingBottom:'15px',  borderRadius: '8px',textAlign: 'left' ,boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',paddingRight:'15px',paddingLeft:'15px'}}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#888' }}>
                Kullanıcı Adı: {JSON.parse(isAuthenticated).username}
              </h3>
              <p style={{ fontWeight: 'bold' }}>Ad: {userDetails.firstName}</p>
              <p style={{ fontWeight: 'bold' }}>Soyad: {userDetails.lastName}</p>
              <p style={{ fontWeight: 'bold' }}>Telefon Numarası: {userDetails.phoneNumber}</p>
              <p style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>Adres: {userDetails.address}<br></br></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
