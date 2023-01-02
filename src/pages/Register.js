import Header from "../components/header"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import '../App.css';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [register,setRegister]=useState({
        request:"create_candidate",
        name:"",
        email:"",
        password:"",
        aadhar:"",
        address:"",
        phone:"",
        city:"",
        area:"",
        pin:""
    })
    const navigate=useNavigate()
    const registering= async()=>{
        const {data}=await axios.post('http://karka.academy/api/action.php',JSON.stringify(register))
        if(data.status==="success"){
            navigate('/')
        }else{
            alert(123)
        }
    }
    return(<>
    <Header/>
    <div className='container register_form'>
            <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
        >
            <Form.Control onChange={(e)=>setRegister({...register,name:e.target.value})} type="text" placeholder="Name"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="Email">
            <Form.Control type="email" onChange={(e)=>setRegister({...register,email:e.target.value})} placeholder="Email ID"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
            <Form.Control type="password" onChange={(e)=>setRegister({...register,password:e.target.value})} placeholder="Password"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="Adhaar Number">
            <Form.Control type="number" onChange={(e)=>setRegister({...register,aadhar:e.target.value})} placeholder="Adhaar Number"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="Address">
            <Form.Control type="text" onChange={(e)=>setRegister({...register,address:e.target.value})} placeholder="Address"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="Phone Number">
            <Form.Control type="number" onChange={(e)=>setRegister({...register,phone:e.target.value})} placeholder="Phone Number"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="City">
            <Form.Control type="text" onChange={(e)=>setRegister({...register,city:e.target.value})} placeholder="City"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="Area">
            <Form.Control type="text" onChange={(e)=>setRegister({...register,area:e.target.value})} placeholder="Area"/>
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="floatingInput" label="PinCode">
            <Form.Control type="text" onChange={(e)=>setRegister({...register,pin:e.target.value})} placeholder="PinCode"/>
        </FloatingLabel>
            <div className='submit'>
                <button className='btn register_btn bg-primary text-light m-3' onClick={()=>registering()}>Register</button>
            </div>
        </div>
    </>)
}