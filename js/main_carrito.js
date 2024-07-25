const dolarTarjeta = 1475; // Dólar tarjeta
const iva = 0.21; // 21% de IVA en Argentina

function renderCarrito() {
    const carrito = cargarCarritoLS();
    let contenidoHTML;

    if (carrito.length > 0) {
        contenidoHTML = `<table class="table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4" class="text-end">
                        <button class="btn btn-danger btn-sm" onclick="vaciarCarrito();">
                            Vaciar Carrito <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;

        let total = 0;

        for (const producto of carrito) {
            contenidoHTML += `<tr>
                <td><img src="images/${producto.imagen}" alt="${producto.nombre}" width="48"></td>
                <td>${producto.nombre}</td>
                <td class="text-center"><span class="text-danger">$${producto.precio.toFixed(2)} ARS</span></td>
                <td class="text-end">
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id});">
                        Eliminar <i class="bi bi-x-circle"></i>
                    </button>
                </td>
            </tr>`;
            total += producto.precio;
        }

        const totalEnARS = (total * dolarTarjeta) * (1 + iva);

        contenidoHTML += `<tr>
            <td colspan="3" class="text-end"><strong>Total</strong></td>
            <td class="text-center"><strong>$${totalEnARS.toFixed(2)} ARS</strong></td>
        </tr>
        </tbody>
        </table>
        <a href="https://steamcommunity.com" class="btn btn-primary btn-lg" target="_blank">Comprar</a>
`;
    } else {
        contenidoHTML = `<div class="alert alert-info" role="alert">Tu carrito está vacío.</div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

function eliminarProducto(id) {
    let carrito = cargarCarritoLS();
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    renderBotonCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

function cargarCarritoLS() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

renderCarrito();
renderBotonCarrito();
