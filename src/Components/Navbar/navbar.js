// import CSS
import Style from "./navbar.module.css";
// import Router
import {  NavLink, Outlet } from 'react-router-dom';


function Navbar() {
    return (
        <>  
            <div className={Style.navbar}>
                <div className={Style.title}>
                    Busy Buy 
                </div>
                <div className={Style.menu}>
                    <button autoFocus>Home</button>
                    <button>My orders</button>
                    <button>Cart</button>
                    <button>Logout</button>
                </div>
            </div>
            <Outlet/>
        </>

    );
}

export default Navbar;