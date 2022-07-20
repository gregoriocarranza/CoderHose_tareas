import { Fragment, useState, useEffect } from "react";

import CartCards from "./CartCards.jsx";
import "./App.css";

function CarritoList(prop) {
  const { cart, setReload, reload } = prop;

  let as = 0;
  return (
    <Fragment>
      {cart
        ? cart?.map((u) => (
            <Fragment>
              <CartCards
                key={as + 1}
                prod={u}
                setReload={setReload}
                reload={reload}
              />
            </Fragment>
          ))
        : ""}
    </Fragment>
  );
}

export default CarritoList;
