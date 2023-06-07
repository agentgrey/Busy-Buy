// import CSS
import Style from "./signUp.module.css";
// import 
import { useState, useRef } from 'react';
// import Router
import { Link } from 'react-router-dom';
// import firebase
import {auth, database} from '../../firebaseInit';
import { set, ref } from "firebase/database";
import { createUserWithEmailAndPassword  } from "firebase/auth";

function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const[error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);

// function to create user
    const handleSubmit = async(e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Store the user in the Firebase Realtime Database
            await set(ref(database, `users/${user.uid}`), {
                name: name,
                email: email,
            });
            // Clear the input fields after successful signup
            handleClear();
            console.log("Signed up successfully ", auth)
            // Sign-in successful, redirect to home page
            window.location.href = '/';
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(error);
            console.error("Error signing up:", errorCode, errorMessage);
        }
        setIsLoading(false);
    }
// function to clear the input fields
    function handleClear() {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <>
            <div className={Style.form}>
                <h1> नमस्ते! <img src="https://cdn-icons-png.flaticon.com/128/317/317579.png"
                    className={Style.namaste} alt="Namaste"/></h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" ref={nameRef} /> <br />
                    <input type="email" placeholder="Email" ref={emailRef} /> <br />
                    <input type="password" placeholder="Password" ref={passwordRef} /> <br />
                    <button  type="submit">Sign Up</button>
                    <Link to="/signin">Already have an Account?</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp;