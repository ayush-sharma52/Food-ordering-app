import { useContext } from "react";
import Modal from "../UI/modal/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context.js";
import CartItem from "./CartItem/CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const hasItems=cartCtx.items.length>0;
  const removeHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onRemove={removeHandler.bind(null, item.id)}
          onAdd={addHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.total.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems&&<button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
export default Cart;
