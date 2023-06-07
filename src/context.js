// CustomContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
// Importing Database
import {signOut, onAuthStateChanged} from 'firebase/auth';
import { auth} from './firebaseInit';
// context object
const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomContext({ children }) {
  const [userPresent, setUserPresent] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

// Used for checking if the user is there or not.
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUserPresent(true);
        } else {
          // User is signed out
          setUserPresent(false);
        }
      });
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);

// log's out the user
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout successful
        // toast.success('User Logged Out Successfully !')
        // console.log('User logged out successfully');
      })
      .catch((error) => {
        // An error occurred during logout
        // toast.error("Error logging Out");
        console.error('Error logging out:', error);
      });
  }


  return (
    <itemContext.Provider value={{ userPresent, handleLogout, searchTerm, setSearchTerm}}>
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomContext;
