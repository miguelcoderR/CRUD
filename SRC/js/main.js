const inventario = [];

function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!nombre || isNaN(precio) || isNaN(cantidad) || precio < 0 || cantidad < 0) {
    alert("Ingrese datos válidos.");
    return;
  }

  if (inventario.find(p => p.nombre === nombre)) {
    alert("Este producto ya existe.");
    return;
  }

  inventario.push({ nombre, precio, cantidad });
  limpiarCampos();
  mostrarInventario();
}

function mostrarInventario() {
  const lista = document.getElementById("inventarioLista");
  lista.innerHTML = "<h3>Inventario actual:</h3>";

  if (inventario.length === 0) {
    lista.innerHTML += "<p>No hay productos.</p>";
    return;
  }

  inventario.forEach((p, index) => {
    lista.innerHTML += `
      <div class="producto">
        <strong>${p.nombre}</strong><br>
        Precio: $${p.precio} <br>
        Cantidad: ${p.cantidad}
        <div class="acciones">
          <button class="actualizar" onclick="actualizarProducto(${index})">Actualizar</button>
          <button onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
      </div>`;
  });
}

function actualizarProducto(index) {
  const nuevoPrecio = parseFloat(prompt("Nuevo precio:", inventario[index].precio));
  const nuevaCantidad = parseInt(prompt("Nueva cantidad:", inventario[index].cantidad));

  if (isNaN(nuevoPrecio) || isNaN(nuevaCantidad) || nuevoPrecio < 0 || nuevaCantidad < 0) {
    alert("Valores no válidos.");
    return;
  }

  inventario[index].precio = nuevoPrecio;
  inventario[index].cantidad = nuevaCantidad;
  mostrarInventario();
}

function eliminarProducto(index) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    inventario.splice(index, 1);
    mostrarInventario();
  }
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
}

