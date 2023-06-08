// import CSS
import Style from "./navbar.module.css";
// import Router
import {  NavLink, Outlet } from 'react-router-dom';
// import Dependencies
import { useValue } from '../../context';


function Navbar() {
    const {userPresent, handleLogout, searchTerm, setSearchTerm} = useValue();

// Function to handle search term change
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>  
            <div className={Style.navbar}>
                <div className={Style.title}>
                    Diagon Bazaar
                </div>
                {userPresent ?
                <div className={Style.searchBar}>
                    <input type="text" placeholder="Search..." 
                    value={searchTerm} onChange={handleSearchTermChange}/>
                </div> : "" }
                <div className={Style.menu}>
                    <NavLink to="/" style={({isActive})=>isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}> Home </NavLink>
                    
                    {userPresent ? <>
                        <NavLink to="/myOrders" style={({isActive})=>isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}>  My orders </NavLink>

                        <NavLink to="/cart" style={({isActive})=>isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}> Cart</NavLink>

                        <NavLink onClick={handleLogout} to="/home"
                            style={({isActive})=>isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}> Logout </NavLink> </>
                    : 
                        <NavLink to="/signin" style={({isActive})=>isActive ? { color: "#FF8C00", boxShadow: "0 2px 0 rgba(0, 0, 0, 0.2)" } : {}}> SignIn </NavLink>
                    }
                </div>
            </div>
            <Outlet/>
        </>

    );
}

export default Navbar;