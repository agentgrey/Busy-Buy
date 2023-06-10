/** ------------------ IMPORTING CSS ------------------ **/
import Style from "./cart.module.css";
/** ------------------ IMPORTING HOOKS ------------------ **/
import { useEffect } from "react";
import { useValue } from "../../context";
/** ------------------ IMPORTING FIREBASE MODULES------------------ **/
import { ref, get } from 'firebase/database';
import { database, auth } from '../../firebaseInit';



/** ------------------ Function to display the Cart Page ------------------ **/
function Cart() {

  const { cartItems,
        setCartItems,
        cartTotal,
        setCartTotal,
        handleRemove,
        handleAdd,
        handleDecrease,
        placeOrder} = useValue();

/** ------------------ Fetches data from database ------------------ **/
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
  }, [setCartItems, setCartTotal]);



  return (
    <div className={Style.cartContainer}>
      <div className={Style.heading}>
        <h1>My Cart</h1>
        {cartTotal===undefined || cartTotal===0 ? "" : 
          <div style={{ display: "flex" }}>
            <h2>Total: ₹{cartTotal}</h2>
            <button onClick={()=>placeOrder()} className={Style.buy_btn}>Proceed to buy</button>
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
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <span className={Style.quantity}>{item.qty}</span>
                  <button
                    className={Style.increaseButton}
                    onClick={() => handleAdd(item)}
                  >
                    +
                  </button>
                  <button
                    className={Style.removeButton}
                    onClick={() => handleRemove(item)}
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

/** ------------------ EXPORTING MODULES ------------------ **/
export default Cart;