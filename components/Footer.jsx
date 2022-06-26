import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p> © Copyright 2022, All Rights Reserved</p>
      {/* <p>2022 -- E-Comm Store -- All rights reserved</p> */}
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer