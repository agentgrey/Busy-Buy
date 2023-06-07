// import CSS
import Style from "./signIn.module.css"
// import Router
import { Link } from 'react-router-dom';;

function SignUp() {
    return (
        <>
            <div className={Style.form}>
                <h1> आपका स्वागत है <img src="https://cdn-icons-png.flaticon.com/128/317/317579.png"
                    className={Style.namaste} alt="Namaste"/></h1>
                <form>
                    <input type="email" placeholder="Email"  /> <br />
                    <input type="password" placeholder="Password"  /> <br />
                    <button  type="submit">Sign In</button>
                    <Link to="/signup">Create a new Account</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp;