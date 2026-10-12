COMPRA TU TIENDA DIGITAL — CATÁLOGO DEMO
========================================

ARCHIVOS
- index.html: página principal
- styles.css: diseño negro y dorado adaptable a móvil
- app.js: productos, búsqueda, categorías, carrito y WhatsApp
- manifest.webmanifest: configuración PWA
- service-worker.js: caché para uso sin conexión después de la primera visita
- icon.svg: icono de la tienda

ANTES DE PUBLICAR
1. Abre app.js.
2. Al principio encontrarás STORE:
   name: nombre del negocio
   whatsapp: número con código de país, solo números (México: 52 + número)
3. Cambia los productos en el arreglo `products` (nombre, categoría, precio, emoji y descripción).
4. El número de WhatsApp de ejemplo NO es real: reemplázalo por el del comerciante.
5. Cambia el nombre en index.html si quieres personalizar los textos.

PUBLICAR EN GITHUB PAGES
1. Crea un repositorio en GitHub.
2. Sube TODOS los archivos conservando sus nombres y estructura.
3. En Settings > Pages, elige Deploy from a branch, selecciona main y / (root), y guarda.
4. Espera a que termine el despliegue y abre la URL publicada.

INSTALACIÓN COMO APP
La PWA necesita HTTPS (GitHub Pages lo ofrece). Abre la URL publicada en Chrome Android y usa el menú ⋮ > Instalar aplicación o Añadir a pantalla de inicio.
El modo sin conexión guarda archivos básicos después de la primera visita. WhatsApp requiere conexión.

NOTAS
- Es una plantilla de demostración; productos, precios y descripciones son ejemplos.
- El carrito calcula un total estimado, pero NO procesa pagos ni confirma inventario.
- La página no incluye panel de administración: para editar productos, modifica app.js.
- Las imágenes están representadas con emojis para que el demo funcione sin servicios externos.
