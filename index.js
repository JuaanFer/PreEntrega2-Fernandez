let pedido = JSON.parse(localStorage.getItem("pedido")) || []

const cargaProductos= async () =>{
    const response = await fetch("./json/platos.json")
    const platos = await response.json()
    return platos
}

cargaProductos().then(platos =>{

    const platosDiv = document.querySelector("#platosDiv")

    platos.forEach(({id,img,nombre,precio}) => {
        platosDiv.innerHTML +=`
        <div id="plato${id}" class="card prodCard">
            <div class="card-body">
                <img src="${img}" class="card-img-top imgCard" alt="">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <button id=${id} class="btn btn-dark btn-agregar">Agregar</button>
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
            totalPedido.innerText = `$${calcularTotal()}` 
        }
    });

})

const btnPedido = document.querySelector("#btnMostrarPedido")
const pedidoDiv = document.querySelector(".modal-body")

btnPedido.onclick = () =>{
    mostrarPedido()
}

function mostrarPedido(){
    
    pedidoDiv.innerHTML = ""
    pedido.forEach((item) => {
        const {id,nombre, precio, img, cantidad} = item
        pedidoDiv.innerHTML += `
        <div class="modal-contenedor">
            <div>
            <img class= "img-fluid img-carrito" src="${img}"/>
            </div>
            <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <button onclick= "eliminarPlato(${id})"class="btn btn-danger btn-eliminar">Eliminar</button>
            </div>
        </div>
        `
    })
    if(pedido.length===0){
        pedidoDiv.innerHTML = `<p>Aun no has agregado nada...</p>`
        totalPedido.innerText = ""
    }else{
        totalPedido.innerText = `$${calcularTotal()}` 
    }
    calcularTotal()
    
}

const totalPedido = document.querySelector("#totalPedido")

calcularTotal = () =>{
    const pedidoTotal = pedido.map(plato => plato.precio * plato.cantidad)
    let precioTotal = 0
    pedidoTotal.forEach(precio => {
        precioTotal += precio
    });
    return precioTotal
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
    if(pedido.length!==0){
        totalPedido.innerText = `$${calcularTotal()}` 
    }
}

const vaciarPedido = document.querySelector(".btnVaciar")
vaciarPedido.onclick = () =>{
    if(pedido.length!==0){
        pedido.length = []
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1200,
        })
        Toast.fire({
            icon: 'success',
            title: 'Pedido vaciado'
        })
    }
    mostrarPedido()
    agregarStorage()
    
    totalPedido.innerText = ""
}

function agregarStorage(){
    localStorage.setItem("pedido", JSON.stringify(pedido))
}
const btnPagar = document.querySelector("#btnPagar")
btnPagar.onclick = () =>{
    if(pedido.length===0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Aun no tienes nada en tu pedido!',
          })
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Muchas Gracias',
            text: 'Esperamos que disfrutes tu pedido',
            showConfirmButton: false,
          })
        localStorage.clear()
        setTimeout(()=>{
            location.href = "index.html"
        },3000)
           
    }
}

const invertal = setInterval(()=>{
    if(pedido.length !== 0){
        Swal.fire({
            title: 'Recuerda que tienes platos agregados a tu pedido',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else{
        clearInterval(invertal)
    }

},300000)