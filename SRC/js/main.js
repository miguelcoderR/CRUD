const productos = {};
const productoSet = new Set();

document.getElementById("formularioProducto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!nombre || isNaN(precio) || isNaN(cantidad) || precio < 0 || cantidad < 0) {
    alert("Por favor, completa correctamente todos los campos.");
    return;
  }

  const nombreExiste = Object.values(productos).some(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  if (nombreExiste) {
    alert("Este producto ya existe. No se permiten duplicados.");
    return;
  }

  const id = Date.now();
  const nuevoProducto = { id, nombre, precio, cantidad };
  const claveSet = JSON.stringify(nuevoProducto);

  productoSet.add(claveSet);
  productos[`prod${id}`] = nuevoProducto;

  mostrarResultados();
  this.reset();
});

function mostrarResultados() {
  const salida = document.getElementById("resultados");
  salida.innerHTML = "<h3>📦 Productos registrados</h3>";

  for (const clave in productos) {
    const p = productos[clave];
    salida.innerHTML += `
      <div class="producto">
        <strong>${p.nombre}</strong><br>
        Precio: $${p.precio}<br>
        Cantidad: ${p.cantidad}<br>
        <button onclick="editarProducto('${clave}')">✏️ Editar</button>
        <button onclick="eliminarProducto('${clave}')">🗑️ Eliminar</button>
      </div>
    `;
  }
}

function editarProducto(clave) {
  const p = productos[clave];
  const nuevoNombre = prompt("Nuevo nombre:", p.nombre);
  const nuevoPrecio = parseFloat(prompt("Nuevo precio:", p.precio));
  const nuevaCantidad = parseInt(prompt("Nueva cantidad:", p.cantidad));

  if (!nuevoNombre || isNaN(nuevoPrecio) || nuevoPrecio < 0 || isNaN(nuevaCantidad) || nuevaCantidad < 0) {
    alert("Valores inválidos.");
    return;
  }

  const existeNombre = Object.values(productos).some(
    prod => prod.nombre.toLowerCase() === nuevoNombre.toLowerCase() && prod.id !== p.id
  );
  if (existeNombre) {
    alert("Ya existe un producto con ese nombre.");
    return;
  }

  p.nombre = nuevoNombre;
  p.precio = nuevoPrecio;
  p.cantidad = nuevaCantidad;

  mostrarResultados();
}

function eliminarProducto(clave) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    const prod = productos[clave];
    delete productos[clave];

    for (let item of productoSet) {
      const obj = JSON.parse(item);
      if (obj.id === prod.id) {
        productoSet.delete(item);
        break;
      }
    }

    mostrarResultados();
  }
}