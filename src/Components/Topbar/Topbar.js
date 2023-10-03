import React, { useEffect, useState } from 'react';
import './Topbar.css';
const Topbar = () => {

const [logout,setLogout] = useState('none');
   useEffect(()=>{
       console.log('this.blockis running')
    if(window.localStorage.getItem('loginStatus')=== 'true'){
        setLogout('block');
        console.log('this block is running')
    }
   })

   const logoutClicked  = () => {
       window.localStorage.setItem('loginStatus',false)
       setLogout('none')
   }


    return ( 
        <>
        <div className="topbar">
        <div className="topbar-left-menu">
            <div className="topbar-logo">
                <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo"></img>
                <p className="topbar-text">Kafene</p>
            </div>
            <nav>
                <a className="topbar-menu-items" href="./orders">Orders</a>
                <a className="topbar-menu-items" href="./products">Products</a>
                <a className="topbar-menu-items" href="./users">Users</a>
            </nav>
        </div>
            <a onClick={logoutClicked} style={{"display":logout}} className="topbar-menu-items" id="logout-button" href="./">Logout</a>
        </div>
        </>
        
     );
}
 
export default Topbar;