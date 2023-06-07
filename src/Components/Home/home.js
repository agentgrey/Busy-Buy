// Import CSS
import Style from './home.module.css';
// Import Dependencies
import Data from '../../data';
import {NavLink} from "react-router-dom";

function Home() {

    return (
        <>
            <div className={Style.container}>
                {Data.map((item , index) =>(
                    <>
                        <div key={index} className= {Style.product}>
                            <img src = {item.img} alt='Image' />
                            <h2>{item.title}</h2>
                            <h3>₹ {item.price}</h3>
                            <NavLink >
                                <button disabled =""  onClick="">
                                    Add To Cart
                                </button>
                            </NavLink>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}

export default Home;