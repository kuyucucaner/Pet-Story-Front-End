import React, { useState } from 'react';

const ProductList = ({ addToCart }) => {
  const [products] = useState([
    { id: 1, name: 'Ürün 1', price: 10 },
    { id: 2, name: 'Ürün 2', price: 20 },
    { id: 3, name: 'Ürün 3', price: 30 },
  ]);

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price} TL</span>
            <button onClick={() => addToCart(product)}>Ekle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
