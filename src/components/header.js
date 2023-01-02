import React from 'react'
import {useParams } from "react-router-dom";

function Header(){
  const params = useParams();
  return (
    <div className='bg-dark'>
        <h1 className='text-center text-white p-3'>Login</h1>
    </div>
  )
}

export default Header