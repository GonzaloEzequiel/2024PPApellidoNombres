import Vehiculo from "./Vehiculo.js"

class Terrestre extends Vehiculo {
    cantPue;
    cantRue;

    setCantPue(value) {
        if(value > -1) {
            this.cantPue = value;
        } else {
            throw new Error("Cantidad de Puertas inválida");
        }
    }

    setCantRue(value) {
        if(value > 0) {
            this.cantRue = value;
        } else {
            throw new Error("Cantidad de Ruedas inválida");
        }
    }

    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        super(id, modelo, anoFab, velMax);
        this.setCantPue(cantPue);
        this.setCantRue(cantRue);
    }

    toString() {
        super.toString()+JSON.stringify(this);
    }
}

export default Terrestre;