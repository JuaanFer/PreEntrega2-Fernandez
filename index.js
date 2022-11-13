alert("Bienvenido a BurgerLandia")

class Plato {
    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
}
const Plato1 = new Plato(1,'Hambugesa simple',800)
const Plato2 = new Plato(2,'Hambugesa con queso',1000)
const Plato3 = new Plato(3,'Hambugesa completa',1200)
const Plato4 = new Plato(4,'Ensalada',750)

const platos = [Plato1,Plato2,Plato3,Plato4]
const pedido = []

let menu = "Menu:"

function validarPedido(resp){
    while(isNaN(resp) || resp>4){
        alert("Ingrese una opcion correcta!")
        resp = parseInt(prompt(menu))
    }
    return resp
}

function agregaCarrito(){
    for (item of platos){
        menu +=`\n ${item.id} - ${item.nombre} ---- $${item.precio}`
    }
    menu += "\n Ingrese el numero de producto que desea agregar a su pedido: "
    menu += "\n Eliga 0 para finalizar."
    let respuesta = parseInt(prompt(menu))
    
    let respuestaValida = validarPedido(respuesta)

    while(respuestaValida != 0){

        switch(respuestaValida){
            case 1: 
                pedido.push(platos[0])
                alert(`${platos[0].nombre} agregado al pedido!`)
                break;
            case 2:
                pedido.push(platos[1])
                alert(`${platos[1].nombre} agregado al pedido!`)
                break;
            case 3:
                pedido.push(platos[2])
                alert(`${platos[2].nombre} agregado al pedido!`)
                break;
            case 4:
                pedido.push(platos[3])
                alert(`${platos[3].nombre} agregado al pedido!`)
                break;
            default:
                alert('No tenemos el plato que selecionaste')
                break;
        }
        respuesta = parseInt(prompt(menu))
        respuestaValida = validarPedido(respuesta)
    }
    alert("Pedido cerrado")
    mostrarCarrito()
}
let prodPedido = 'Tu pedido: '
let precioPedido = 0 
agregaCarrito()

function mostrarCarrito(){
    for(item of pedido){
        prodPedido += `\n - ${item.nombre}`
        precioPedido += item.precio
    }
    alert(`Final Pedido: \n ${prodPedido} \n Precio final: ${precioPedido}`)
}

