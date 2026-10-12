# DESTUNIS — catálogo digital de demostración

## Incluye
- `index.html`: catálogo, búsqueda, categorías, carrito de consulta y botones de WhatsApp.
- `manifest.webmanifest`: nombre e instalación PWA configurados como DESTUNIS.
- `sw.js`: caché básica para uso sin conexión tras la primera visita.
- `icons/`: iconos SVG negros y dorados con la marca DESTUNIS.

## Configurar WhatsApp
En `index.html`, busca `const CONFIG` y cambia `whatsapp: "521234567890"` por el número real con código de país, solo dígitos. El número incluido es ficticio.

## Editar productos
En `index.html`, edita el arreglo `products`: nombre, categoría, precio, emoji, descripción y etiqueta.

## Publicar en GitHub Pages
1. Sube todos los archivos y la carpeta `icons` al repositorio.
2. Abre Settings → Pages.
3. Selecciona la rama principal y la carpeta raíz (`/root`).
4. Espera el despliegue. La instalación PWA requiere HTTPS; GitHub Pages lo ofrece.

Los productos y precios son ilustrativos. No se procesan pagos reales; WhatsApp requiere conexión a internet.
