import React, { useState } from 'react';
import Navbar from './Navbar';
import Item from './Item';
import Food from './Food';

export const Basket = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    return total.toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="table-container" style={{ margin: '80px' }}>
        <div className="card">
          <div className="alert alert-success" style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}   >
            <h2 >Sepetiniz</h2>
          </div>

          <div>
            {cartItems.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Sepetiniz Boş.</p>
            ) : (

              <ul>
                {cartItems.map((item) => (
                  <li key={item.categoryId}>
                    <li>{item.category.categoryType}</li>
                    <li>{item.itemName}</li>
                    <li>{item.itemBrand}</li>
                    <li>{item.itemColor}</li>
                    <li>{item.itemType}</li>
                    <li>{item.itemSize}</li>
                    <li>{item.itemDescription}</li>
                    <li>{item.itemAmount}</li>
                    <li>{item.itemPrice}</li>
                    <li>{item.isStock ? 'Stokta' : 'Stokta Değil'}</li>
                    <button onClick={() => removeFromCart(item)}>Sil</button>
                  </li>
                ))}
                <li>
                  <strong>Toplam:</strong> ${getTotalPrice()}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;