import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { variables } from './Variables';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import ReactPaginate from 'react-js-pagination';
import image from './image/kedyi2.webp';

const Veterinary = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [vet, setUsers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const username = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
  const [formData, setFormData] = useState({
    username : '',
    email: '',
    subject: '',
    message: ''
  });


  const totalItems = vet.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const currentItems = vet.slice(startIndex, endIndex);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('kullanici-sifre')).username;
    setFormData({ ...formData, username: storedUsername });
    fetch(variables.API_URL + '/Veterinary/VetList')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleShowModal = () => {
    setAddModalShow(true);
  };

  const handleCloseModal = () => {
    setAddModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email.trim() === '' ||
      formData.subject.trim() === '' ||
      formData.message.trim() === ''
    ) {
       toastr.error('Lütfen tüm alanları doldurunuz.');
       }
       else {
    fetch(variables.API_URL + '/Support/CreateSupportVet', {
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
  toastr.success('Başvurunuz Başarıyla Gönderildi.');
}

  const feedback = () => {
    toastr.success('Mailiniz Başarıyla Gönderildi.', 'Teşekkürler');
  };





  return (
    <div>
      <Navbar />
      <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
    <div className="table-container" style={{ paddingTop: '50px', paddingLeft:'20px', paddingRight:'20px',paddingBottom:'20%' }}>
            <div className="card">
        <div className="alert" style={{backgroundColor:'#535c1c'}}>
        <button onClick={handleShowModal} type="button" className="btn" style={{ backgroundColor: '#88aa5b' , border: '1px solid #ccc' }}>
                      <a style={{ color: 'white' }}>Veterine Danış</a>
                    </button>
                
                    
                  </div>
                  <div className="alert" style={{  backgroundColor:'#88aa5b',color: 'black', textAlign: 'center', marginBottom: '20px' }}   >
            <h2 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>Sitemizdeki Veterinerler</h2>
          </div>
          
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Veteriner Adı</th>
                <th>Veteriner SoyAdı</th>
                <th>Veteriner Emaili</th>
                <th>Veteriner Yaşı</th>
                <th>Veteriner Eğitim</th>
              </tr>
            </thead>
            <tbody>
              {vet.map((x) => (
                <tr key={x.Id}>
                  <td>{x.userName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.email}</td>
                  <td>{x.age}</td>
                  <td>{x.education}</td>
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
          <Modal.Title>Veterinere Danış</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ marginBottom: '5px', display: 'block' }}>Veteriner Email</label>
          <select
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">Veteriner Seçiniz</option>
                {vet.map((x) => (
                  <option key={x.Id} value={x.email}>
                    {x.email}
                  </option>
                ))}
              </select>
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
              <label htmlFor="subject" style={{ marginBottom: '5px', display: 'block' }}>Konu</label>
              <input
                type="subject"
                id="subject"
                name="subject"
                value={formData.subject}
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
            <button  type="submit"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', background: '#88aa5b', color: '#fff', border: 'none' }}>
               Gönder
             </button>
          </form>


        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Veterinary;
