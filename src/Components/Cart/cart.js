// import CSS
import Style from "./cart.module.css";
import React, { useContext } from "react";


function Cart() {
// Access the cart items from the CartContext
     const cartItems = [{
    id: 3,
    img: 'https://m.media-amazon.com/images/I/81fCzXR0WyL._AC_UL600_QL65_.jpg',
    title: 'Women T-Shirt',
    category: 'Women',
    price: 349
  },
  {
    id: 4,
    img: 'https://m.media-amazon.com/images/I/71+ZShLtNsL._AC_UL600_QL65_.jpg',
    title: 'Printed Denim Jacket',
    category: 'Men',
    price: 2015
  },
  {
    id: 5,
    img: 'https://m.media-amazon.com/images/I/91VUHcww2pL._AC_UL600_QL65_.jpg',
    title: 'Maurauders Map',
    category: 'Books',
    price: 499
  }];


  return (
    <div className={Style.cartContainer}>
      <h1>My Cart</h1>
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
              <p>Price: ${item.price}</p>
              <div className={Style.quantityControls}>
                <button className={Style.decreaseButton}
                //   onClick={() => handleDecrease(item.id)} 
                  >
                  - </button>
                <span className={Style.quantity}>1</span>
                <button className={Style.increaseButton}
                //   onClick={() => handleIncrease(item.id)} 
                  >
                  + 
                </button>
                <button
                className={Style.removeButton}
                //   onClick={() => handleRemove(item.id)}
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
