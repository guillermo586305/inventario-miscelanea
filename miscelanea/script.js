const inventario = {};

function registrarProducto(event) {
  event.preventDefault(); // prevenir recarga

  const nombre = document.getElementById('nombre').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);
  const tipo = document.getElementById('tipo').value;

  if (!nombre || isNaN(cantidad) || cantidad <= 0 || isNaN(precio) || precio <= 0) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  if (!inventario[nombre]) {
    inventario[nombre] = { cantidad: 0, precio: precio };
  }

  if (tipo === 'ingreso') {
    inventario[nombre].cantidad += cantidad;
    inventario[nombre].precio = precio; // actualiza el precio
  } else if (tipo === 'salida') {
    if (inventario[nombre].cantidad < cantidad) {
      alert('No hay suficiente inventario para esta salida.');
      return;
    }
    inventario[nombre].cantidad -= cantidad;
  }

  document.getElementById('productoForm').reset();
  actualizarTabla(nombre, tipo, cantidad, precio);
}

function actualizarTabla(nombre, tipo, cantidadMovida, precioActual) {
  const tabla = document.getElementById('tablaInventario');
  const { cantidad, precio } = inventario[nombre];
  const valorTotal = cantidad * precio;

  let filaExistente = document.querySelector(`tr[data-producto="${nombre}"]`);

  const formatoPesos = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const filaHTML = `
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${tipo}</td>
    <td>${formatoPesos.format(precio)}</td>
    <td>${formatoPesos.format(valorTotal)}</td>
  `;

  if (filaExistente) {
    filaExistente.innerHTML = filaHTML;
  } else {
    const fila = document.createElement('tr');
    fila.setAttribute('data-producto', nombre);
    fila.innerHTML = filaHTML;
    tabla.appendChild(fila);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("productoForm").addEventListener("submit", registrarProducto);
});
