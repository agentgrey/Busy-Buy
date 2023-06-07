// Import CSS
import Style from './home.module.css';
// Import Dependencies
import Data from '../../data';
import {NavLink} from "react-router-dom";

function Home() {

    return (
        <>
            <div className={Style.container}>
                {Data.map((item , id) =>(
                    <div key={id} className= {Style.product}>
                        <img src = {item.img} alt='Product' />
                        <h2>{item.title}</h2>
                        <h3>₹ {item.price}</h3>
                        <NavLink >
                            <button >
                                Add To Cart
                            </button>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;