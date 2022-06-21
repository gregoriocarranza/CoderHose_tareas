import { Fragment, useEffect, useState } from "react";
import ProductosList from "../componentes/Admin/ProductosList";
import "./App.css";
import { getProductos, agregarProductos } from "../Api";

function CarritoList() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [toCreate, setToCreate] = useState([]);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    AllProducts();

    setReload(false);
  }, [reload]);

  const AllProducts = async () => {
    await getProductos().then((res) => {
      setData(res.data);
    });
  };

  const createProd = async (e) => {
    console.log(e.target.value);
    setToCreate({ ...toCreate, [e.target.name]: e.target.value });
    console.log(toCreate);
  };

  return (
    <Fragment>
      <h2>Bienvenido a la seccion de Administracion</h2>
      <section className="d-flex justify-content-center">
        <button
          className="btn btn-success m-auto"
          onClick={() => {
            setpopup(!popup);
            // console.log(toCreate);
          }}
        >
          Agregar producto
        </button>
      </section>
      {popup ? (
        <section className="popup">
          <h3>Ingrese el producto</h3>
          <input
            type="text"
            name="Autor"
            id="Autor"
            placeholder="Autor"
            onChange={(e) => {
              createProd(e);
            }}
          />

          <input
            type="text"
            name="Titulo"
            id="Titulo"
            placeholder="Titulo"
            onChange={(e) => {
              createProd(e);
            }}
          />

          <textarea
            name="Descripcion"
            id="Descripcion"
            cols="50"
            rows="3"
            placeholder="Descripcion"
            onChange={(e) => {
              createProd(e);
            }}
          ></textarea>

          <input
            type="text"
            name="Ratio"
            id="Ratio"
            placeholder="Puntuacion"
            onChange={(e) => {
              createProd(e);
            }}
          />

          <input
            type="text"
            name="Precio"
            id="Precio"
            placeholder="Precio"
            onChange={(e) => {
              createProd(e);
            }}
          />
          <button
            className="btn btn-success m-auto"
            onClick={() => {
              setpopup(!popup);
              agregarProductos(toCreate);
            }}
          >
            Enviar
          </button>
        </section>
      ) : (
        ""
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
          <ProductosList
            data={data}
            setReload={(u) => {
              setReload(u);
            }}
          />
        </tbody>
      </table>
    </Fragment>
  );
}

export default CarritoList;
