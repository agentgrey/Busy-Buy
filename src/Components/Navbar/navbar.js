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
                <div className={Style.searchBar}>
                    <input type="text" placeholder="Search..." 
                    value={searchTerm} onChange={handleSearchTermChange}/>
                </div>
                <div className={Style.menu}>
                    <NavLink to="/"> <button>Home</button> </NavLink>
                    {userPresent ? <>
                        <button>My orders</button>
                        <NavLink to="/cart"> <button>Cart</button> </NavLink>
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