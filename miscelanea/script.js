const inventario = [];

document.getElementById("productoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseInt(document.getElementById("precio").value);
  const tipo = document.getElementById("tipo").value;

  const productoExistente = inventario.find(p => p.nombre === nombre);

  if (productoExistente) {
    if (tipo === "ingreso") {
      productoExistente.cantidad += cantidad;
    } else if (tipo === "salida") {
      productoExistente.cantidad -= cantidad;
    }
    productoExistente.precio = precio;
    productoExistente.tipo = tipo;
  } else {
    inventario.push({ nombre, cantidad, precio, tipo });
  }

  actualizarTabla();
  e.target.reset();
});

function actualizarTabla() {
  const tabla = document.getElementById("tablaInventario");
  tabla.innerHTML = "";
  inventario.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.tipo}</td>
      <td>$${producto.precio.toLocaleString("es-CO")}</td>
      <td>$${(producto.cantidad * producto.precio).toLocaleString("es-CO")}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Validación del formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreContacto").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;
  const resultado = document.getElementById("resultado");

  if (mensaje.length < 10) {
    resultado.innerHTML = `<div class="alert alert-danger">El mensaje debe tener al menos 10 caracteres.</div>`;
  } else {
    resultado.innerHTML = `<div class="alert alert-success">Gracias ${nombre}, tu mensaje fue enviado correctamente.</div>`;
    e.target.reset();
  }
});
