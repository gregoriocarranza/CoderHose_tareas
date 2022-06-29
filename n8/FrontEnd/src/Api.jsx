import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const productos = "http://localhost:3005/api/productos";
const carrito = "http://localhost:3005/api/carrito";

// Recibir data
export const getProductos = async () => {
  // console.log(`${productos}`);
  return await axios.get(`${productos}`);
};

export const agregarProductos = async (prod) => {
  // console.log(`${productos}/${User.id}`);
  console.log(prod);

  return await axios.post(`${productos}`,prod);
};
export const actualizarProductos = async (prod) => {
  // console.log(`${productos}/${User.id}`);
  console.log(prod);
  return await axios.put(`${productos}`,prod);
};
export const eliminarProductos = async (id) => {
  // console.log(`${productos}/${User.id}`);
  // console.log(id);
  return await axios.delete(`${productos}/${id}`);
};

// cart----------------------------------------------------------

export const CrearCarrito = async () => {
  // console.log(`${productos}`);
  return await axios.post(`${carrito}`, { uuid: uuidv4() });
};
export const Delete_cart = async (user) => {
  // console.log(`${productos}`);
  // console.log(user);

  return await axios.delete(`${carrito}/${user.uuid}`);
};
export const Comprar = async (body) => {
  // console.log(`${productos}`);
  // console.log(body);
  return await axios.post(`${carrito}/${body.user.uuid}/prod`, body.task);
};
export const ProdCarrito = async (body) => {
  // console.log(`${productos}`);
  // console.log(body);
  return await axios.get(`${carrito}/${body}/prod`);
};
export const DeleteProdCarrito = async (body) => {
  // console.log(`${productos}`);
  console.log(body);
  const uuid = JSON.stringify(body.uuid);
  return await axios.delete(`${carrito}/${uuid}/prod/${body.prod.id}`);
};

//user-------------------------------------
