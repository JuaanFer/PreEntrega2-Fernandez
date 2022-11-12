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
const Plato3 = new Plato(1,'Hambugesa completa',1200)

let eleccion = prompt('Eliga una opcion: 1-'+Plato1.nombre+" $"+Plato1.precio+' 2-'+Plato2.nombre+" $"+Plato2.precio+' 3-'+Plato3.nombre+" $"+Plato3.precio)