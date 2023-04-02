import React from "react";
import Gym from "../GymList/Gym";
import NavBarTwo from "../NavBar/NavBarTwo";


function DashBoard({gyms}) {
  const gymArray = gyms.map((gym)=>{
    return( 
    <Gym key={gym.id} gym={gym}/>
    )
})
  return (
    
  <div className="row">
    <NavBarTwo/>
     {gymArray}
     </div>
    

  )
}

export default DashBoard;