import Vehiculo from "./Vehiculo.js";

class Aereo extends Vehiculo {
    altMax;
    autonomia;

    setAltMax(value) {
        if(value > 0) {
            this.altMax = value;            
        } else {
            throw new Error("Altura Máxima inválida");
        }               
            
    }
    setAutonomia(value) {
        if(value > 0) {
            this.autonomia = value;
        } else {
            throw new Error("Autonomía inválida");
        }
    }

    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);
        this.setAltMax(altMax);
        this.setAutonomia(autonomia);
    }

    toString() {
        super.toString()+JSON.stringify(this);
    }
}

export default Aereo;