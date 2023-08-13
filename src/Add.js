import React, { useState } from 'react';
import Navbar from './Navbar';
import { variables } from './Variables';
import { useRef ,useEffect} from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import image from './image/kedyi2.webp';

const Add = () => {
  
  const formRef = useRef(null);
  const username = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
  const [formData, setFormData] = useState({
    username : '',
    petName: '',
    petType: '',
    petGenus: '',
    petAge: '',
    petColor: '',
    isPetSick:''  
    // price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setFormData({ ...formData, [e.target.name]: numericValue });
  };
  const handleButtonClick = () => {
  };
  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
    setFormData({ ...formData, username: storedUsername });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.petName.trim() === '' ||
      formData.petType.trim() === '' ||
      formData.petGenus.trim() === '' ||
      formData.petAge.trim() === '' ||
      formData.petColor.trim() === '' ||
      formData.isPetSick.trim() === '' 
    ) {
      toastr.error('Lütfen tüm alanları doldurunuz.');
    } else {
      fetch(variables.API_URL + '/Pets/CreatePets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Son işlem üzerinden 1 ay geçmedi!');
        }
        return response.text();
      })
      .then(data => {
        console.log('Success:', data);
        toastr.success('İlan Başarıyla Verildi.');

      })
      .catch(error => {
        console.error('Error:', error);
        toastr.error(error.message);
      });
    }
  };
  
  return (
    <div>
      <Navbar />
      <div style={{ margin: '0', position: 'relative', width: '100%', height: '100%', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(60%)' }} />
    <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', position: 'relative', zIndex: 1 }}>
      <div style={{marginBottom : '40px',marginTop:'40px', width: '30%', padding: '30px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
      <h3 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '30px', fontWeight: 'bold', color: '#333333', letterSpacing: '2px' }}>Sahiplendirme İlanı Verin</h3>
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
              <label htmlFor="petName" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Adı:</label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="petType" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Türü:</label>
              <input
                type="text"
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            {/* <div style={{ marginBottom: '10px' }}>
              <label htmlFor="petGenus" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Cinsiyeti:</label>
              <input
                type="text"
                id="petGenus"
                name="petGenus"
                value={formData.petGenus}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div> */}
             <label htmlFor="isPetSick" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Hastalık Durumu:</label>
            <select
              id="isPetSick"
              name="isPetSick"
              value={formData.isPetSick}
              onChange={handleChange}
           
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Hastalık Durumu</option>
              <option value="true">Hasta</option>
              <option value="false">Hasta Değil</option>
            </select>
              

            <label htmlFor="petGenus" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Cinsiyeti:</label>
            <select
              id="petGenus"
              name="petGenus"
              value={formData.petGenus}
              onChange={handleChange}
           
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Cinsiyet Seçiniz </option>
              <option value="Erkek">Erkek</option>
              <option value="Dişi">Dişi</option>
            </select>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="petAge" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Yaşı:</label>
              <input
                type="text"
                id="petAge"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange2}
                maxLength="2"
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="petColor" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Rengi:</label>
              <input
                type="text"
                id="petColor"
                name="petColor"
                value={formData.petColor}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            {/* <div style={{ marginBottom: '10px' }}>
              <label htmlFor="price" style={{ marginBottom: '5px', display: 'block' }}>Fiyat:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div> */}
            <button  onClick={handleButtonClick} type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#4c5e35', color: '#fff', border: 'none' }}>
              İlan Ver
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Add;
