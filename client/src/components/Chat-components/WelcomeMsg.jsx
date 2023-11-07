import React from 'react';
import Astronaut from "../../assets/Astronaut.gif"

const WelcomeMsg = ({currentUser}) => {

 
  return (
    <div className="hidden  md:flex flex-col justify-center items-center text-text-color ">
    <img  className="h-60" src={Astronaut} alt="astronaut"/>
    <h1 className='text-xl font-bold'>Welcome, <span className='text-placeholder-color font-bold'>{currentUser.username}!</span></h1>
    <h3 className='text-lg'>Please select the user to start messaging.</h3>
   </div>
  )
}

export default WelcomeMsg
