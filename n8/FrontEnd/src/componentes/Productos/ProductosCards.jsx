import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Comprar } from "../../Api";
import "./App.css";

const ProductosCards = ({ task }) => {
  // console.log(task);
  if (task.Mostrar_Web === 1) {
    return (
      <Fragment>
        <tr key={task.id}>
          <td>{task.Autor}</td>
          <td>{task.Titulo}</td>
          <td>{task.Descripcion}</td>
          <td>{task.Ratio}/10</td>
          <td>{task.Precio}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("User"));
                // console.log(user);
                Comprar({ user, task });
              }}
            >
              Buy
            </button>
          </td>
        </tr>
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default ProductosCards;
