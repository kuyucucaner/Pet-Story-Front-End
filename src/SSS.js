import React from 'react';
import Navbar from './Navbar';
import image from './image/kedyi2.webp';
const SSS = () => {
  const faqData = [
    { question: 'Nasıl Hayvan Sahiplendirebilirim?', answer: 'İlan ver sayfasındaki formu doldurarak sahiplendirme ilanı oluşturabilirsiniz.' },
    { question: 'Sahiplendiğim hayvanların sağlık kontrolünü nasıl yaptırabilirim?', answer: 'Sitemizdeki veterinerlere mail yoluyla ulaşabilir veya veteriner kliniğine gidebilirisiniz.' },
    { question: 'Birden fazla hayvan sahiplenmek için ne yapmam lazım?', answer: 'Destek bölümünden bizlere ulaşabilir ve talebinizi ulaştırabilirsiniz.' },
  ];

  return (
    <div>    <Navbar/>
   <div style={{ margin: '0', position: 'relative', width: '100%', height: '740px', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
    <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
    <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', position: 'relative', zIndex: 1 }}>
      <div style={{ marginTop:'30px',width: '30%', padding: '30px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#333333', letterSpacing: '2px' }}>Sıkça Sorulan Sorular</h1>
        <div>
          {faqData.map((faq, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
                   <h3 style={{ textAlign: 'center' }}>{faq.question}</h3>
              <p style={{ textAlign: 'center' }}>{faq.answer}</p>
            </div>
            
          ))}
          <br></br>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default SSS;