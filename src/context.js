// CustomContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
// Importing Database
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, push, set, get } from 'firebase/database';
import { auth, database } from './firebaseInit';

// context object
const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomContext({ children }) {
  const [userPresent, setUserPresent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

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
      const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);

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
      await set(cartTotalRef, updatedCartTotal);
      setCartTotal(updatedCartTotal);

      // Find the index of the item in the cartItems array
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === existingCartItem.id);

      if (itemIndex !== -1) {
        // Update the item quantity in the cartItems array
        const updatedCartItems = [...cartItems];
        updatedCartItems[itemIndex].qty = updatedQty;
        setCartItems(updatedCartItems);
      }
      
        console.log("Product qty inc: ", existingCartItem.title +"->" , existingCartItem.qty);
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

        const updatedCartTotal = cartTotal + (item.price);
        await set(cartTotalRef, updatedCartTotal);
        setCartTotal(updatedCartTotal);
        console.log("Product added: ", newItem.title);
        // setCartItems([...cartItems, newItem]);
        // toast.success("Item added to cart!");
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Display an error message to the user if necessary
    }
  }

// Remove item from the cart
async function handleRemove(item) {
  try {
    const userId = auth.currentUser.uid; // current UserID
    const cartRef = ref(database, `usersCarts/${userId}/myCart`);
    const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);

    const snapshot = await get(cartRef);
    const existingCartItems = snapshot.val() || {};

    // Find the item in the existing cart items
    const itemKey = Object.keys(existingCartItems).find(
      (key) => existingCartItems[key].id === item.id
    );

    if (itemKey) {
      // Calculate the updated cart total
      const updatedCartTotal = cartTotal - (item.qty*item.price);

      // Remove the item from the existing cart items
      delete existingCartItems[itemKey];

      // Update the cart items and cart total in the database
      await set(cartRef, existingCartItems);
      await set(cartTotalRef, updatedCartTotal);

      // Update the cart items and cart total in the local state
      setCartItems(Object.values(existingCartItems));
      setCartTotal(updatedCartTotal);
    }

  } catch (error) {
    console.error('Error removing item from cart:', error);
    // Display an error message to the user if necessary
  }
}

// Decreases the quantity of the item
async function handleDecrease(item) {
  try {
    const userId = auth.currentUser.uid; // current UserID
    const cartRef = ref(database, `usersCarts/${userId}/myCart`);
    const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);

    const snapshot = await get(cartRef);
    const existingCartItems = snapshot.val() || {};

    // Find the item in the existing cart items
    const itemKey = Object.keys(existingCartItems).find(
      (key) => existingCartItems[key].id === item.id
    );

    if (itemKey) {
      const existingCartItem = existingCartItems[itemKey];

      // Decrease the quantity by 1
      existingCartItem.qty--;

      // Calculate the updated cart total
      const updatedCartTotal = cartTotal - item.price;

      // Update the cart item quantity and cart total in the database
      await set(cartRef, existingCartItems);
      await set(cartTotalRef, updatedCartTotal);

      // Update the cart item quantity and cart total in the local state
      setCartItems(Object.values(existingCartItems));
      setCartTotal(updatedCartTotal);

      // If the quantity is 1, remove the item from the cart
      if(existingCartItem.qty===0) {
        await handleRemove(item);
      }
      console.log("Product qty dec: ", existingCartItem.title +"->" , existingCartItem.qty);
    }
  } catch (error) {
    console.error('Error decreasing item quantity:', error);
    // Display an error message to the user if necessary
  }
}


  return (
    <itemContext.Provider value={{ userPresent, handleLogout, searchTerm, setSearchTerm, cartItems, setCartItems, cartTotal, setCartTotal, handleAdd, handleRemove, handleDecrease }}>
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomContext;
