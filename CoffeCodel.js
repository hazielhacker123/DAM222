let listaPedidos = [];
let totalAcumulado = 0;

const formularioPedido = document.getElementById("formularioPedido");
const tablaPedidos = document.getElementById("tablaPedidos");
const totalAcumuladoHTML = document.getElementById("totalAcumulado");
const btnLimpiar = document.getElementById("btnLimpiar");

formularioPedido.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const cantidad = Number(document.getElementById("cantidad").value);

    if (producto === "" || precio <= 0 || cantidad <= 0) {
        alert("Completa los campos con datos válidos.");
        return;
    }

    agregarPedido(producto, precio, cantidad);

    formularioPedido.reset();
    document.getElementById("producto").focus();
});

function agregarPedido(producto, precio, cantidad) {
    const subtotal = precio * cantidad;

    const pedido = {
        producto: producto,
        precio: precio,
        cantidad: cantidad,
        subtotal: subtotal
    };

    listaPedidos.push(pedido);
    totalAcumulado += subtotal;

    mostrarPedidos();
}

function mostrarPedidos() {
    tablaPedidos.innerHTML = "";

    if (listaPedidos.length === 0) {
        tablaPedidos.innerHTML = `
            <tr>
                <td colspan="5" class="mensaje-vacio">
                    No hay pedidos registrados
                </td>
            </tr>
        `;

        totalAcumuladoHTML.textContent = "0.00";
        return;
    }

    listaPedidos.forEach(function(pedido, indice) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${pedido.producto}</td>
            <td>$${pedido.precio.toFixed(2)}</td>
            <td>${pedido.cantidad}</td>
            <td>$${pedido.subtotal.toFixed(2)}</td>
            <td>
                <button
                    class="btn-eliminar"
                    onclick="eliminarPedido(${indice})"
                >
                    Eliminar
                </button>
            </td>
        `;

        tablaPedidos.appendChild(fila);
    });

    totalAcumuladoHTML.textContent = totalAcumulado.toFixed(2);
}

function eliminarPedido(indice) {
    totalAcumulado -= listaPedidos[indice].subtotal;
    listaPedidos.splice(indice, 1);

    mostrarPedidos();
}

btnLimpiar.addEventListener("click", function() {
    if (listaPedidos.length === 0) {
        alert("No hay pedidos para eliminar.");
        return;
    }

    const confirmar = confirm(
        "¿Seguro que deseas eliminar todos los pedidos?"
    );

    if (confirmar) {
        listaPedidos = [];
        totalAcumulado = 0;

        mostrarPedidos();
    }
});