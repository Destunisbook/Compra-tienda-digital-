/* CONFIGURACIÓN RÁPIDA: cambia estos datos para cada comerciante. */
const STORE = {
  name: "Vitrina Local",
  whatsapp: "525632553113", // Reemplaza por el número del negocio, con código de país. México: 52 + número.
  currency: "MXN",
  locale: "es-MX"
};
const products = [
 {id:1,name:"Tenis urbanos",category:"Moda",price:899,emoji:"👟",description:"Estilo cómodo para todos los días."},
 {id:2,name:"Sudadera clásica",category:"Moda",price:499,emoji:"🧥",description:"Una prenda versátil para combinar."},
 {id:3,name:"Smartphone 128 GB",category:"Tecnología",price:3999,emoji:"📱",description:"Ejemplo de equipo para uso diario."},
 {id:4,name:"Audífonos inalámbricos",category:"Tecnología",price:649,emoji:"🎧",description:"Disfruta tu música donde quieras."},
 {id:5,name:"Cuarzo amatista",category:"Minerales",price:450,emoji:"🔮",description:"Pieza decorativa de muestra."},
 {id:6,name:"Planta decorativa",category:"Hogar",price:280,emoji:"🪴",description:"Un toque natural para tus espacios."},
 {id:7,name:"Perfume elegante",category:"Belleza",price:799,emoji:"🧴",description:"Fragancia de ejemplo para catálogo."},
 {id:8,name:"Bolsa de mano",category:"Accesorios",price:590,emoji:"👜",description:"Diseño práctico para salir."},
 {id:9,name:"Reloj moderno",category:"Accesorios",price:950,emoji:"⌚",description:"Complemento elegante para tu estilo."},
 {id:10,name:"Taza artesanal",category:"Hogar",price:180,emoji:"☕",description:"Ideal para disfrutar tu bebida favorita."},
 {id:11,name:"Control gamer",category:"Tecnología",price:750,emoji:"🎮",description:"Accesorio de ejemplo para videojuegos."},
 {id:12,name:"Lentes de sol",category:"Moda",price:350,emoji:"🕶️",description:"Un clásico para completar tu look."}
];
const money = n => new Intl.NumberFormat(STORE.locale,{style:"currency",currency:STORE.currency,maximumFractionDigits:0}).format(n);
const wa = text => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
document.title = `${STORE.name} | Compra tu tienda digital`;
document.getElementById("brandName").textContent = STORE.name;
document.getElementById("footerBrand").textContent = STORE.name;
document.getElementById("customizeWhatsApp").href = wa("Hola, quiero información para tener mi propio catálogo digital.");
let category = "Todos";
let cart = {};
const grid = document.getElementById("productGrid");
const search = document.getElementById("search");
const categoryNav = document.getElementById("categories");
const cartPanel = document.getElementById("cartPanel");
const backdrop = document.getElementById("cartBackdrop");
function renderCategories(){
 const categories = ["Todos",...new Set(products.map(p=>p.category))];
 categoryNav.innerHTML = categories.map(c=>`<button class="category ${c===category?"active":""}" data-category="${c}">${c}</button>`).join("");
 categoryNav.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{category=b.dataset.category;renderCategories();renderProducts()}));
}
function renderProducts(){
 const term=search.value.trim().toLocaleLowerCase("es-MX");
 const shown=products.filter(p=>(category==="Todos"||p.category===category)&&`${p.name} ${p.category} ${p.description}`.toLocaleLowerCase("es-MX").includes(term));
 grid.innerHTML=shown.map(p=>`<article class="product-card">
 <div class="product-art" aria-hidden="true">${p.emoji}</div>
 <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p>
 <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">＋ Agregar</button></div></div>
 <a class="whats-product" href="${wa(`Hola, me interesa ${p.name} (${money(p.price)}). ¿Me das más información?`)}" target="_blank" rel="noopener">Consultar por WhatsApp ↗</a></article>`).join("");
 document.getElementById("noResults").hidden=shown.length!==0;
 grid.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>{const id=Number(b.dataset.add);cart[id]=(cart[id]||0)+1;renderCart();toast("Producto agregado al carrito")}));
}
function renderCart(){
 const entries=Object.entries(cart).filter(([,q])=>q>0);
 document.getElementById("cartCount").textContent=entries.reduce((s,[,q])=>s+q,0);
 document.getElementById("cartItems").innerHTML=entries.length?entries.map(([id,q])=>{const p=products.find(x=>x.id===Number(id));return `<div class="cart-row"><span class="cart-emoji">${p.emoji}</span><div><strong>${p.name}</strong><small>${money(p.price)} · ${money(p.price*q)}</small></div><div class="qty"><button data-change="${id}" data-delta="-1" aria-label="Quitar uno">−</button><span>${q}</span><button data-change="${id}" data-delta="1" aria-label="Agregar uno">+</button></div></div>`}).join(""):'<p class="no-results">Tu carrito está vacío. Agrega algún producto para empezar.</p>';
 const total=entries.reduce((s,[id,q])=>s+products.find(p=>p.id===Number(id)).price*q,0);
 document.getElementById("cartTotal").textContent=money(total);
 document.querySelectorAll("[data-change]").forEach(b=>b.addEventListener("click",()=>{const id=Number(b.dataset.change);cart[id]=(cart[id]||0)+Number(b.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart()}));
}
function openCart(){cartPanel.classList.add("open");cartPanel.setAttribute("aria-hidden","false");backdrop.hidden=false}
function closeCart(){cartPanel.classList.remove("open");cartPanel.setAttribute("aria-hidden","true");backdrop.hidden=true}
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
backdrop.addEventListener("click",closeCart);
search.addEventListener("input",renderProducts);
document.getElementById("whatsappOrder").addEventListener("click",()=>{
 const entries=Object.entries(cart).filter(([,q])=>q>0);
 if(!entries.length){toast("Agrega productos antes de consultar");return}
 const lines=entries.map(([id,q])=>{const p=products.find(x=>x.id===Number(id));return `• ${p.name} x${q}: ${money(p.price*q)}`});
 const total=entries.reduce((s,[id,q])=>s+products.find(p=>p.id===Number(id)).price*q,0);
 window.open(wa(`Hola, me interesa consultar este pedido de ${STORE.name}:\n${lines.join("\n")}\nTotal estimado: ${money(total)}\n¿Me confirmas disponibilidad?`),"_blank","noopener");
});
let toastTimer;
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),1900)}
renderCategories();renderProducts();renderCart();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
