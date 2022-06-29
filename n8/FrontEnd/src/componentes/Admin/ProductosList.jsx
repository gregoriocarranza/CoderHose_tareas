import { Fragment } from "react";

import ProductosCards from "./ProductosCards.jsx";
import "./App.css";

const ProductosList = (prop) => {
  // console.log(prop);
  const { data, setReload } = prop;
  return (
    <Fragment>
      {data.map((u) => (
        <Fragment>
          <ProductosCards key={u.id} task={u} setReload={setReload}/>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default ProductosList;
