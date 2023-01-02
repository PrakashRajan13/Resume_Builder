import { useState,useEffect,useContext } from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../App.css'; 
import Header from '../components/header';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Usercontext from "../UserContext";



export default function Login(){

    const[requestdata,setRequestData]=useState({
        request : "candidate_login",
        email:"",
        password:""
    })

    const value=useContext(Usercontext)
    const {islog,setIsLog,userdata,setUserData}=value

    const navigate=useNavigate()
    useEffect(
        ()=>{
            if(islog && localStorage.getItem("key")) {navigate('/Filldata')} else(navigate('/'))
    },
    []
    )

    const LoginAPI = async() => {   
        const {data}=await axios.post('http://karka.academy/api/action.php',JSON.stringify(requestdata))
        
        if(data.status==="success"){
            setIsLog(true)
            localStorage.setItem("key",true)
            setUserData(data.data)
            localStorage.setItem("name",userdata.name)
            navigate('/FillData');
        }
      } 
      

    return(
        <>
        <Header/>
        <div className='container input'>
            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
        >
        <Form.Control type="email" placeholder="name@example.com" value={requestdata.email} onChange={(e=>setRequestData({...requestdata,email:e.target.value}))}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" value={requestdata.password} onChange={(e=>setRequestData({...requestdata,password:e.target.value}))} />
        </FloatingLabel>
            <div className='submit'>
                <button className='btn bg-primary text-light m-3' onClick={LoginAPI}>Login</button><br/>
                <Link to="/Register" className='text-dark register'>Register</Link>
            </div>
        </div>
        </>
    )
}