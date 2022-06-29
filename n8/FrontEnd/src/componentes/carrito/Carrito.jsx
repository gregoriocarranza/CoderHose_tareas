import { Fragment } from "react";

import CartCards from "./CartCards.jsx";
import "./App.css";

function CarritoList(prop) {
  // console.log(prop);
  const { cart, setReload } = prop;
  let as = 0;
  return (
    <Fragment>
      {cart
        ? cart.map((u) => (
            <Fragment>
              <CartCards key={as + 1} prod={u} setReload={setReload} />
            </Fragment>
          ))
        : ""}
    </Fragment>
  );
}

export default CarritoList;
