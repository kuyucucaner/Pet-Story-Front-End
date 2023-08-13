import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav style={{ background: '#4c5e35', color: '#fff', padding: '20px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, justifyContent: 'flex-start' }}>
          <li >
          
            <Link to="/home" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faShieldCat} size="lg" beat />      Pet Story
            </Link>

          </li>
          <li>
            <Link to="/Profile" style={{ textDecoration: 'none', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faUser} />  Profil
            </Link>
          </li>

        </ul>

        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
        <li  style={{}}><Link to="/Add" style={{ textDecoration: 'none', color: '#fff' }}>İlan Ver</Link></li>
        <li><Link to="/Food" style={{ textDecoration: 'none', color: '#fff' }}>Hayvan Yemleri</Link></li>
        <li><Link to="/Item" style={{ textDecoration: 'none', color: '#fff' }}>Hayvan Eşyaları</Link></li>
        <li><Link to="/PetShop" style={{ textDecoration: 'none', color: '#fff' }}>Pet Shop</Link></li>
        <li><Link to="/Pet" style={{ textDecoration: 'none', color: '#fff' }}>Evcil Hayvanlar</Link></li>
        <li><Link to="/Veterinary" style={{ textDecoration: 'none', color: '#fff' }}>Veteriner Hizmeti</Link></li>
        <li><Link to="/Donate" style={{ textDecoration: 'none', color: '#fff' }}>Bağış</Link></li>
        <li><Link to="/Support" style={{ textDecoration: 'none', color: '#fff' }}>Destek</Link></li>
          <li><Link to="/SSS" style={{ textDecoration: 'none', color: '#fff' }}>S.S.S.</Link></li>
          <li><Link to="/About" style={{ textDecoration: 'none', color: '#fff' }}>Hakkımızda</Link></li>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Çıkış   <FontAwesomeIcon icon={faPersonWalkingArrowRight} /></Link></li>
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;
