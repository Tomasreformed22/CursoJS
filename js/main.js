import { obtenerProductos, mostrarToast } from "./fetchData.js";

let carrito = [];
let usuario = "";

const contenedorProductos = document.getElementById("productos-container");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const tagInput = document.getElementById("tagUsuario");
const guardarTagBtn = document.getElementById("guardarTag");
const guardarCotizacionBtn = document.getElementById("guardarCotizacion");
const historialLista = document.getElementById("lista-historial");
const vaciarHistorialBtn = document.getElementById("vaciarHistorial");

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let sumaTotal = 0;

  carrito.forEach((producto) => {
    const item = document.createElement("li");
    item.innerHTML = `${producto.nombre} - $${producto.precio}`;
    listaCarrito.appendChild(item);
    sumaTotal += producto.precio;
  });

  total.textContent = `Total: $${sumaTotal}`;
}

function renderizarProductos(productos) {
  contenedorProductos.innerHTML = productos
    .map(
      (producto) => `
    <div class="producto">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      ${
        producto.precio > 0
          ? `<button data-id="${producto.id}">Agregar</button>`
          : ""
      }
    </div>
  `
    )
    .join("");

  contenedorProductos.querySelectorAll("button").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find((p) => p.id === id);
      carrito.push(producto);
      actualizarCarrito();
      mostrarToast("Producto agregado", "success");
    });
  });
}

function guardarTag() {
  const tag = tagInput.value.trim();
  if (!tag) {
    mostrarToast("Ingresá un tag válido", "error");
    return;
  }
  usuario = tag;
  mostrarToast(`Bienvenido, ${usuario}`, "success");
}

function guardarCotizacion() {
  if (!usuario || carrito.length === 0) {
    mostrarToast("Ingresá tu tag y agregá productos", "error");
    return;
  }

  const cotizacion = {
    usuario,
    productos: [...carrito],
    fecha: new Date().toLocaleString(),
  };

  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push(cotizacion);
  localStorage.setItem("historial", JSON.stringify(historial));

  mostrarToast("Cotización guardada", "success");
  renderizarHistorial();
  carrito = [];
  actualizarCarrito();
}

function renderizarHistorial() {
  historialLista.innerHTML = "";
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  historial.forEach((cotizacion, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${cotizacion.usuario}</strong> - ${cotizacion.fecha} <br>
      ${cotizacion.productos.map((p) => p.nombre).join(", ")} <br>
      <button data-index="${index}" class="borrar">Eliminar</button>
    `;
    historialLista.appendChild(li);
  });

  document.querySelectorAll(".borrar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      const historial = JSON.parse(localStorage.getItem("historial")) || [];
      historial.splice(index, 1);
      localStorage.setItem("historial", JSON.stringify(historial));
      renderizarHistorial();
      mostrarToast("Entrada eliminada", "info");
    });
  });
}

function vaciarHistorial() {
  localStorage.removeItem("historial");
  renderizarHistorial();
  mostrarToast("Historial vaciado", "info");
}

document.addEventListener("DOMContentLoaded", async () => {
  guardarTagBtn.addEventListener("click", guardarTag);
  guardarCotizacionBtn.addEventListener("click", guardarCotizacion);
  vaciarHistorialBtn.addEventListener("click", vaciarHistorial);

  try {
    const productos = await obtenerProductos();
    renderizarProductos(productos);
  } catch (err) {
    mostrarToast("Error al cargar productos", "error");
  }

  renderizarHistorial();
});
