import { obtenerProductos, mostrarToast } from "./fetchData.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cliente = JSON.parse(localStorage.getItem("cliente")) || {};

const contenedorProductos = document.getElementById("productos-container");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const formularioCliente = document.getElementById("formCliente");
const confirmarPresupuestoBtn = document.getElementById("confirmarPresupuesto");
const presupuestoContainer = document.getElementById("presupuesto-container");

function actualizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let sumaTotal = 0;

  carrito.forEach((item) => {
    const subtotal = item.cantidad * item.precio;
    sumaTotal += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - Cant: ${item.cantidad} - $${item.precio} c/u - Subtotal: $${subtotal}`;
    listaCarrito.appendChild(li);
  });

  total.textContent = `Total: $${sumaTotal}`;
  actualizarLocalStorage();
}

function renderizarProductos(productos) {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      ${producto.precio > 0 ? `<button data-id="${producto.id}">Agregar</button>` : ""}
    `;

    contenedorProductos.appendChild(div);
  });

  contenedorProductos.querySelectorAll("button").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find((p) => p.id === id);
      const itemEnCarrito = carrito.find((item) => item.id === id);

      if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      actualizarCarrito();
      mostrarToast("Producto agregado", "success");
    });
  });
}

function guardarDatosCliente(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreCliente").value.trim();
  const apellido = document.getElementById("apellidoCliente").value.trim();
  const email = document.getElementById("emailCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();

  if (!nombre || !apellido || !email || !telefono) {
    mostrarToast("Completá todos los campos obligatorios", "error");
    return;
  }

  cliente = { nombre, apellido, email, telefono, direccion };
  localStorage.setItem("cliente", JSON.stringify(cliente));
  mostrarToast("Datos guardados", "success");
}

function confirmarPresupuesto() {
  if (carrito.length === 0 || !cliente.nombre) {
    mostrarToast("Completá tus datos y agregá productos", "error");
    return;
  }

  let detalle = `
    <h3>Presupuesto para ${cliente.nombre} ${cliente.apellido}</h3>
    <p>Email: ${cliente.email}</p>
    <p>Teléfono: ${cliente.telefono}</p>
    <p>Dirección: ${cliente.direccion}</p>
  `;

  let totalPresupuesto = 0;
  detalle += "<ul>";
  carrito.forEach((item) => {
    const subtotal = item.cantidad * item.precio;
    detalle += `<li>${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal}</li>`;
    totalPresupuesto += subtotal;
  });
  detalle += "</ul>";

  const fechaEmision = new Date();
  const fechaVencimiento = new Date(fechaEmision.getTime() + 72 * 60 * 60 * 1000);

  detalle += `<p>Total: $${totalPresupuesto}</p>`;
  detalle += `<p>Emitido: ${fechaEmision.toLocaleString()}</p>`;
  detalle += `<p>Válido hasta: ${fechaVencimiento.toLocaleString()}</p>`;

  presupuestoContainer.innerHTML = detalle;
  mostrarToast("Presupuesto generado", "success");
}

formularioCliente.addEventListener("submit", guardarDatosCliente);
confirmarPresupuestoBtn.addEventListener("click", confirmarPresupuesto);

(async () => {
  try {
    const productos = await obtenerProductos();
    renderizarProductos(productos);
  } catch (err) {
    mostrarToast("Error al cargar productos", "error");
  }

  actualizarCarrito();
})();