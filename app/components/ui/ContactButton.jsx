'use client'
import React from 'react'
import NavLink from './NavLink'

const ContactButton = () => {

  function handleClick (){
   
  }

  return (
  // <button onClick={handleClick}>Contact</button>
   <NavLink href='/contact'>Contact</NavLink>
  )
}

export default ContactButton