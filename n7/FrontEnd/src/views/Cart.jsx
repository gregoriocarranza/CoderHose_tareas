import { Fragment, useState } from "react";
import "./App.css";
import CarritoList from "../componentes/carrito/Carrito.jsx";
import { CrearCarrito, Delete_cart, ProdCarrito } from "../Api";
import { useEffect } from "react";

function Cart() {
  const [existeCart, setExisteCart] = useState(false);
  const [carrito, setCarrito] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      console.log("existe");

      setExisteCart(true);
    } else {
      // console.log("Sin Usuario Logueado");

      setExisteCart(false);
    }
  }, [reload]);

  useEffect(() => {
    setTimeout(() => {
      ProdCart();
    }, 500);
  }, [reload]);

  const ProdCart = async () => {
    const UserId = JSON.parse(localStorage.getItem("User"));
    if (UserId) {
      console.log(UserId);
      await ProdCarrito(UserId.uuid).then((res) => {
        // console.log(res.data);
        setCarrito(res.data);
      });
    }
  };
  return (
    <Fragment>
      <h2>Bienvenido a la seccion de carrito</h2>
      {existeCart ? (
        <Fragment>
          <h4>Usted ya posee un carrito, uselo</h4>
          <button
            className="btn btn-success"
            onClick={() => {
              setReload(!reload);
              setExisteCart(false);
              const user = JSON.parse(localStorage.getItem("User"));
              // console.log(user);
              Delete_cart(user);
              localStorage.removeItem("User");
            }}
          >
            Eliminar Carrito
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <h4>Usted no posee un carrito, creelo</h4>
          <button
            className="btn btn-success"
            onClick={() => {
              setReload(!reload);
              setExisteCart(true);
              CrearCarrito().then(({ data }) => {
                console.log(data.txt);

                localStorage.setItem("User", JSON.stringify(data.txt));
              });
            }}
          >
            Crear Carrito
          </button>
        </Fragment>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Putuacion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <CarritoList
            cart={carrito.Compra}
            setReload={(u) => {
              setReload(u);
            }}
          />
        </tbody>
      </table>
    </Fragment>
  );
}

export default Cart;
