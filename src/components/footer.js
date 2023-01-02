import React, { useEffect } from 'react'
import '../App.css'
import Usercontext from "../UserContext";
import { useContext } from "react"
import { useNavigate} from "react-router-dom";



function Footer() {
    const value=useContext(Usercontext)
    const {setIsLog}=value
    const navigate=useNavigate()
  return (
    <div>
        <div className='bg-dark footer py-3'>
           <button onClick={()=>{setIsLog(false);localStorage.setItem("key",false);navigate('/')}} className='btn btn-secondary me-3'>Logout</button>
        </div>
    </div>
  )
}

export default Footer