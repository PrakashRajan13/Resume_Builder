import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Usercontext from "./UserContext";
import Login from "./pages/Login";
import FillData from "./pages/Fill_data";
import Register from "./pages/Register";
import Resume from "./pages/Resume";


  export default function Main_route(){

    const[islog,setIsLog]=useState(false)
    const[userdata,setUserData]=useState({})

    return(
      <Usercontext.Provider value={{islog,setIsLog,userdata,setUserData}}>
        <Router>
            <Routes>
                <Route path="/" exact element={localStorage.getItem("key") && islog?<FillData/>:<Login/>}/>
                <Route path="/FillData" exact element={<FillData/>}/>
                <Route path="/Register" exact element={<Register/>}/>
                <Route path="/Resume/:id" exact element={<Resume/>}/>
            </Routes>
        </Router>
      </Usercontext.Provider>
    )
  }