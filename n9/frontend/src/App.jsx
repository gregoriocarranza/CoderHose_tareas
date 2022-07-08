import { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Product from "./views/Product";
import Carrito from "./views/Cart";
import Admin from "./views/Admin";

function App() {
  // const [isclicked, setIsclicked] = useState(false);
  const [isAdm, setIsAdm] = useState(false);

  return (
    <Fragment>
      <BrowserRouter>
        <div className="App">
          <header className="p-3">
            <nav className="nav justify-content-center nav-tabs">
              <Link to="/" className="nav-link active">
                Productos
              </Link>
              <Link to="/cart" className="nav-link active">
                Carrito
              </Link>
              {isAdm ? (
                <Link to="/adm" className="nav-link active">
                  Admin
                </Link>
              ) : (
                ""
              )}
              <div>
                <label htmlFor="Admin">Sos admin?</label>
                <input
                  type="checkbox"
                  name="Admin"
                  id="Admin"
                  onClick={() => {
                    setIsAdm(!isAdm);
                  }}
                />
              </div>
            </nav>
          </header>
        </div>

        {/* {isclicked ? (<Carrito />): (<Product />)} */}
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Carrito />} />
          <Route path="/adm" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
