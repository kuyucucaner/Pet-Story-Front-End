import './App';
import { variables } from './Variables';
import Navbar from './Navbar';
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import image from './image/kedyi2.webp';
import ReactPaginate from 'react-js-pagination';


function Pet() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [pets, setPets] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const username = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
  const [formData, setFormData] = useState({
    username:'',
    name: '',
    lastname: '',
    age: '',
    job: '',
    email: '',
    petName: '',
  });
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
  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
    setFormData({ ...formData, username: storedUsername });
    fetch(variables.API_URL + '/Pets/PetsList')
      .then((response) => response.json())
      .then((data) => {
        setPets(data)
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const totalItems = pets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentItems = pets.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (x) => {
    setAddModalShow(true);
    setSelectedFoodItem(x);
    setFormData({ ...formData, petName: x.petName, petId: x.petId });
  };
  const handleCloseModal = () => {
    setAddModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === '' ||
      formData.lastname.trim() === '' ||
      formData.age.trim() === '' ||
      formData.job.trim() === '' ||
      formData.email.trim() === '' ||
      formData.petName.trim() === ''
    ) {
      toastr.error('Lütfen tüm alanları doldurunuz.');
    } else {
      fetch(variables.API_URL + '/Support/CreateSupportOwner', {
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
      handleCloseModal();
    }
    toastr.success('Başvurunuz Başarıyla Gönderildi.');
  }

  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
        <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
        <div className="table-container" style={{ paddingTop: '50px', paddingLeft:'20px', paddingRight:'20px',paddingBottom:'17%' }}>
          <div className="card">
          <div className="alert" style={{  backgroundColor:'#88aa5b',color: 'black', textAlign: 'center', marginBottom: '20px' }}   >
              <h2 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>Evcil Hayvan Listesi</h2>
            </div>
            <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Türü</th>
                  <th>Cinsi</th>
                  <th>Adı</th>
                  <th>Yaşı</th>
                  <th>Hastalık</th>
                  <th>Renk</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((x) => (
                  <tr key={x.categoryId}>
                    <td>{x.petType}</td>
                    <td>{x.petGenus}</td>
                    <td>{x.petName}</td>
                    <td>{x.petAge}</td>
                    <td>{x.isPetSick ? 'Hasta' : 'Hasta Değil'}</td>
                    <td>{x.petColor}</td>
                    <td>{x.petStatus.statusType}</td>
                    <td>
                      <button
                            onClick={() => {
                              if (userDetails.isOwnership === true) {
                                toastr.error('Zaten bir başvurunuz mevcut.','HATA!');
                              } else {
                                handleShowModal(x)
                              }
                            }}
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor:
                            x.petStatus.statusType === 'Sahiplendirilmedi'
                              ? '#88aa5b'
                              : x.petStatus.statusType === 'Beklemede'
                                ? '#F0E68C'
                                : '',
                          pointerEvents:
                            x.petStatus.statusType === 'Beklemede' ? 'none' : 'auto',
                        }}
                      >
                        <a style={{ color: 'white' }}>
                          {x.petStatus.statusType === 'Beklemede' ? 'Onay Bekliyor' : 'Sahiplen'}
                        </a>
                      </button>
                    </td>
                  </tr>
                ))}
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
          <Modal.Title>Evcil Hayvan Başvuru Formu</Modal.Title>
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
              <label htmlFor="id" style={{ marginBottom: '5px', display: 'block' }}>Hayvan Adı:</label>
              <input
                disabled
                type="text"
                id="id"
                name="id"
                value={formData.petName}
                defaultValue={selectedFoodItem ? selectedFoodItem.petId : ''}
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
              <label htmlFor="lastname" style={{ marginBottom: '5px', display: 'block' }}>Soyadınız:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="age" style={{ marginBottom: '5px', display: 'block' }}>Yaşınız:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="job" style={{ marginBottom: '5px', display: 'block' }}>Mesleğiniz:</label>
              <input
                type="text"
                id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ marginBottom: '5px', display: 'block' }}>Emailiniz:</label>
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
            <div style={{ textAlign: 'center' }}>
            <button  type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#88aa5b', color: '#fff', border: 'none' }}>
              Başvur
            </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Pet;
