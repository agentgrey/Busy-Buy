// import CSS
import Style from "./cart.module.css";
// import Hooks
import { useEffect } from "react";
// import Router
import { NavLink } from "react-router-dom";
// import Dependencies
import { useValue } from "../../context";
// import Database
import { ref, get } from 'firebase/database';
import { database, auth } from '../../firebaseInit';

function Cart() {
  // Access the cart items from the CartContext
  const { cartItems, setCartItems, cartTotal, setCartTotal } = useValue();


  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("user not found ", user);
      return; // Return early if the user is not authenticated
    }

    const userId = user.uid;
    const cartRef = ref(database, `usersCarts/${userId}/myCart`);
    const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);

    const fetchCartData = async () => {
      try {
        const [cartSnapshot, cartTotalSnapshot] = await Promise.all([
          get(cartRef),
          get(cartTotalRef),
        ]);

        if (cartSnapshot.exists() && cartTotalSnapshot.exists()) {
          const cartData = cartSnapshot.val();
          const cartItemsArray = Object.values(cartData);
          const cartTotalValue = cartTotalSnapshot.val();

          setCartItems(cartItemsArray);
          setCartTotal(cartTotalValue);
        } else {
          setCartItems([]);
          setCartTotal(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
  }, []);

  return (
    <div className={Style.cartContainer}>
      <div className={Style.heading}>
        <h1>My Cart</h1>
        {cartTotal===undefined ? "" : 
          <div style={{ display: "flex" }}>
            <h2>Total: ₹{cartTotal}</h2>
            <NavLink to="/orders" className={Style.buy_btn}>Proceed to buy</NavLink>
          </div> }
      </div>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <ul className={Style.itemList}>
          {cartItems.map((item) => (
            <li key={item.id} className={Style.item}>
              <div className={Style.itemImage}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className={Style.itemDetails}>
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className={Style.quantityControls}>
                  <button
                    className={Style.decreaseButton}
                    // onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className={Style.quantity}>{item.qty}</span>
                  <button
                    className={Style.increaseButton}
                    // onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                  <button
                    className={Style.removeButton}
                    // onClick={() => handleRemove(item.id)}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
