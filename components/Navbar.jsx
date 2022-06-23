import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

//the button is going to open up the cart
const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">E-Comm Store</Link>
      </p>
      
      <button type='button' className='cart-icon' onClick="">
        <AiOutlineShopping/>
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}

export default Navbar