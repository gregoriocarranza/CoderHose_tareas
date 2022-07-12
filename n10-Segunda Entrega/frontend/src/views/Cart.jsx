import { Fragment, useState, useEffect } from "react";
import "./App.css";
import CarritoList from "../componentes/carrito/Carrito.jsx";
import { CrearCarrito, Delete_cart, ProdCarrito } from "../Api";

function Cart() {
  const [existeCart, setExisteCart] = useState();
  const [carrito, setCarrito] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UserCartuuid")) {
      console.log("existe");
      setExisteCart(true);
    } else {
      console.log("Sin Usuario Logueado");
      setExisteCart(false);
    }
  }, [reload]);

  useEffect(() => {
    setTimeout(() => {
      ProdCart();
    }, 500);
  }, [reload]);

  const ProdCart = async () => {
    const UserCartuuid = JSON.parse(localStorage.getItem("UserCartuuid"));
    if (UserCartuuid) {
      // console.log(UserCartuuid);
      await ProdCarrito(UserCartuuid).then((res) => {
        // console.log(carrito);
        setCarrito(res.data.productos);
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
              setExisteCart(false);
              const user = JSON.parse(localStorage.getItem("UserCartuuid"));
              console.log("Carrito eliminado");
              Delete_cart(user);
              localStorage.removeItem("UserCartuuid");
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
              setExisteCart(true);
              console.log("Carrito Creado");

              CrearCarrito().then(({ data }) => {
                console.log(data.txt);

                localStorage.setItem(
                  "Useruuid",
                  JSON.stringify(data.txt.userId)
                );
                localStorage.setItem(
                  "UserCartuuid",
                  JSON.stringify(data.txt._id.toString().split(" "))
                );
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
            cart={carrito}
            setReload={(u) => {
              setReload(u);
            }}
            reload={reload}
          />
        </tbody>
      </table>
    </Fragment>
  );
}

export default Cart;
