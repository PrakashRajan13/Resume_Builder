import Usercontext from "../UserContext";
import { useContext, useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import Footer from "../components/footer";


function FillData() {

    //usecontext
    const value=useContext(Usercontext)
    const {islog}=value
    let navigate = useNavigate();

    const get=async()=>{
      let {data}=await axios.get('http://karka.academy/api/action.php?request=get_user_react_resume&user=prakash13')
      setGetResume(data.data)
    }
   
    
  
    useEffect(()=>{
      // navigate('/Filldata')
      if(localStorage.getItem("key") || islog) {navigate('/Filldata')} else(navigate('/'))
  },[islog]
  )
    //states
    const [getresume,setGetResume]=useState('')
    const [datavalue,setDataValue]=useState({
      skill:"",
      languages:"",
      hobbies:"",
      certificates:"",
      education:{education:"",year:"",institute:"",percentage:""},
      experience:{organisation:"",role:"",year:"",contact:""},
      project:{title:"",year:"",abstract:""}
    })


    const [details,setDetails]=useState({
      name:"",
      email:"",
      mobile:"",
      role:"",
      career_objective:"",
      skill:[],
      education:[],
      experience:[],
      father_name:"",
      mother_name:"",
      address:"",
      gender:"",
      DOB:"",
      martial_status:"",
      languages:[],
      hobbies:[],
      certificates:[],
      projects:[],
      declaration:""
    })

    const getdetails=(key,value)=>{
      let update=""
      if(key==="skill" || key==="education" || key==="experience" || key==='languages' || key==="hobbies" || key==='certificates' || key==="projects"){
        update={...details,[key]:[...details[key],value] }
        setDetails(update)
      }else{
        update={...details, [key] : value}
        setDetails(update)
      }
    }

    //Delete Function
    const Delete =(index,value)=>{
      let delete_item=details[value].filter((item,id)=>{return (id!==index)})
      setDetails({...details,[value]:delete_item})
    }
        
    //Create_resume API call
    let sent={
      request:"create_react_resume",
      user:"prakash13",
      resume:details
    }
    const submit=async()=>{
          await axios.post('http://karka.academy/api/action.php?',JSON.stringify(sent))
          get()
    }
    
    const Delete_resume=async(id)=>{
      let data=await axios.get(`http://karka.academy/api/action.php?request=delete_react_user_resume&user=prakash13&id=${id}`);
      get()
    }
    useEffect(() => {
      get()
    },[])
  return (
    <>
    <div className='bg-dark'>
        <h1 className='text-center text-white p-3'>Fill Your Data</h1>
    </div>
    <div className='m-3'>
    <div className="row">
      <label className="col-1">Name</label>
      <input value={details.name} className="col-2" type="text" onChange={e=>setDetails({...details,name:e.target.value})}/>
    </div>
      <div className="row mt-3">
      <label className="col-1">E-mail</label>
      <input value={details.email} className="col-2" type="email" onChange={e=>setDetails({...details,email:e.target.value})}/>
    </div>
    <div className="row mt-3">
      <label className="col-1">Mobile</label>
      <input className="col-2" value={details.mobile} type="text" onChange={e=>setDetails({...details,mobile:e.target.value})}/>
    </div>
    <div className="row mt-3">
      <label className=" col-1">Role</label>
      <input type="text" className="col-2" value={details.role} onChange={e=>setDetails({...details,role:e.target.value})}/>
    </div>
    <label className="row  mt-4"><strong>Career_Objective</strong></label>
    <textarea name="" className="mt-3 d-block" value={details.career_objective} onChange={e=>setDetails({...details,"career_objective":e.target.value})} id="" cols="80" rows="2"></textarea>
    <label className="row pl-3 mt-4 mb-3"><strong>Skills</strong></label>
    <div className="row pl-3" >
      <input className="col-1 ms-2" value={datavalue.skill} type="text" onChange={e=>setDataValue({...datavalue,skill:e.target.value})}/><button className="ms-2 add_button btn btn-primary text-center" onClick={()=>{getdetails("skill",datavalue.skill);setDataValue({...datavalue,skill:""})}}>+</button>
    </div>
    <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">ID</th>
                            <th scope="col" className="text-center heading">Skills</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.skill.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{index+1}</td>
                                    <td className="text-center items">{items}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"skill")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table>
     <label className="row pl-3 mt-4 mb-2"><strong>Education</strong></label>
    <div className="">
      <table className="table tab mt-2">
        <thead>
          <tr>
            <th scope="col" className="text-center">Education</th>
            <th scope="col" className="text-center">Year</th>
            <th scope="col" className="text-center">institute</th>
            <th scope="col" className="text-center">percentage %</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" value={datavalue.education.education} onChange={e=>setDataValue({...datavalue,education:{...datavalue.education,education:e.target.value}})}/></td>
            <td><input type="text" value={datavalue.education.year} onChange={e=>setDataValue({...datavalue,education:{...datavalue.education,year:e.target.value}})}/></td>
            <td><input type="text" value={datavalue.education.institute} onChange={e=>setDataValue({...datavalue,education:{...datavalue.education,institute:e.target.value}})}/></td>
            <td><input type="number" value={datavalue.education.percentage} onChange={e=>setDataValue({...datavalue,education:{...datavalue.education,percentage:e.target.value}})}/></td>
            <td><button className="btn btn-primary" onClick={()=>{getdetails("education",datavalue.education);setDataValue({...datavalue,education:{...datavalue,education:"",year:"",institute:"",percentage:""}})}}>+</button></td>
          </tr>
          </tbody>
      </table>
    </div>
    <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">Education</th>
                            <th scope="col" className="text-center heading">Year</th>
                            <th scope="col" className="text-center heading">Institute</th>
                            <th scope="col" className="text-center heading">Percentage</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.education.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{items.education}</td>
                                    <td className="text-center items">{items.year}</td>
                                    <td className="text-center items">{items.institute}</td>
                                    <td className="text-center items">{items.percentage}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"education")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table>
      <label className="row pl-3 mt-5 mb-5"><strong>Experience</strong></label>
      <table className="table tab mb-3">
        <thead>
          <tr>
            <th scope="col" className="text-center">Organisation</th>
            <th scope="col" className="text-center">Role</th>
            <th scope="col" className="text-center">Year</th>
            <th scope="col" className="text-center">Contact</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><input type="text" value={datavalue.experience.organisation} onChange={e=>setDataValue({...datavalue,experience:{...datavalue.experience,organisation:e.target.value}})}/></td>
            <td><input type="text" value={datavalue.experience.role} onChange={e=>setDataValue({...datavalue,experience:{...datavalue.experience,role:e.target.value}})}/></td>
            <td><input type="text" value={datavalue.experience.year} onChange={e=>setDataValue({...datavalue,experience:{...datavalue.experience,year:e.target.value}})}/></td>
            <td><input type="text" value={datavalue.experience.contact} onChange={e=>setDataValue({...datavalue,experience:{...datavalue.experience,contact:e.target.value}})}/></td>
            <td><button className="btn btn-primary" onClick={()=>{getdetails("experience",datavalue.experience);setDataValue({...datavalue,experience:{...datavalue.experience,organisation:"",role:"",year:"",contact:""}})}}>+</button></td>
          </tr>
        </tbody>
      </table>
      <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">Organisation</th>
                            <th scope="col" className="text-center heading">Role</th>
                            <th scope="col" className="text-center heading">Year</th>
                            <th scope="col" className="text-center heading">Contact</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.experience.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{items.organisation}</td>
                                    <td className="text-center items">{items.role}</td>
                                    <td className="text-center items">{items.year}</td>
                                    <td className="text-center items">{items.contact}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"experience")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table>
      
        <label className="mt-4 pb-3 d-block border-bottom"><strong>Personal_Details</strong></label>
        <div className="row">
          <label className="pl-3 mt-4 col-1">Father Name</label>
          <input className="pl-3 mt-4 col-2" type="text" onChange={e=>setDetails({...details,"father_name":e.target.value})}/>
        </div>
        <div className="row">
          <label className="pl-3 mt-4 col-1">Mother Name</label>
          <input className="pl-3 mt-4 col-2" type="text" onChange={e=>setDetails({...details,"mother_name":e.target.value})}/>
        </div>
        <div className="row">
          <label className="pl-3 mt-4 col-1">DOB</label> 
          <input className="pl-3 mt-4 col-2" type="text" onChange={e=>setDetails({...details,"DOB":e.target.value})}/>
        </div>  
        <div className="row">
          <label className="pl-3 mt-4 col-1">Martial Status</label>
          <input className="pl-3 mt-4 col-2" type="text" onChange={e=>setDetails({...details,"martial_status":e.target.value})}/>
        </div>  
        <div className="row">
          <label className="pl-3 mt-4 col-1">Gender</label>
          <input className="pl-3 mt-4 col-2" type="text" onChange={e=>setDetails({...details,"gender":e.target.value})}/>
        </div>  
        <div className="row">
          <label className="pl-3 mt-4 col-1">Address</label>
          <textarea className="pl-3 mt-4 col-2" onChange={e=>setDetails({...details,"address":e.target.value})} name="" id="" cols="30" rows="1"></textarea>
        </div>  
        <label className="row pl-3 mt-4 mb-3"><strong>Languages</strong></label>
    <div className="row pl-3" >
    <input className="col-1 ms-2" value={datavalue.languages} type="text" onChange={e=>setDataValue({...datavalue,languages:e.target.value})}/><button  className="ms-2 btn btn-primary add_button text-center" onClick={()=>{getdetails("languages",datavalue.languages);setDataValue({...datavalue,languages:""})}}>+</button>
    </div>
    <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">ID</th>
                            <th scope="col" className="text-center heading">Languages</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.languages.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{index+1}</td>
                                    <td className="text-center items">{items}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"languages")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table> 
    <label className="row pl-3 mt-4 mb-3"><strong>Hobbies</strong></label>
    <div className="row pl-3" >
    <input className="col-1 ms-2" value={datavalue.hobbies} type="text" onChange={e=>setDataValue({...datavalue,hobbies:e.target.value})}/><button className="btn btn-primary ms-2 add_button text-center" onClick={()=>{getdetails("hobbies",datavalue.hobbies);setDataValue({...datavalue,hobbies:""})}}>+</button>
    </div>
    <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">ID</th>
                            <th scope="col" className="text-center heading">Hobbies</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.hobbies.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{index+1}</td>
                                    <td className="text-center items">{items}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"hobbies")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table> 
    <label className="row pl-3 mt-4 mb-3"><strong>Certificates</strong></label>
    <div className="row pl-3" >
    <input className="col-1 ms-2" value={datavalue.certificates} type="text" onChange={e=>setDataValue({...datavalue,certificates:e.target.value})}/><button className="btn btn-primary ms-2 add_button text-center" onClick={()=>{getdetails("certificates",datavalue.certificates);setDataValue({...datavalue,certificates:""})}}>+</button>
    </div>
    <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">ID</th>
                            <th scope="col" className="text-center heading">Certificate</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.certificates.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{index+1}</td>
                                    <td className="text-center items">{items}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"certificates")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table> 
      
        <label className="d-block pt-4 pb-2"><strong>Project</strong></label>
        <table className="table tab">
        <thead>
          <tr>
            <th scope="col" className="text-center">Title</th>
            <th scope="col" className="text-center">Year</th>
            <th scope="col" className="text-center">Abstract</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" value={datavalue.project.title} onChange={e=>setDataValue({...datavalue,project:{...datavalue.project,title:e.target.value}})}/></td>
              <td><input type="text" value={datavalue.project.year} onChange={e=>setDataValue({...datavalue,project:{...datavalue.project,year:e.target.value}})}/></td>
              <td><textarea value={datavalue.project.abstract} onChange={e=>setDataValue({...datavalue,project:{...datavalue.project,abstract:e.target.value}})} cols="30" rows="1"></textarea></td>
              <td><button className="btn btn-primary" onClick={()=>{getdetails("projects",datavalue.project);setDataValue({...datavalue,project:{...datavalue.project,title:"",year:"",abstract:""}})}}>+</button></td>
          </tr>
          </tbody>
      </table>
      <table className="table mt-5 mb-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center heading">ID</th>
                            <th scope="col" className="text-center heading">Title</th>
                            <th scope="col" className="text-center heading">Year</th>
                            <th scope="col" className="text-center heading">Abstract</th>
                            <th scope="col" className="text-center heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      details.projects.map((items,index)=>{
                        return (<tr key={index}>
                                    <td className="text-center items">{index+1}</td>
                                    <td className="text-center items">{items.title}</td>
                                    <td className="text-center items">{items.year}</td>
                                    <td className="text-center items">{items.abstract}</td>
                                    <td className="text-center items">
                                        <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete(index,"projects")}>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
    </table> 
      <label className="d-block pt-3"><strong>Declaration</strong></label>
      <textarea name="" onChange={e=>setDetails({...details,declaration:e.target.value})} id="" cols="80" rows="2"></textarea><br/>
      <div className=" text-center mt-5 mb-5">
        <button className=" btn btn-success btn-lg" onClick={()=>{submit();setDetails({...details,name:""})}}>Submit</button>
      </div>
      
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col" className="text-center items">Sl.no</th>
            <th scope="col" className="text-center items">ID</th>
            <th scope="col" className="text-center items">Name</th>
            <th scope="col" className="text-center items">Action</th>
          </tr>
        </thead>
        <tbody>
        {
         getresume && getresume.map((items,index)=>{
            return (<tr key={index}>
                              <td className="text-center items">{index+1}</td>
                              <td className="text-center items">{items.id}</td>
                              <td className="text-center items">{(JSON.parse(items.data)).name}</td>
                              <td className="text-center items">
                                  <button className="m-2 button bg-danger btn text-white" onClick={()=>Delete_resume(items.id)}>Delete</button>
                                  <Link target="_blank" to={`/Resume/${items.id}`}><button className="m-2 button bg-primary btn text-white">View</button></Link>
                              </td>
                          </tr>)
                })
              }
        </tbody>
      </table> 
   </div>
   <Footer/>
    </>
  )
}

export default FillData;