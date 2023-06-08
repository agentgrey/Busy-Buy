// CustomContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
// Importing Database
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, push, set, get, remove } from 'firebase/database';
import { auth, database } from './firebaseInit';

// context object
const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomContext({ children }) {
  const [userPresent, setUserPresent] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState();

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
        // handle logout success
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

// Add item to the cart
  async function handleAdd(item) {
    try {
      const userId = auth.currentUser.uid; // current UserID
      const cartRef = ref(database, `usersCarts/${userId}/myCart`);

      const snapshot = await get(cartRef);
      const existingCartItems = snapshot.val() || {};

      const existingCartItem = Object.values(existingCartItems).find(
        (cartItem) => cartItem.title === item.title
      );

      if (existingCartItem) {
        const updatedQty = existingCartItem.qty + 1;
        existingCartItem.qty = updatedQty;

        await set(cartRef, existingCartItems);

        const updatedCartTotal = cartTotal + item.price;
        await set(ref(database, `usersCarts/${userId}/cartTotal`), updatedCartTotal);
        setCartTotal(updatedCartTotal);
        console.log(cartItems);
        // setCartItems(updatedQty);
        // toast.success("Item Count Increased!");
      } else {
        const cartItemRef = push(cartRef);
        const itemId = cartItemRef.key;

        const newItem = {
          id: itemId,
          img: item.img,
          title: item.title,
          price: item.price,
          qty: 1,
        };

        existingCartItems[itemId] = newItem;

        await set(cartRef, existingCartItems);

        const updatedCartTotal = cartTotal + item.price;
        await set(ref(database, `usersCarts/${userId}/cartTotal`), updatedCartTotal);
        setCartTotal(updatedCartTotal);
        console.log(cartItems);
        // setCartItems([...cartItems, newItem]);
        // toast.success("Item added to cart!");
      }

      console.log("Product added: ");
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Display an error message to the user if necessary
    }
  }


// Remove item from the cart
  async function handleRemove(item) {
    try {
      // Find the index of the item in the cartItems array
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (itemIndex !== -1) {
        // Remove the item from the cartItems array
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(itemIndex, 1);
        setCartItems(updatedCartItems);

        // Calculate the new cart total
        const updatedCartTotal = cartTotal - item.price;
        setCartTotal(updatedCartTotal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <itemContext.Provider value={{ userPresent, handleLogout, searchTerm, setSearchTerm, cartItems, setCartItems, cartTotal, setCartTotal, handleAdd, handleRemove }}>
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomContext;
