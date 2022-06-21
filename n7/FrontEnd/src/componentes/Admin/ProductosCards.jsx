import { useState } from "react";
import { Fragment } from "react";
import { eliminarProductos, actualizarProductos } from "../../Api";
import "./App.css";

const ProductosCards = (prop) => {
  // console.log(prop);
  const { task, setReload } = prop;
  const [update, setUpdate] = useState(false);
  const [toUpdate, setToUpdate] = useState([]);

  const updFunction = async (e) => {
    console.log(e.target.value);
    setToUpdate({ ...toUpdate, id: task.id, [e.target.name]: e.target.value });
    console.log(toUpdate);
  };

  return (
    <Fragment>
      <tr key={task.id}>
        {update ? (
          <Fragment>
            <td>
              <input
                type="text"
                name="Autor"
                id="Autor"
                placeholder={task.Autor}
                onChange={(e) => {
                  updFunction(e);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="Titulo"
                id="Titulo"
                placeholder={task.Titulo}
                onChange={(e) => {
                  updFunction(e);
                }}
              />
            </td>
            <td>
              <textarea
                name="Descripcion"
                id="Descripcion"
                cols="50"
                rows="3"
                placeholder={task.Descripcion}
                onChange={(e) => {
                  updFunction(e);
                }}
              ></textarea>
            </td>
            <td>
              <input
                type="text"
                name="Ratio"
                id="Ratio"
                placeholder={`${task.Ratio}/10`}
                onChange={(e) => {
                  updFunction(e);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="Precio"
                id="Precio"
                placeholder={`${task.Precio} (Agregar un espacio al final)`}
                onChange={(e) => {
                  updFunction(e);
                }}
              />
            </td>
          </Fragment>
        ) : (
          <Fragment>
            <td>{task.Autor}</td>
            <td>{task.Titulo}</td>
            <td>{task.Descripcion}</td>
            <td>{task.Ratio}/10</td>
            <td>{task.Precio}</td>
          </Fragment>
        )}
        <td>
          {update ? (
            <Fragment>
              <button
                className="btn btn-success m-2"
                onClick={async () => {
                  // console.log(toUpdate);
                  await actualizarProductos(toUpdate);
                  setReload(true);
                }}
              >
                Enviar
              </button>
              <button
                className="btn btn-success m-2"
                onClick={() => {
                  setUpdate(!update);
                }}
              >
                Cancelar
              </button>
            </Fragment>
          ) : (
            <button
              className="btn btn-success m-2"
              onClick={() => {
                setUpdate(!update);
              }}
            >
              Actualizar
            </button>
          )}
          <button
            className="btn btn-danger m-2"
            onClick={() => {
              eliminarProductos(task.id);
              setReload(true);
            }}
          >
            Eliminar
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default ProductosCards;
