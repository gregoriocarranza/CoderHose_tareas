import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductosList from "../componentes/Productos/ProductosList.jsx";
import { getProductos } from "../Api";

import "./App.css";

function Productos() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    AllProducts();

    setReload(false);
  }, [reload]);

  const AllProducts = async () => {
    await getProductos().then((res) => {
      setData(res.data);
    });
  };

  return (
    <Fragment>
      <h2>Bienvenido a la seccion de productos</h2>
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
          <ProductosList data={data} />
        </tbody>
      </table>
    </Fragment>
  );
}

export default Productos;
