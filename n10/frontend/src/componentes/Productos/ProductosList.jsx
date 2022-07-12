import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import ProductosCards from "./ProductosCards.jsx";
import "./App.css";

const ProductosList = ({ data }) => {
  // console.log(data);
  return (
    <Fragment>
      {data.map((u) => (
        <Fragment>
          <ProductosCards key={u.id} task={u} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProductosList;
