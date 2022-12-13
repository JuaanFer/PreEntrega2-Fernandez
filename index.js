class Plato {
    constructor(id, nombre, precio,imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}
const Plato1 = new Plato(1,'Hambugesa simple',800,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFMxYwZ2y1umes0CPDj7adLxZ7Puah3smfQ&usqp=CAU")
const Plato2 = new Plato(2,'Hambugesa con queso',1000,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwowx19GutwgVwPnIbND0SS8BOhu0vyCxuaw&usqp=CAU")
const Plato3 = new Plato(3,'Hambugesa completa',1200,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0ImJB1JBxk0MtZqniJjJbHBgeP3_nalOTQ&usqp=CAU")
const Plato4 = new Plato(4,'Ensalada',750,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwC9T0wgEqqcpO7WSFPn7sfMZSCd-QJGMJmQ&usqp=CAU")

const platos = [Plato1,Plato2,Plato3,Plato4]
let pedido = JSON.parse(localStorage.getItem("pedido")) || []

const platosDiv = document.querySelector("#platosDiv")

platos.forEach((plato) => {
    platosDiv.innerHTML +=`
    <div id="plato${plato.id}" class="card prodCard">
        <div class="card-body">
            <img src="${plato.imagen}" class="card-img-top" alt="">
            <h5 class="card-title">${plato.nombre}</h5>
            <p class="card-text">$${plato.precio}</p>
            <button id=${plato.id} class="btn btn-dark btn-agregar">Agregar</button>
        </div>
    </div>
    `
})

const btnAgregar = document.querySelectorAll(".btn-agregar")

btnAgregar.forEach(boton => {
    boton.onclick = () =>{
        const platoSelect = platos.find(plato =>plato.id === parseInt(boton.id))
        
        const platoCarrito = {...platoSelect,cantidad:1}

        const indexCarrito = pedido.findIndex(plato => plato.id === platoCarrito.id)

        indexCarrito === -1 ? pedido.push(platoCarrito) : pedido[indexCarrito].cantidad++
        
        agregarStorage()

        Toastify({
            text: "Agregado al pedido",
            duration: 1500,
            gravity: "bottom",
            stopOnFocus: false,
            style: {
                background: "green"
            },
            avatar: "https://cdn.icon-icons.com/icons2/1555/PNG/96/fast-food-icons-freeburger_107425.png"
        }).showToast()
    }
});

const btnPedido = document.querySelector("#btnMostrarPedido")
const pedidoDiv = document.querySelector(".modal-body")

btnPedido.onclick = () =>{
    mostrarPedido()
}

function mostrarPedido(){
    
    pedidoDiv.innerHTML = ""
    pedido.forEach((item) => {
        const {id,nombre, precio, imagen} = item
        pedidoDiv.innerHTML += `
         <div class="modal-contenedor">
            <div>
            <img class= "img-fluid img-carrito" src="${imagen}"/>
            </div>
            <div>
           <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
           <button onclick="eliminarPlato(${id})" class= "btn btn-danger btn-eliminar">Eliminar</button>
           </div>
         </div>
        `
    })
    if(pedido.length===0){
        pedidoDiv.innerHTML = `<p>Aun no has agregado nada...</p>`
    }
}

function eliminarPlato(id){
    const platoId = id
    pedido = pedido.filter((plato) => plato.id !== platoId)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
    })
      
    Toast.fire({
        icon: 'success',
        title: 'Plato eliminado'
    })
    mostrarPedido()
    agregarStorage()
}

function agregarStorage(){
    localStorage.setItem("pedido", JSON.stringify(pedido))
}

const finalizarPedido = document.querySelector("#finalizar")
finalizarPedido.onclick = () =>{
    const pedidoTotal = pedido.map(plato => plato.precio * plato.cantidad)
    let precioTotal = 0
    pedidoTotal.forEach(precio => {
        precioTotal += precio
    });
    console.log(pedido)
    console.log(precioTotal)
}