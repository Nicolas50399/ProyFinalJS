const suplentes = [];
const titulares = [];
let clubConfirmado = JSON.parse(localStorage.getItem("club"));


document.querySelector("#nombreClub").innerHTML = `${clubConfirmado.nombreClub}`;
document.querySelector("#duenioClub").innerHTML = `DT: ${clubConfirmado.duenio}`;
document.querySelector("#fondosClub").innerHTML = `$${clubConfirmado.fondos}`;

const ingresados = JSON.parse(localStorage.getItem("ingresantes"));

/*function separarPorPosicion(){
    for(const i of ingresados){
        if(i.posicion == 1)
    }
}*/

const arrayArqueros = ingresados.filter(unIngresado => unIngresado.posicion == 1);
const arrayDefensores = ingresados.filter(unIngresado => unIngresado.posicion == 2);
const arrayVolantes = ingresados.filter(unIngresado => unIngresado.posicion == 3);
const arrayDelanteros = ingresados.filter(unIngresado => unIngresado.posicion == 4);

seleccionarSuplentes();

function seleccionarSuplentes(){
    seleccionarArqueros();
    seleccionarDefensores();
    seleccionarVolantes();
    seleccionarDelanteros();
}

function seleccionarArqueros(){
    (arrayArqueros.length > 1)? mostrarListaArqueros() : cantidadSuficiente("ARQUEROS: ", menuArquerosSup);
}

function seleccionarDefensores(){
    (arrayDefensores.length > 4)? mostrarListaDefensores() : cantidadSuficiente("DEFENSORES: ", menuDefensoresSup);
}

function seleccionarVolantes(){
    (arrayVolantes.length > 3)? mostrarListaVolantes() : cantidadSuficiente("VOLANTES: ", menuVolantesSup);
}

function seleccionarDelanteros(){
    (arrayDelanteros.length > 3)? mostrarListaDelanteros() : cantidadSuficiente("DELANTEROS: ", menuDelanterosSup);
}

function mostrarListaArqueros(){
    let menuArquerosSup = document.querySelector("#menuArquerosSup");
    let innerArqueros = `ARQUEROS: `;
    for(const a of arrayArqueros){
        innerArqueros += `<div class="menuHorizontal">
                        <h3 class="nombreJugLista">${a.nombre}</h3>
                        <h3 class="itemJugLista">${a.edad}</h3>
                        <h3 class="itemJugLista">${a.sueldo}</h3>
                        <h3 class="itemJugLista">${a.id}</h3>
                        </div>`
    }
    innerArqueros += `<form id="formArquerosSup" class="menuHorizontal">
                        <input id="inputArquerosSup" class="form-control inputForm" type="number" placeholder="Id Jugador">
                        <button id="botonArquerosSup" type="button submit" class="btn btn-warning">Mandar al Banco</button>
                    </form>`;
    menuArquerosSup.innerHTML = innerArqueros;
    let formArquerosSup = document.querySelector("#formArquerosSup");
    formArquerosSup.addEventListener("submit", mandarArqueroAlBanco);
}

function mostrarListaDefensores(){
    let menuDefensoresSup = document.querySelector("#menuDefensoresSup");
    let innerDefensores = `DEFENSORES: `;
    for(const a of arrayDefensores){
        innerDefensores += `<div class="menuHorizontal">
                        <h3 class="nombreJugLista">${a.nombre}</h3>
                        <h3 class="itemJugLista">${a.edad}</h3>
                        <h3 class="itemJugLista">${a.sueldo}</h3>
                        <h3 class="itemJugLista">${a.id}</h3>
                        </div>`
    }
    innerDefensores += `<form id="formDefensoresSup" class="menuHorizontal">
                        <input id="inputDefensoresSup" class="form-control inputForm" type="number" placeholder="Id Jugador">
                        <button id="botonDefensoresSup" type="button submit" class="btn btn-warning disabled">Mandar al Banco</button>
                    </form>`;
    menuDefensoresSup.innerHTML = innerDefensores;
    let formDefensoresSup = document.querySelector("#formDefensoresSup");
    formDefensoresSup.addEventListener("submit", mandarDefensorAlBanco);
}

function mostrarListaVolantes(){
    let menuVolantesSup = document.querySelector("#menuVolantesSup");
    let innerVolantes = `VOLANTES: `;
    for(const a of arrayVolantes){
        innerVolantes += `<div class="menuHorizontal">
                        <h3 class="nombreJugLista">${a.nombre}</h3>
                        <h3 class="itemJugLista">${a.edad}</h3>
                        <h3 class="itemJugLista">${a.sueldo}</h3>
                        <h3 class="itemJugLista">${a.id}</h3>
                        </div>`
    }
    innerVolantes += `<form id="formVolantesSup" class="menuHorizontal">
                        <input id="inputVolantesSup" class="form-control inputForm" type="number" placeholder="Id Jugador">
                        <button id="botonVolantesSup" type="button submit" class="btn btn-warning disabled">Mandar al Banco</button>
                    </form>`;
    
    menuVolantesSup.innerHTML = innerVolantes;
    let formVolantesSup = document.querySelector("#formVolantesSup");
    formVolantesSup.addEventListener("submit", mandarVolanteAlBanco);
}

function mostrarListaDelanteros(){
    let menuDelanterosSup = document.querySelector("#menuDelanterosSup");
    let innerDelanteros = `DELANTEROS: `;
    for(const a of arrayDelanteros){
        innerDelanteros += `<div class="menuHorizontal">
                        <h3 class="nombreJugLista">${a.nombre}</h3>
                        <h3 class="itemJugLista">${a.edad}</h3>
                        <h3 class="itemJugLista">${a.sueldo}</h3>
                        <h3 class="itemJugLista">${a.id}</h3>
                        </div>`
    }
    innerDelanteros += `<form id="formDelanterosSup" class="menuHorizontal">
                        <input id="inputDelanterosSup" class="form-control inputForm" type="number" placeholder="Id Jugador">
                        <button id="botonDelanterosSup" type="button submit" class="btn btn-warning disabled">Mandar al Banco</button>
                    </form>`;
    menuDelanterosSup.innerHTML = innerDelanteros;
    let formDelanterosSup = document.querySelector("#formDelanterosSup");
    formDelanterosSup.addEventListener("submit", mandarDelanteroAlBanco);
}

function cantidadSuficiente(pos, menu){
    menu.innerHTML = `<div class="menuHorizontal"><h2>${pos}</h2>
                    <p class="mensajeNoSuplentes">No hay suplentes disponibles</p></div>`;
    if(pos=="ARQUEROS: ")document.querySelector("#botonDefensoresSup").classList.remove("disabled");
    else if(pos=="DEFENSORES: " && arrayArqueros.length==1)document.querySelector("#botonVolantesSup").classList.remove("disabled");
    else if(pos=="VOLANTES: " && arrayArqueros.length==1 && arrayDefensores.length==4)document.querySelector("#botonDelanterosSup").classList.remove("disabled");
}

function mandarArqueroAlBanco(e){
    e.preventDefault();
    let idArqueroElegido = document.querySelector("#inputArquerosSup").value;
    quitarArquero(idArqueroElegido);
    idArqueroElegido = "";
    if(arrayArqueros.length == 1){
        document.querySelector("#botonDefensoresSup").classList.remove("disabled");
    }
}

function quitarArquero(id){
    arrayArqueros.splice(posicionArqueroABorrar(id), 1);
    (arrayArqueros.length > 1)? mostrarListaArqueros() : cantidadSuficiente("ARQUEROS: ", menuArquerosSup);
}

function posicionArqueroABorrar(id){
    const arquero = arrayArqueros.find((x) => x.id == id);
    suplentes.push(arquero);
    return arrayArqueros.indexOf(arquero);
}

function mandarDefensorAlBanco(e){
    e.preventDefault();
    let idDefensorElegido = document.querySelector("#inputDefensoresSup").value;
    quitarDefensor(idDefensorElegido);
    idDefensorElegido = "";
    if(arrayDefensores.length > 4){
        document.querySelector("#botonDefensoresSup").classList.remove("disabled");
    }
    if(arrayDefensores.length == 4){
        document.querySelector("#botonVolantesSup").classList.remove("disabled");
    }
}

function quitarDefensor(id){
    arrayDefensores.splice(posicionDefensorABorrar(id), 1);
    (arrayDefensores.length > 4)? mostrarListaDefensores() : cantidadSuficiente("DEFENSORES: ", menuDefensoresSup);
}

function posicionDefensorABorrar(id){
    const defensor = arrayDefensores.find((x) => x.id == id);
    suplentes.push(defensor);
    return arrayDefensores.indexOf(defensor);
}

function mandarVolanteAlBanco(e){
    e.preventDefault();
    let idVolanteElegido = document.querySelector("#inputVolantesSup").value;
    quitarVolante(idVolanteElegido);
    idVolanteElegido = "";
    if(arrayVolantes.length > 3){
        document.querySelector("#botonVolantesSup").classList.remove("disabled");
    }
    if(arrayVolantes.length == 3){
        document.querySelector("#botonDelanterosSup").classList.remove("disabled");
    }
}

function quitarVolante(id){
    arrayVolantes.splice(posicionVolanteABorrar(id), 1);
    (arrayVolantes.length > 3)? mostrarListaVolantes() : cantidadSuficiente("VOLANTES: ", menuVolantesSup);
}

function posicionVolanteABorrar(id){
    const volante = arrayVolantes.find((x) => x.id == id);
    suplentes.push(volante);
    return arrayVolantes.indexOf(volante);
}

function mandarDelanteroAlBanco(e){
    e.preventDefault();
    let idDelanteroElegido = document.querySelector("#inputDelanterosSup").value;
    quitarDelantero(idDelanteroElegido);
    idDelanteroElegido = "";
    if(arrayDelanteros.length > 3){
        document.querySelector("#botonDelanterosSup").classList.remove("disabled");
    }
    if(arrayDelanteros.length == 3){
        document.querySelector("#botonConfirmarSuplentes").classList.remove("disabled");
    }
}

function quitarDelantero(id){
    arrayDelanteros.splice(posicionDelanteroABorrar(id), 1);
    (arrayDelanteros.length > 3)? mostrarListaDelanteros() : cantidadSuficiente("DELANTEROS: ", menuDelanterosSup);
}

function posicionDelanteroABorrar(id){
    const delantero = arrayDelanteros.find((x) => x.id == id);
    suplentes.push(delantero);
    return arrayDelanteros.indexOf(delantero);
}

document.querySelector("#botonConfirmarSuplentes").addEventListener("click", irAlEquipo);

function irAlEquipo(e){
    e.preventDefault
    document.querySelector("#menuElegirSuplentes").style.display="none";
    document.querySelector("#menuMiEquipo").style.display="grid";
    mostrarTitulares();
    mostrarSuplentes();
}

function mostrarTitulares(){
    let innerArq = "";
    for(const a of arrayArqueros){
        titulares.push(a);
        innerArq += `<div class="menuHorizontal marginBottom">
                    <h3 class="arqueroTitular">ARQ</h3>
                    <h3 class="nombreJugLista">${a.nombre}</h3>
                    </div>`
    }
    document.querySelector(".bloqueArquero").innerHTML = innerArq;

    let innerDef = "";
    for(const a of arrayDefensores){
        titulares.push(a);
        innerDef += `<div class="menuHorizontal marginBottom">
                    <h3 class="defensorTitular">DEF</h3>
                    <h3 class="nombreJugLista">${a.nombre}</h3>
                    </div>`
    }
    document.querySelector(".bloqueDefensores").innerHTML = innerDef;

    let innerVol = "";
    for(const a of arrayVolantes){
        titulares.push(a);
        innerVol += `<div class="menuHorizontal marginBottom">
                    <h3 class="volanteTitular">VOL</h3>
                    <h3 class="nombreJugLista">${a.nombre}</h3>
                    </div>`
    }
    document.querySelector(".bloqueVolantes").innerHTML = innerVol;

    let innerDel = "";
    for(const a of arrayDelanteros){
        titulares.push(a);
        innerDel += `<div class="menuHorizontal marginBottom">
                    <h3 class="delanteroTitular">DEL</h3>
                    <h3 class="nombreJugLista">${a.nombre}</h3>
                    </div>`
    }
    document.querySelector(".bloqueDelanteros").innerHTML = innerDel;
}

function mostrarSuplentes(){
    let innerSup = "";
    for(const s of suplentes){
        let clasePos;
        let posic;
        if(s.posicion==1){
            clasePos="arqueroTitular";
            posic="ARQ";
        }
        else if(s.posicion==2){
            clasePos="defensorTitular";
            posic="DEF";
        }
        else if(s.posicion==3){
            clasePos="volanteTitular";
            posic="VOL";
        }
        else{
            clasePos="delanteroTitular";
            posic="DEL";
        }
        innerSup += `<div class="menuHorizontal">
                <p class="${clasePos}">${posic}</p>
                <p class="nombreJugLista">${s.nombre}</p>
                </div>`
    }
    document.querySelector("#listSuplentes").innerHTML = innerSup;
}

document.querySelector("#formSimularPartidos").addEventListener("submit", simularPartidos);

function simularPartidos(){
    let cantPartidosTitulares = document.querySelector("#inputSimular").value;
    //let cantPartidosSuplentes = Math.floor(cantPartidosTitulares / 3);
    actualizarTitulares(cantPartidosTitulares);
}

function actualizarTitulares(cantPartidos){
    titulares.forEach(unTitular => actualizarDatosTitular(unTitular, cantPartidos));
}

function actualizarDatosTitular(titular, cantPartidos){
    let promedioTitular = ((Math.random * 30 + 70) / 10);
    let infraccionesTitular = Math.random * (Math.floor(cantPartidos / 7));

    const jugTitular = new Jugador(titular.id, titular.nombre, titular.edad, titular.jugadorPosicion(titular.posicion), cantPartidos, promedioTitular, titular.sueldo, infraccionesTitular);
    let sueldoResultante = 0;
    recompensarPorRendimiento(jugTitular, sueldoResultante);
    sueldoResultante -= restarPorInfracciones(sueldoResultante, infraccionesTitular);
}

//Funcion que aumenta el salario si el jugador tuvo buen rendimiento
function recompensarPorRendimiento(unJugador, sueldoResultante){
    if(unJugador.buenRendimiento()){
        sueldoResultante += agregarBonoRendimiento(unJugador.sueldo);
        unJugador.esJoven() && (sueldoResultante += agregarBonoJuventud(unJugador.sueldo));
    }
}

const agregarBonoRendimiento = (salario) => salario + salario * 0.3;

const agregarBonoJuventud = (salario) => salario + salario * 0.15;

const restarPorInfracciones = (salario, faltas) => salario - 4000 * faltas;