// import CSS
import Style from "./signUp.module.css";
// import Router
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <>
            <div className={Style.form}>
                <h1> नमस्ते! <img src="https://cdn-icons-png.flaticon.com/128/317/317579.png"
                    className={Style.namaste} alt="Namaste"/></h1>
                <form>
                    <input type="text" placeholder="Name"  /> <br />
                    <input type="email" placeholder="Email"  /> <br />
                    <input type="password" placeholder="Password"  /> <br />
                    <button  type="submit">Sign Up</button>
                    <Link to="/signin">Already have an Account?</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp;