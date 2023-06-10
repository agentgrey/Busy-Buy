/** ------------------ IMPORTING HOOKS ------------------ **/
import React, { createContext, useState, useContext, useEffect } from "react";
/** ------------------ IMPORTING FIREBASE MODULES ------------------ **/
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, push, set, get } from 'firebase/database';
import { auth, database } from './firebaseInit';

// context object
const itemContext = createContext();
function useValue() {
  const value = useContext(itemContext);
  return value;
}


/** ------------------ Function to create custom Hooks ------------------ **/
function CustomContext({ children }) {
  const [userPresent, setUserPresent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderItem, setOrderItem] = useState([]);

/** ------------------ Verifies the presence of user ------------------ **/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserPresent(true);
      } else {
        setUserPresent(false);
      }
    });
    return () => unsubscribe();
  }, []);

/** ------------------ To log out the user ------------------ **/
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // handle logout success
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

/** ------------------ Add item to cart / Increase quantity ------------------ **/
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
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

/** ------------------ Removes item from the cart ------------------ **/
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
  }
}

/** ------------------ Decreases quantity of the item in cart ------------------ **/
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
  }
}

/** ------------------ Place's the order for the items in the cart ------------------ **/
async function placeOrder() {
  try {
    const userId = auth.currentUser.uid; // current UserID
    const cartRef = ref(database, `usersCarts/${userId}/myCart`);
    const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);
    const ordersRef = ref(database, `myOrders/${userId}`);

    const snapshot = await get(cartRef);
    const existingCartItems = snapshot.val() || {};

    // Create a new order object
    const order = {
      items: Object.values(existingCartItems),
      date: new Date().toLocaleString(),
      total: cartTotal,
    };
    // Push the order to the "myOrders" node in the database
    const orderRef = push(ordersRef);
    await set(orderRef, order);

    // Clear the cart items and cart total in the database
    await set(cartRef, null);
    await set(cartTotalRef, 0);
    // Clear the cart items and cart total in the local state
    setCartItems([]);
    setCartTotal(0);

  } catch (error) {
    console.error('Error placing order:', error);
  }
}




  return (
    <itemContext.Provider value={{ userPresent, handleLogout, searchTerm, setSearchTerm, 
                                  cartItems, setCartItems, cartTotal, setCartTotal,
                                  handleAdd, handleRemove, handleDecrease, placeOrder,
                                  orderItem, setOrderItem }}>
      {children}
    </itemContext.Provider>
  );
}

/** ------------------ EXPORTING MODULES ------------------ **/
export { useValue };
export default CustomContext;
