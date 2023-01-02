import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router'


function Resume() {
  const params = useParams();
    const[resume,setResume]=useState("")

    const get=async()=>{
        let {data}=await axios.get(`http://karka.academy/api/action.php?request=get_react_resume_by_id&user=prakash13&id=${params.id}`)
        setResume(data.data.data)
      }
      useEffect(()=>{
        get()
      },[])
  return (
    <div>
       {resume&&
        <div className="container mt-5">
        <h1 className="font-weight-bold text-center">Resume</h1>
        <h2 id="name" className="font-weight-bold">{JSON.parse(resume).name}</h2>
        <p className="font-weight-bold pt-2">E-mail ID :<span className="ps-2" id="email">{JSON.parse(resume).email}</span></p>
        <p className="font-weight-bold">Mobile :<span className="ps-2" id="mobile">{JSON.parse(resume).mobile}</span></p>
        <p className="font-weight-bold">Role :<span className="ps-2" id="rolename">{JSON.parse(resume).role}</span></p>
        <h5 className="font-weight-bold">Career Objective</h5>
        <p className="pb-3 container" id="career_objective">{JSON.parse(resume).career_objective}</p>
                      {/* education */}
        <h5 className="font-weight-bold pt-4 pb-3">Academic Profile</h5>
        <div className="container">
          <table className="table table-bordered border-dark mt-3">
            <thead className="text-center">
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Institute</th>
                <th scope="col">Year</th>
                <th scope="col">Percentage</th>
              </tr>
            </thead>
            <tbody className="text-center" id="education">{JSON.parse(resume).education.map((value,index)=>{return(
              <tr key={index}>
                <td id="course">{value.education}</td>
                <td id="instutite">{value.institute}</td>
                <td id="year">{value.year}</td>
                <td id="percentage0">{value.percentage}</td>
              </tr>)
            })}</tbody>
          </table>
        </div>
                {/* Skills */}
        <h5 className="font-weight-bold pt-4">Skills : <span id="skills">{JSON.parse(resume).skill.join(", ")}</span></h5>
                 {/* Experience */}
        <h5 className="font-weight-bold pt-4 pb-4">Experience</h5>
        <div className="container" id="experience">
        {JSON.parse(resume).experience.map((item,value)=>{
          return(
            <>
              <p className="font-weight-bold">Organisation :<span className="ps-1" id="organisation">{item.organisation}</span></p>
              <p className="font-weight-bold">Role :<span id="role" className="ps-1">{item.role}</span></p>
              <p className="font-weight-bold">Year :<span id="period" className="ps-1">{item.year}</span></p>
              <p className="font-weight-bold">E-mail ID :<span id="contact" className="ps-1">{item.contact}</span></p>
            </>
          )
        })}
        </div>
                       {/* projects  */}
        <h5 className="font-weight-bold pt-4 pb-4">Projects</h5>
        <div className="container" id="project">{JSON.parse(resume).projects.map((value,index)=>{return(
          <>
              <p className="font-weight-bold">Title :<span className='ps-1' id="title">{value.title}</span></p>
              <p className="font-weight-bold">Year :<span className='ps-1' id="time">{value.year}</span></p>
              <p className="font-weight-bold">Abstract : <span className='ps-1' id="abstract">{value.abstract}</span></p>
              </>)
            })}
        </div>
                  {/* PErsonal Details */}
        <h5 className="font-weight-bold pt-4 pb-4">Personal Details</h5>
        <div className="container">
          <div className="row">
            <p className="font-weight-bold col-2">DOB</p>
            <b className="col-1">:</b>
            <span className="col-5" id="DOB">{JSON.parse(resume).DOB}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Address</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="address">{JSON.parse(resume).address}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Gender</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="gender">{JSON.parse(resume).gender}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">martial status</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="martial_status">{JSON.parse(resume).martial_status}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Father Name</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="father_name">{JSON.parse(resume).father_name}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Mother Name</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="mother_name">{JSON.parse(resume).mother_name}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Hobbies</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="hobbies">{JSON.parse(resume).hobbies.join(", ")}</span>
          </div>
          <div className="row">
            <p className="font-weight-bold col-2">Language</p>
            <b className="col-1" >:</b>
            <span className="col-5" id="language">{JSON.parse(resume).languages.join(", ")}</span>
          </div>
        </div>
        <h5 className="font-weight-bold pt-4 pb-4">Declaration</h5>
        <p className="container" id="declaration">{JSON.parse(resume).declaration}</p>
          <p className="font-weight-bold  pt-4">Your Faithfully,</p>
          <p className="bold" id="sign">{JSON.parse(resume).name}</p>
    </div>
       }
    </div>
  )
}

export default Resume