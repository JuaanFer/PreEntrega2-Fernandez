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
const pedido = JSON.parse(localStorage.getItem("pedido")) || []

const platosDiv = document.querySelector("#platosDiv")

platos.forEach(plato => {
    platosDiv.innerHTML +=`
    <div id="plato${plato.id}" class="card prodCard">
        <div class="card-body">
            <img src="${plato.imagen}" class="card-img-top" alt="">
            <h5 class="card-title">${plato.nombre}</h5>
            <p class="card-text">$${plato.precio}</p>
            <button id=${plato.id} class="btn btn-dark">Agregar</button>
        </div>
    </div>
    `
})

const btnAgregar = document.querySelectorAll(".btn-dark")

btnAgregar.forEach(boton => {
    boton.onclick = () =>{
        const platoSelect = platos.find(plato =>plato.id === parseInt(boton.id))
        
        const platoCarrito = {...platoSelect,cantidad:1}

        const indexCarrito = pedido.findIndex(plato => plato.id === platoCarrito.id)
        if(indexCarrito === -1){
            pedido.push(platoCarrito)
        }else{
            pedido[indexCarrito].cantidad += 1
        }
        localStorage.setItem("pedido",JSON.stringify(pedido))
    }
});

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
