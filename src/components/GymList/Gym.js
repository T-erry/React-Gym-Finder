import React from 'react'
import { Link } from 'react-router-dom'

function Gym({gym}) {
  return (
         <div className='card col-sm-2 m-4 '>
      <div  id= "gymCard" className="mt-5" style={{width: "15rem,"}}>
    <img src={gym.image} className="card-img-top  img-fluid" alt={""}/>
    <div className="card-body">
      <h5 className="card-title">Name: {gym.name}</h5> 
      <p className="card-text">Location: {gym.location}</p>
      <p className="card-text">OperatingHours {gym.operating_hours}</p>
      <p className="card-text">Price {gym.price}</p>
      <Link className='btn btn-success' to={`/view/${gym.id}`}>View</Link>
  </div>
  </div>
      </div> 
  
  )
}

export default Gym