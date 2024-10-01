class Vehiculo {
    id;
    modelo;
    anoFab;
    velMax;

    setId(value) {
        if(value > 0) {
            this.id = value;
        } else {
            throw new Error("Id inválido");
        }
    }
    setModelo(value) {
        if(value != null) {
            this.modelo = value;
        } else {
            throw new Error("Modelo inválido");
        }                
    }
    setAnoFab(value) {
        if(value > 1855) {
            this.anoFab = value;
        } else {
            throw new Error("Año de Fabricación inválido");
        }                
    }
    setVelMax(value) {
        if(value > 0) {
            this.velMax = value;
        } else {
            throw new Error("Velocidad Máxima inválida");
        }
    }

    constructor(id, modelo, anoFab, velMax) {            
        this.setId(id);
        this.setModelo(modelo);
        this.setAnoFab(anoFab);
        this.setVelMax(velMax);
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default Vehiculo;