
import './App.css';
import  Home  from './Home';
import  Register  from './Register';
import Login from './Login';
import Pet from './Pet';
import About from './About';
import SSS from './SSS';
import Support from './Support';
import Donate from './Donate';
import Veterinary from './Veterinary';
import PetShop from './PetShop';
import Item from './Item';
import Add from './Add';
import Profile from './Profile';

import Food from './Food';
import { BrowserRouter, Route, Routes , Link } from 'react-router-dom';
import * as React from 'react';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/Home'  element={<Home/>}></Route>
          <Route path='/'  element={<Login/>}></Route>
          <Route path='/Register'  element={<Register/>}></Route>
          <Route path='/Pet'  element={<Pet/>}></Route>
          <Route path='/About'  element={<About/>}></Route>
          <Route path='/SSS'  element={<SSS/>}></Route>
          <Route path='/Support'  element={<Support/>}></Route>
          <Route path='/Donate'  element={<Donate/>}></Route>
          <Route path='/Veterinary'  element={<Veterinary/>}></Route>
          <Route path='/PetShop'  element={<PetShop/>}></Route>
          <Route path='/Item'  element={<Item/>}></Route>
          <Route path='/Add'  element={<Add/>}></Route>
          <Route path='/Profile'  element={<Profile/>}></Route>

          <Route path='/Food'  element={<Food/>}></Route>
        </Routes>
    
    </BrowserRouter>
  );
}
export default App;