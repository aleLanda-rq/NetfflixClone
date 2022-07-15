import React, { useState , useEffect } from "react";
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    //this sets up whenever I scroll 100 pixels the black navbar will show
    useEffect(()=>{
      window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
               handleShow(true) 
            }else handleShow(false);
        });//this removes it so it doesnt show repetitively
        //2 arguments required
    //  return () => {
    //     window.removeEventListener("scroll");
    //  };
    }, []); 
 
  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img className='nav_logo'
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"/>
      <img className='nav_avatar'
      src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
      alt='Netflix avatar'/>
    </div>
  ) 
}

export default Nav
