
import './App';
import { variables } from './Variables';
import Navbar from './Navbar';
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import image from './image/kedyi2.webp';
import 'toastr/build/toastr.css';
import ReactPaginate from 'react-js-pagination';



function Item() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [item, setItems] = useState([]);
  const username = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
    setFormData({ ...formData, username: storedUsername });
    fetch(variables.API_URL + '/Items/ItemsList')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error:', error));
  }, []);
  const [addModalShow, setAddModalShow] = useState(false);
  const [formData, setFormData] = useState({
    username : '',
    name: '',
    address: '',
    phoneNumber: '',
    itemName : '',

  });

  const totalItems = item.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setFormData({ ...formData, [e.target.name]: numericValue });
  }
    
  const currentItems = item.slice(startIndex, endIndex);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleShowModal = (x) => {
    setAddModalShow(true);
    setSelectedFoodItem(x);
    setFormData({ ...formData, itemName: x.itemName, itemId: x.itemId });
  };

  const handleCloseModal = () => {
    setAddModalShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

       if (
      formData.name.trim() === '' ||
      formData.address.trim() === '' ||
      formData.phoneNumber.trim() === '' ||
      formData.itemName.trim() === ''
    ) {
       toastr.error('Lütfen tüm alanları doldurunuz.');
  }else {
    fetch(variables.API_URL + '/Support/CreateSupportToBuyItem', {
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
        alert('Success: ' + data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    handleCloseModal();
  };
  toastr.success('Talebiniz başarıyla oluşturuldu.');
}
  const feedback = () => {
    toastr.success('Talebiniz başarıyla oluşturuldu.');
  };
  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
    <div className="table-container" style={{ paddingTop: '50px', paddingLeft:'20px', paddingRight:'20px' ,paddingBottom:'20%' }}>
      <div className="card">
          <div className="alert " style={{backgroundColor:'#88aa5b', color: 'black', textAlign: 'center', marginBottom: '20px' }}   >
            <h2 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>Hayvan Eşyaları</h2>
          </div>

          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
    
                <th>Ad</th>
                <th>Marka</th>
                <th>Renk</th>
                <th>Tür</th>
                <th>Boyut</th>
                <th>Tanım</th>
                <th>Fiyat</th>
                <th>Stok Durumu</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {item.map(x =>
                <tr key={x.categoryId}>
  
                  <td>{x.itemName}</td>
                  <td>{x.itemBrand}</td>
                  <td>{x.itemColor}</td>
                  <td>{x.itemType}</td>
                  <td>{x.itemSize}</td>
                  <td>{x.itemDescription}</td>
                  <td>{x.itemPrice}</td>
                  <td>{x.isStock ? 'Stokta' : 'Stokta Değil'}</td>
                  <td>
                    <button  onClick={() => handleShowModal(x)} type="button" className="btn" style={{ backgroundColor: '#88aa5b' }}>
                      <a style={{ color: 'white' }}>Talep Et</a>
                    </button>


                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <ReactPaginate
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5} // Number of page links to display
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link custom-page-link" 
              />
            </div>
</div>
        </div>
      </div>
      <Modal show={addModalShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Talep Bilgileri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="id" style={{ marginBottom: '5px', display: 'block' }}>Ürün Adı:</label>
              <input
              disabled
                type="text"
                id="id"
                name="id"
                value={formData.itemName}
                defaultValue={selectedFoodItem ? selectedFoodItem.itemId : ''}
                onChange={handleChange}
                required
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
              <label htmlFor="address" style={{ marginBottom: '5px', display: 'block' }}>Adresiniz:</label>
              <textarea
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="phoneNumber" style={{ marginBottom: '5px', display: 'block' }}>Telefon Numaranız:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange2}
                placeholder="555-555-5555"
                maxLength="10"
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button  type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#88aa5b', color: '#fff', border: 'none' }}>
              Talep Oluştur
            </button>
          </form>


        </Modal.Body>
        
      </Modal>
    </div>
  )
}

export default Item;