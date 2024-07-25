const productos = [
    {id: 1, nombre: "The Witcher 3: Wild Hunt", descripcion: "RPG de acción y aventuras.", precio: 39.99, imagen: "juego1.webp", categoria: "rpg"},
    {id: 2, nombre: "Cyberpunk 2077", descripcion: "RPG de mundo abierto en una futurista megalópolis.", precio: 59.99, imagen: "juego2.webp", categoria: "rpg"},
    {id: 3, nombre: "Red Dead Redemption 2", descripcion: "Aventura épica en el viejo oeste.", precio: 49.99, imagen: "juego3.webp", categoria: "aventura"},
    {id: 4, nombre: "Doom Eternal", descripcion: "FPS con acción frenética.", precio: 29.99, imagen: "juego4.webp", categoria: "fps"},
    {id: 5, nombre: "Resident Evil Village", descripcion: "Survival horror en una aldea siniestra.", precio: 59.99, imagen: "juego5.webp", categoria: "horror"}
];

function renderProductos() {
    let contenidoHTML = "";

    for (const producto of productos) {
        contenidoHTML += `<div class="col-md-3">
            <div class="card border-0">
                <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <p class="card-text">${producto.nombre}<br><span class="text-danger">$${producto.precio.toFixed(2)} USD</span></p>
                    <button class="btn btn-primary" onclick="agregarProducto(${producto.id});">Añadir al carrito</button>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

function agregarProducto(id) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
        const carrito = cargarCarritoLS();
        carrito.push(producto);
        guardarCarritoLS(carrito);
        renderBotonCarrito();
        console.log("El producto #" + id + " se ha agregado correctamente!");
    }
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderBotonCarrito() {
    const total = totalProductos();
    document.getElementById("totalCarrito").innerText = total;
}

function totalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.length;
}


document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("contenido")) {
        renderProductos();
    }
    if (document.getElementById("totalCarrito")) {
        renderBotonCarrito();
    }
});
