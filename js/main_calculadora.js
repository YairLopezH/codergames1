function calcularPrecio() {
  const dolarTarjeta = 1475; // Dólar tarjeta
  const iva = 0.21; // 21% de IVA en Argentina

  const precioUSD = parseFloat(document.getElementById('precioUSD').value);
  const resultado = document.getElementById('resultado');

  if (isNaN(precioUSD) || precioUSD <= 0) {
      resultado.innerHTML = '<div class="alert alert-danger" role="alert">Por favor, ingrese un valor numérico válido mayor que cero.</div>';
      return;
  }

  const precioEnARS = (precioUSD * dolarTarjeta) * (1 + iva);

  //resultado
  resultado.innerHTML = `<div class="alert alert-success text-light" role="alert">El precio en ARS incluyendo impuestos es: $${precioEnARS.toFixed(2)}</div>`;
}

document.addEventListener("DOMContentLoaded", function() {
  const calcularBtn = document.getElementById('calcularBtn');
  calcularBtn.addEventListener('click', calcularPrecio); 
});
