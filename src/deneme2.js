import React, { useState } from 'react';
import ProductList from './ProductList';

const ShoppingCart = () => {
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
      <h2>Alışveriş Sepeti</h2>

      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>{item.price} TL</span>
              <button onClick={() => removeFromCart(item)}>Kaldır</button>
            </li>
          ))}
          <li>
            <strong>Toplam:</strong> {getTotalPrice()} TL
          </li>
        </ul>
      )}

      <hr />

      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default ShoppingCart;
