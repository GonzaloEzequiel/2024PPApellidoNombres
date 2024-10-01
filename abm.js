import Aereo from "./Entidades/Aereo.js";
import Terrestre from "./Entidades/Terrestre.js";

function Main(){ 

    // 4.a)
    let vehiculosString = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';
    let vehiculosArray = JSON.parse(vehiculosString);
    let vehiculos = vehiculosArray.map( (vehiculo) => {
        if(vehiculo.hasOwnProperty("altMax")){
            return new Aereo(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.altMax, vehiculo.autonomia);
        }
        else if(vehiculo.hasOwnProperty("cantPue")) {
            return new Terrestre(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.cantPue, vehiculo.cantRue);
        }
    });

    DibujarTabla(vehiculos);

    // 4.b)
    let selector = document.getElementById("sl_tipo");
    selector.addEventListener("change", () => { DibujarTabla(vehiculos); });

    // 4.c)
    let btnCalcular = document.getElementById("btn_calcular");
    btnCalcular.addEventListener("click", () => {
        let seleccion = EnviarSeleccion(vehiculos);
        let acum = seleccion.reduce( (acumulador, veh) => { return acumulador + veh.velMax; }, 0);
        let promedio = acum / seleccion.length;
        let displayPromedio = document.getElementById("txt_velmaxpromedio");
        displayPromedio.value = promedio.toFixed(2);
    });

    // 4.d)
    let btnAgregar = document.getElementById("btn_agregar");
    btnAgregar.addEventListener("click", () => { MostrarABM(vehiculos); });  
    
    document.getElementById("orden_id").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.id > b.id; }))});
    document.getElementById("orden_modelo").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.modelo > b.modelo; }))});
    document.getElementById("orden_anofab").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.anoFab > b.anoFab; }))});
    document.getElementById("orden_maxvel").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.velMax > b.velMax; }))});
    document.getElementById("orden_altmax").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.altMax > b.altMax; }))});
    document.getElementById("orden_autonomia").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.autonomia > b.autonomia; }))});
    document.getElementById("orden_cantpue").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.cantPue > b.cantPue; }))});
    document.getElementById("orden_cantrue").addEventListener("click", (e) => { e.preventDefault(); BorrarTabla(); MostrarDatos(array.sort((a,b)=>{ a.cantRue > b.cantRue; }))});
    
}


function EnviarSeleccion(array) {
    
    let auxSelector = document.getElementById("sl_tipo");
    let seleccion = array.filter( (v) => {          

        if(
            (auxSelector.value == "1" && v instanceof Aereo) ||
            (auxSelector.value == "2" && v instanceof Terrestre) ||
            (auxSelector.value == "0")
        ) {
            return true;
        }
        
    } );

    return seleccion;

}

/**
 *  Dibuja la tabla con todos los valores que recibe
 */
function DibujarTabla(array){

    let tabla = document.getElementById("tabla_cuerpo");
    let auxFila;
    let auxCelda;        
    let seleccion = EnviarSeleccion(array);
    
    BorrarTabla();

    seleccion.forEach(veh => {

        if(veh instanceof Aereo || veh instanceof Terrestre) {

            auxFila = document.createElement("tr");
            auxFila.setAttribute("idElemento", veh.id);

        // 4.d)
            auxFila.addEventListener("dblclick", (e)=> {
                let filaClickeada = e.target.parentElement;
                let idClick = filaClickeada.getAttribute("idElemento");
                let vehiculoSeleccionado = array.find(v => v.id == idClick);
                MostrarABM(array, vehiculoSeleccionado);
            });

            if(document.getElementById("chk_id").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(veh.id));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_modelo").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(veh.modelo));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_anofab").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(veh.anoFab));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_velmax").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(veh.velMax));
                auxFila.appendChild(auxCelda);
            }
            
            if(document.getElementById("chk_altmax").checked) {
                auxCelda = document.createElement("td");
                if(veh instanceof Aereo) {
                    auxCelda.appendChild(document.createTextNode(veh.altMax));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_autonomia").checked) {
                auxCelda = document.createElement("td");
                if(veh instanceof Aereo) {
                    auxCelda.appendChild(document.createTextNode(veh.autonomia));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_cantpue").checked) {
                auxCelda = document.createElement("td");
                if(veh instanceof Terrestre) {
                    auxCelda.appendChild(document.createTextNode(veh.cantPue));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_cantrue").checked) {
                auxCelda = document.createElement("td");
                if(veh instanceof Terrestre) {
                    auxCelda.appendChild(document.createTextNode(veh.cantRue));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            tabla.appendChild(auxFila);
        }
    });
}

/** 4.e)
 *  Cambia al formulario ABM ocultando el de datos
 */
function MostrarABM(array, vehiculo) {

// Controles del nuevo formulario
    let frmDatos = document.getElementById("formDatos");
    let frmABM = document.getElementById("formABM");
    frmDatos.style.display = "none";
    frmABM.style.display = "block";

    let lblAtr3 = document.getElementById("lbl_atr3");
    let lblAtr4 = document.getElementById("lbl_atr4");

    let btnAceptar = document.getElementById("btn_aceptar"); 
    let btnCancelar = document.getElementById("btn_cancelar");

    let frm_tipo = document.getElementById("frm_tipo");
    frm_tipo.addEventListener("change", (e) => {                        
        if(frm_tipo.value == "Aereo") {

            lblAtr3.textContent = "Altura Máxima: ";
            lblAtr4.textContent = "Autonomía: ";
        }
        else{

            lblAtr3.textContent = "Cantidad Puertas: ";
            lblAtr4.textContent = "Cantidad Ruedas: ";
        }
    });

    let frm_id = document.getElementById("frm_id");
    let frm_modelo = document.getElementById("frm_modelo");
    let frm_anofab = document.getElementById("frm_anofab");
    let frm_velmax = document.getElementById("frm_velmax");
    let frm_atr3 = document.getElementById("frm_atr3");
    let frm_atr4 = document.getElementById("frm_atr4");

    let form = btnAceptar.parentElement;
    console.log(form);
    console.log(btn_cancelar.parentElement);
    var btnEliminar = document.createElement("input");
    btnEliminar.type="button";
    btnEliminar.value = "Eliminar";
    form.appendChild(btnEliminar);
    btnEliminar.style.display = "none";

    let maxIDActual;
    
// Caso BAJA/MODIFICACION
    if(vehiculo instanceof Aereo || vehiculo instanceof Terrestre) {            
        
        frm_id.value = vehiculo.id;
        frm_id.disabled = true;
        frm_modelo.value = vehiculo.modelo;
        frm_anofab.value = vehiculo.anoFab;            
        frm_velmax.value = vehiculo.velMax;
        frm_tipo.disabled = true;

        if(vehiculo instanceof Aereo) {
            frm_tipo.value = "Aereo";
            frm_atr3.value = vehiculo.altMax;
            frm_atr4.value = vehiculo.autonomia;
        }
        else if(vehiculo instanceof Terrestre) {
            frm_tipo.value = "Terrestre";
            frm_atr3.value = vehiculo.cantPue;
            frm_atr4.value = vehiculo.cantRue;
        }
        
        btnAceptar.value="Modificar";
        btnEliminar.style.display="inline";

        btnAceptar.addEventListener("click", () => {

            try {
                vehiculo.setModelo(frm_modelo.value);
                vehiculo.setAnoFab(frm_anofab.value);
                vehiculo.setVelMax(frm_velmax.value);
                if(vehiculo instanceof Aereo) {
                    vehiculo.setAltMax(frm_atr3.value);
                    vehiculo.setAutonomia(frm_atr4.value);
                }
                else if(vehiculo instanceof Terrestre) {
                    vehiculo.setCantPue(frm_atr3.value);
                    vehiculo.setCantRue(frm_atr4.value);
                }
            }catch(error) {
                alert(error);
            }finally {
                if(btnEliminar)
                    form.removeChild(btnEliminar);
                MostrarDatos(array); 
            } 
        });

        btnEliminar.addEventListener("click", (e)=>{
            e.preventDefault();
            let indice = array.findIndex( v => v.id == frm_id.value);
            array.splice(indice, 1);
            form.removeChild(btnEliminar);
            MostrarDatos(array);
        });

        btnCancelar.addEventListener("click", (e)=>{
            e.preventDefault();
            form.removeChild(btnEliminar);
            MostrarDatos(array);                
        });
        
    }
// CASO ALTA
    else
    {
        let auxVehiculo;

        frm_id.disabled = true;
        frm_tipo.disabled = false;
        btnAceptar.value = "Aceptar";

        maxIDActual = array.reduce((maxID, p) => { let retorno = p.id > maxID ? p.id : maxID; return retorno; }, 0);
        frm_id.value = parseInt(maxIDActual) + 1;
        
        frm_modelo.value = null;
        frm_anofab.value = null;
        frm_velmax.value = null;            
        frm_atr3.value = null;
        frm_atr4.value = null;            

        btnAceptar.addEventListener("click", (e) => {

            e.preventDefault();

            let length = array.length;

            if(frm_tipo.value == "Aereo")
            {
                try {
                    auxVehiculo = new Aereo(frm_id.value, frm_modelo.value, frm_anofab.value, frm_velmax.value, frm_atr3.value, frm_atr4.value);
                    array.push(auxVehiculo);
                }
                catch(error) {
                    alert(error);
                }
                
            }
            else if((frm_tipo.value=="Terrestre"))
            {
                try {
                    auxVehiculo = new Terrestre(frm_id.value, frm_modelo.value, frm_anofab.value, frm_velmax.value, frm_atr3.value, frm_atr4.value);
                    array.push(auxVehiculo);
                }
                catch(error) {
                    alert(error);
                }                   
            }

            if(array.length > length) {
                MostrarDatos(array);
            }
        });   
        
        btnCancelar.addEventListener("click", (e)=>{
            e.preventDefault();
            MostrarDatos(array);
        });            
    }        

}

function BorrarTabla() {
    let tabla = document.getElementById("tabla_cuerpo");
    while(tabla.hasChildNodes()) {
        tabla.removeChild(tabla.lastChild);
    }
}

function MostrarDatos(array) {

    let frmDatos = document.getElementById("formDatos");
    let frmABM = document.getElementById("formABM");

    frmABM.style.display = "none";
    frmDatos.style.display = "block";

    BorrarTabla();
    DibujarTabla(array);
}



window.addEventListener("load", Main);