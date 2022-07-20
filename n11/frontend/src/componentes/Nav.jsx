import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Product from "./views/Product";
import Carrito from "./views/Cart";

function App() {
  const [isclicked, setIsclicked] = useState(false);
  return (
    <Fragment>
      <header className="p-3">
        <nav className="nav justify-content-center nav-tabs">
          <button
            className={`${isclicked ? "nav-link " : "nav-link active"}`}
            aria-current="page"
            onClick={() => {
              setIsclicked(false);
            }}
          >
            Productos
          </button>
          <button
            className={`${isclicked ? "nav-link active" : "nav-link "}`}
            aria-current="page"
            onClick={() => {
              setIsclicked(true);
            }}
          >
            Carrito
          </button>
        </nav>
      </header>

      {isclicked ? <Carrito /> : <Product />}
    </Fragment>
  );
}

export default App;
