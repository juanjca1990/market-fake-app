const url = "https://fakestoreapi.com/products"; //traigo la api de la pag de compras
const contenedorProductos = document.querySelector("#container-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const menuMobile = document.querySelector(".menu__mobile");
const menuAside = document.querySelector(".menu__aside");
const botonCerrar = document.querySelector(".button-close");
let botonesAgregar = document.querySelectorAll(".boton-añadir"); //se modificaran mas adelante por eso los pongo con let
const numeroCartDesktop = document.querySelector(".number-cart-desktop");
const numeroCartMobile = document.querySelector(".number-cart-mobile");


const arr =[]; //arreglo conde contendre las peticiones de la api para realizar busquedas luego por categoria


let productosCarrito;//arreglo donde se agregaran los elementos a mostrar en carrito
let productosLocalStorage = localStorage.getItem("carrito-cargado"); //arreglo para traer elementos si existen del local Storage
if(productosLocalStorage){ //si esta cargado lo vuelvo a cargar
    productosCarrito = JSON.parse(productosLocalStorage);
    actualizarNumeroCart(); //y actualizo los contadores de productos
}
else{ //sino lo dejo en vacio
    productosCarrito=[]; 
}
 

// genera un arerglo de botones categorias si es que el usuario selecciona categoria .. o manda a cargar todos los elementos del arreglo
botonesCategorias.forEach(boton =>{
    boton.addEventListener("click",(ev)=> {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        ev.currentTarget.classList.add("active");
        if(ev.currentTarget.id != "all"){ //si es diferente a todos los productos
            const productosBoton = arr.filter(producto => producto.category == ev.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else{//si es igual a todos los productos
            cargarProductos(arr);
        }
      
    });
});

//carga los productos seleccionados por el usuario mediante botones de categorias
function cargarProductos(productos){

    contenedorProductos.innerHTML = ""; //vacio todo el listado de productos para que no se repitan
    productos.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="main-container__item" src="${element.image}" alt="" >
            <p class="precio-producto">${element.price}</p>
            <p class="descripcion-producto"> ${element.description}</p>
            <button class="boton-añadir" id="${element.id}">añadir al carrito</button>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAñadir(); //actualizo botones de añadir productos ventas
}

menuMobile.addEventListener("click" ,(ev)=>{
    menuAside.classList.remove("noVisible");
});

botonCerrar.addEventListener("click" , (ev)=>{
    menuAside.classList.add("noVisible");
}); 


fetch(url) //realizo peticion a la api
    .then( (response) => response.json() )
    .then( (productos) => agregar(productos))

//agrego la lista a un arreglo para despues realizar las busquedas por categorias
function agregar(prod){
    prod.forEach(element => {
        arr.push(element);
    })
    cargarProductos(prod)
}
    


//actualizo los botones añadir de producto para comprobar si se actualiza la lista de compra
function actualizarBotonesAñadir(){
    botonesAgregar = document.querySelectorAll(".boton-añadir");
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click",agregarCarrito);
    });
}

//agrego el producto mediante el id del boton añadir y verifico si existe o no ya en el arreglo de carrito
function agregarCarrito(e){
     const idBoton = e.currentTarget.id;
     const productoAgregar = arr.find(producto => producto.id == idBoton);

     if(productosCarrito.some(producto => producto.id == idBoton)){ //busco si el elemento a agregar ya existe en el arreglo
        const index = productosCarrito.findIndex(producto => producto.id == idBoton);
        productosCarrito[index].cantidad++; //si existe le sumo 1 cantidad mas
    }
    else{//si es la primera vez le pongo 1
        productoAgregar.cantidad = 1;
        productosCarrito.push(productoAgregar);
    }
    actualizarNumeroCart();  

    localStorage.setItem("carrito-cargado",JSON.stringify(productosCarrito)); // guardo en el localStorage un arreglo con los productos cargados de carrito
}

//cuento cuantos productos existen tomando en cuenta la cantidad repetida
function actualizarNumeroCart(){
    let number = productosCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numeroCartDesktop.innerHTML = number;
    numeroCartMobile.innerHTML = number;
}




