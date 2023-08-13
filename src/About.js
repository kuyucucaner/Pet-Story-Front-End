import React from 'react';
import Navbar from './Navbar';
import image from './image/kedyi2.webp';

const About = () => {
  return (
    <div >
      <Navbar />
      <div style={{ margin: '0', position: 'relative', width: '100%', height: '740px', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)' }}>
        <img src={image} alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(70%)' }} />
        <div style={{ marginTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginTop:'80px',marginLeft:'20px',marginRight:'20px',border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <h1 style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#333333', letterSpacing: '2px' }}>
  Biz Kimiz
</h1>

              </header>
              <p style={{ margin: '0 40px' ,fontFamily: 'Open Sans', fontSize: '16px', lineHeight: 1.5, color: '#333333'}}>Merhaba! Biz, Haliç Üniversitesi Bilgisayar Mühendisliği son sınıf öğrencileriyiz ve büyük bir tutkuyla hayvanlara bağlıyız. Hayvanların sahiplendirilme sürecini kolaylaştırmak ve evsiz hayvanlara yeni bir yuva bulmak için bu siteyi tasarladık.
                Amacımız, hayvanseverlerin ve hayvan sahiplenmek isteyen kişilerin bir araya gelmesini sağlamaktır. Hayvanların sahiplendirilme süreci sıklıkla karmaşık olabilir ve çeşitli zorluklar içerebilir. Bu nedenle, kullanıcı dostu bir platform oluşturarak hayvan sahiplenmek isteyenlerin ve hayvanları sahiplenmek isteyenlerin birbirleriyle kolayca iletişim kurmasını hedefliyoruz.

                Hayvan profil sayfaları, kullanıcıların evsiz hayvanlar hakkında bilgi edinmelerini sağlar. Her hayvanın fotoğrafları, cinsiyeti, yaşamış olduğu yer, sağlık durumu ve kişilik özellikleri gibi önemli bilgileri sunarak kullanıcıların doğru kararlar vermelerini destekleriz. Ayrıca, iletişim ve başvuru formları aracılığıyla kullanıcıların hayvanlar hakkında sorular sormalarını ve başvuruda bulunmalarını kolaylaştırırız.

                Sitemizin ek bir özelliği ise mama ve diğer hayvan ürünlerinin satışını içermesidir. Bu, kullanıcıların hem hayvan sahiplenme sürecini takip etmelerini sağlar hem de ihtiyaç duydukları ürünleri kolayca satın almalarını sağlar.

                Hayvanların sahiplendirilmesi konusunda deneyimli ve tutkulu bir ekibiz. Amacımız, evsiz hayvanlara sevgi dolu bir yuva bulmak ve hayvanseverleri bu süreçte desteklemektir. Sitemizi kullanarak hayatınızı değiştirebilecek bir dostu aileniz bulabilirsiniz.

                Eğer herhangi bir sorunuz veya öneriniz varsa, bize her zaman ulaşabilirsiniz. Hayvanlar için daha iyi bir dünya yaratmaya katkıda bulunmak için buradayız!</p>
              <br></br><br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default About;