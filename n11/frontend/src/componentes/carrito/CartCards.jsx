import { Fragment } from "react";
import { DeleteProdCarrito } from "../../Api";

import "./App.css";

function CartCards(prop) {
  // console.log(prop);
  const { prod, setReload, reload } = prop;
  // console.log(prod);
  return (
    <Fragment>
      <tr key={prod.id}>
        <td>{prod.Autor}</td>
        <td>{prod.Titulo}</td>
        <td>{prod.Descripcion}</td>
        <td>{prod.Ratio}/10</td>
        <td>{prod.Precio}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              const uuid = JSON.parse(localStorage.getItem("UserCartuuid"));
              // console.log(uuid);
              // console.log(prod);
              DeleteProdCarrito({ uuid, prod });
              setReload(!reload);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
}

export default CartCards;
