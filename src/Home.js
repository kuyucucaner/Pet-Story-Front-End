import React from "react";
import Navbar from './Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image2 from './image/596920192.jpg';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{
        position: 'relative',
        width: '1600px',
        height: '669px',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
      }}>
        <img disabled src={image2} alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(50%)' }} />
        <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '60px', color: '#fff' }}>Sitemize Hoş Geldiniz</h1>
      </div>


    </div>
  );
}

export default Home;
