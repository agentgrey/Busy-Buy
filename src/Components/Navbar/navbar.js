// import CSS
import Style from "./navbar.module.css";
// import Router
import {  NavLink, Outlet } from 'react-router-dom';
// import Dependencies
import { useValue } from '../../context';


function Navbar() {
    const {userPresent} = useValue();

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
                        <button>Logout</button> </>
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