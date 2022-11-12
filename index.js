const presentismo=5000
const hsVendedor=400
const hsDeposito=350
const hsAdmin=380

alert("Bienvenido a su asistente de liquidacion de sueldos")
let cont = parseInt(prompt('Ingrese la cantidad de sueldos a liquidar: '))

class Trabajador {
    constructor(nombre, apellido, hsTrab, sector) {
        this.nombre = nombre
        this.apellido = apellido
        this.hsTrab = hsTrab
        this.sector = sector
    }
    sueldo(present,bono){
        let total
        if(this.sector===1){
            total= this.hsTrab*hsVendedor
            if(present===1){
                total+=presentismo
            }
            if(bono===1){
                total+=total/2
            }
        }else if(this.sector===2){
            total= this.hsTrab*hsDeposito
            if(present===1){
                total+=presentismo
            }
            if(bono===1){
                total+=total/2
            }
        }else if(this.sector===3){
            total= this.hsTrab*hsAdmin
            if(present===1){
                total+=presentismo
            }
            if(bono===1){
                total+=total/2
            }
        }
        return total
    }
}
const trabajador1 = new Trabajador("Luis","Scarpatti",20,1)
