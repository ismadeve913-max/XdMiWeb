// Obtiene el elemento de la pantalla de carga
const pantallaCarga = document.getElementById('cargando');

// Obtiene el elemento del contenido principal
const contenidoPrincipal = document.getElementById('contenido');

// Establece un temporizador de 10 segundos (10000 milisegundos)
setTimeout(() => {
  // Después de 10 segundos, oculta la pantalla de carga
  pantallaCarga.style.display = 'none';
  
  // Y muestra el contenido principal
  contenidoPrincipal.style.display = 'block';
}, 10000);
