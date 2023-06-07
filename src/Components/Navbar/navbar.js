// import CSS
import Style from "./navbar.module.css";
// import Router
import {  NavLink, Outlet } from 'react-router-dom';
// import Dependencies
import { useValue } from '../../context';


function Navbar() {
    const {userPresent, handleLogout} = useValue();

    return (
        <>  
            <div className={Style.navbar}>
                <div className={Style.title}>
                    Diagon Bazaar
                </div>
                <div className={Style.menu}>
                    <NavLink to="/"> <button autoFocus>Home</button> </NavLink>
                    {userPresent ? <>
                        <button>My orders</button>
                        <button>Cart</button>
                        <NavLink onClick={handleLogout} to="/"> <button>Logout</button> </NavLink> </>
                    : 
                        <NavLink to="/signin"> <button>SignIn</button> </NavLink>
                    }
                </div>
            </div>
            <Outlet/>
        </>

    );
}

export default Navbar;