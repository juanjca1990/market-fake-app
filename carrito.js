

const carrito = JSON.parse(localStorage.getItem("carrito-cargado"));//cargo con el localStorage que viene de la pag anterior
const carritoVacio = document.querySelector(".text-carrito-vacio");
const vaciarTotal = document.querySelector(".vaciar-total");
const contenedorCarrito = document.querySelector(".container-carrito");
const totalCompra = document.querySelector(".item-compra");
let botonesEliminar = document.querySelectorAll(".icono-eliminar"); //se modificaran mas adelante
const botonVaciar = document.querySelector(".boton-vaciar");
const opcionVaciarMobile = document.querySelector("#vaciar");
const botonVenta = document.querySelector(".boton-venta");

const menuMobile = document.querySelector(".menu__mobile");
const menuAside = document.querySelector(".menu__aside");
const botonCerrar = document.querySelector(".button-close");


cargarCarrito(); // cargo si es que tengo elementos en el arreglo de carrito

//vacio el arreglo de carrito completamente en la version desktop
botonVaciar.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
    carrito.length = 0;
    localStorage.setItem("carrito-cargado", JSON.stringify(carrito));
    cargarCarrito();
}

//muestra un mensaje al usuario por la compra
botonVenta.addEventListener("click", venta);
function venta(){
    window.alert("Gracias por su compra");
    vaciarCarrito();
}

//vacia el arreglo de carrito en la version mobile
opcionVaciarMobile.addEventListener("click", vaciarCarrito);

//abre el menu aside mediante el boton de desplegar
menuMobile.addEventListener("click" ,()=>{
    menuAside.classList.remove("noVisible");
});

//cierra el aside mediante el simbolo de "x"
botonCerrar.addEventListener("click" , ()=>{
    menuAside.classList.add("noVisible");
}); 
 

// carga todos los elementos del arreglo carrito 
function cargarCarrito(){
    if(carrito.length > 0){ // controlo que el carrito este creado pero que no tenga elementos a mostrar en la pag carrito
        contenedorCarrito.innerHTML = ""; // limpio la pantalla para que no se repitan elementos
        carritoVacio.classList.add("noVisible");
        let total =0;
        carrito.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("container-carrito");
            let sumar = (element.price * element.cantidad);
            total +=sumar;
            div.innerHTML = `
            <div class="detalle-compra">
                <div class="detalle-compra-item">
                    <div class="detalle-producto">
                        <li><small>producto</small></li>
                        <img class="img-carrito" src="${element.image}" alt="">
                    
                    </div>
                    <div class="detalle-cantidad">
                        <li><small>Cantidad</small></li>
                        <li class="item-compra">${element.cantidad}</li>
                    </div>
                    <div class="detalle-precio">
                        <li><small>Precio Unitario</small></li>
                        <li class="item-compra">${element.price}</li>
                    </div>
                    <div class="detalle-total">
                        <li><small>Total</small></li>
                        <li class="item-compra">${sumar}</li>
                    </div>
                    <i class="bi bi-trash icono icono-eliminar item-compra" id="${element.id}"></i>    
                </div> 
            </div>
                `
            contenedorCarrito.append(div);
        })
    
        totalCompra.innerHTML = total;
        
        
    }
    else{ //si carrito esta vacio muestro mensajes y oculto elementos
        contenedorCarrito.innerHTML = "";
        vaciarTotal.classList.add("noVisible");
        totalCompra.classList.add("noVisible");
        carritoVacio.classList.remove("noVisible");
    }
    actualizarBotonesEliminar();//actualizo botones añadidos
}



//actualizo los botones eliminar de carrito para comprobar si se actualiza la lista de compra
function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".icono-eliminar");
    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click",eliminarDeCarrito);
    });
}
//elimino un producto de carrito seleccionado mediante la imagen de "eliminar"
function eliminarDeCarrito(e){
    const idBoton = e.currentTarget.id;
    const valor = carrito.findIndex(producto => producto.id == idBoton);
    if(carrito[valor].cantidad > 1){
        carrito[valor].cantidad = carrito[valor].cantidad -1;
    }
    else{
        carrito.splice(valor,1);
    }
    cargarCarrito();
    localStorage.setItem("carrito-cargado",JSON.stringify(carrito));//guardo en el localStorage para volver a cargar despues actualizado
}

