import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Tableview=()=>{

    const [data,setData]=useState([])

    const server=async()=>{
        await axios.get('http://localhost:8080/api/data')
        .then((response)=>{
            setData(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
       server()
    },[])
    return(
        <>
        <Header/>

       
      <div className="container border rounded p-2 mt-5">
      <table class="table">
  <thead>
    <tr>
    <th>Emp_ID</th>
    <th>Emp_Name</th>
    <th>Department</th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {data.map((value,index)=>(
        <tr key={index}>
            <td>{value.employee_id}</td>
            <td>{value.employee_name}</td>
            <td>{value.department}</td>
            <td>{value.sex}</td>
            <td>{value.marital_status}</td>
            <td>{value.salary}</td>
            <td>{value.address}</td>
            <td>
                <button className="btn primary"><i class="fa-solid fa-eye"></i></button>
                <button>edit</button>
                <button>Delete</button>
            </td>
        </tr>
    ))}
   
  </tbody>
</table>
        
        </div> 
  

        </>
    )
}

export default Tableview