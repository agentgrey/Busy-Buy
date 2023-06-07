// import CSS
import Style from "./signIn.module.css"
// import 
import { useState, useRef } from 'react';
// import Router
import { Link } from 'react-router-dom';
// import Database
import {auth} from '../../firebaseInit';
import { signInWithEmailAndPassword  } from "firebase/auth";


function SignIn() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            // Sign-in successful, redirect to home page
            window.location.href = '/';
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(error);
            console.error("Error signing in:", errorCode, errorMessage);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className={Style.form}>
                <h1> आपका स्वागत है <img src="https://cdn-icons-png.flaticon.com/128/317/317579.png"
                    className={Style.namaste} alt="Namaste"/></h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" ref={emailRef} /> <br />
                    <input type="password" placeholder="Password" ref={passwordRef} /> <br />
                    <button  type="submit">Sign In</button>
                    <Link to="/signup">Create a new Account</Link>
                </form>
            </div>
        </>
    )
}

export default SignIn;