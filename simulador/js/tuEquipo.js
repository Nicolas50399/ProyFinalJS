const suplentes = [];
const titulares = [];
const jugadores = [];
let promedioTitular;
let infraccionesTitular;
let promedioSuplente;
let infraccionesSuplente;
let sueldoResultante;
let clubConfirmado = JSON.parse(localStorage.getItem("club"));


document.querySelector("#nombreClub").innerHTML = `${clubConfirmado.nombreClub}`;
document.querySelector("#duenioClub").innerHTML = `DT: ${clubConfirmado.duenio}`;
document.querySelector("#fondosClub").innerHTML = `$${clubConfirmado.fondos}`;

const ingresados = JSON.parse(localStorage.getItem("ingresantes"));


const arrayArqueros = ingresados.filter(unIngresado => unIngresado.posicion == 1);
const arrayDefensores = ingresados.filter(unIngresado => unIngresado.posicion == 2);
const arrayVolantes = ingresados.filter(unIngresado => unIngresado.posicion == 3);
const arrayDelanteros = ingresados.filter(unIngresado => unIngresado.posicion == 4);

seleccionarSuplentes();

function seleccionarSuplentes(){
    if(arrayArqueros.length==1 && arrayDefensores.length==4 && arrayVolantes.length==3 && arrayDelanteros.length==3){
        document.querySelector("#botonConfirmarSuplentes").classList.remove("disabled");
    }
    else{
        seleccionarArqueros();
        seleccionarDefensores();
        seleccionarVolantes();
        seleccionarDelanteros();
    }
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
    innerArqueros += `<div class="menuHorizontal">
                    <h3 class="nombreJugLista arqueroTitular">Nombre</h3>
                    <h3 class="itemJugLista arqueroTitular">Edad</h3>
                    <h3 class="itemJugLista arqueroTitular">Sueldo</h3>
                    <h3 class="itemJugLista arqueroTitular">ID</h3>
                    </div>`
    for(const a of arrayArqueros){
        innerArqueros += `<div class="menuHorizontal">
                        <h3 class="nombreJugLista">${a.nombre}</h3>
                        <h3 class="itemJugLista">${a.edad}</h3>
                        <h3 class="itemJugLista">$${a.sueldo}</h3>
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
    innerDefensores += `<div class="menuHorizontal">
                    <h3 class="nombreJugLista arqueroTitular">Nombre</h3>
                    <h3 class="itemJugLista arqueroTitular">Edad</h3>
                    <h3 class="itemJugLista arqueroTitular">Sueldo</h3>
                    <h3 class="itemJugLista arqueroTitular">ID</h3>
                    </div>`
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
    innerVolantes += `<div class="menuHorizontal">
                    <h3 class="nombreJugLista arqueroTitular">Nombre</h3>
                    <h3 class="itemJugLista arqueroTitular">Edad</h3>
                    <h3 class="itemJugLista arqueroTitular">Sueldo</h3>
                    <h3 class="itemJugLista arqueroTitular">ID</h3>
                    </div>`
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
    innerDelanteros += `<div class="menuHorizontal">
                    <h3 class="nombreJugLista arqueroTitular">Nombre</h3>
                    <h3 class="itemJugLista arqueroTitular">Edad</h3>
                    <h3 class="itemJugLista arqueroTitular">Sueldo</h3>
                    <h3 class="itemJugLista arqueroTitular">ID</h3>
                    </div>`
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
                    <p class="mensajeNoSuplentes">Jugadores Suficientes</p></div>`;
    if(arrayArqueros.length==1 && arrayDefensores.length>4)document.querySelector("#botonDefensoresSup").classList.remove("disabled");
    else if(arrayDefensores,length==4 && arrayArqueros.length==1 && arrayVolantes.length>3)document.querySelector("#botonVolantesSup").classList.remove("disabled");
    else if(arrayVolantes.length==3 && arrayArqueros.length==1 && arrayDefensores.length==4 &&arrayDelanteros.length>3)document.querySelector("#botonDelanterosSup").classList.remove("disabled");
}

function mandarArqueroAlBanco(e){
    e.preventDefault();
    let idArqueroElegido = document.querySelector("#inputArquerosSup").value;
    if(arrayArqueros.some(j => j.id == idArqueroElegido)){
        quitarArquero(idArqueroElegido);
        idArqueroElegido = "";
        
        if(arrayArqueros.length == 1){
            document.querySelector("#botonDefensoresSup").classList.remove("disabled");
        }
    }
    else {
        document.querySelector("#inputArquerosSup").value="";
        Toastify({
            text: `Jugador no encontrado`,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #DC0707, #EE5959)'
            }
        }).showToast();
    }
}

function quitarArquero(id){
    arrayArqueros.splice(posicionArqueroABorrar(id), 1);
    (arrayArqueros.length > 1)? mostrarListaArqueros() : cantidadSuficiente("ARQUEROS: ", menuArquerosSup);
}

function posicionArqueroABorrar(id){
    const arquero = arrayArqueros.find((x) => x.id == id);
    suplentes.push(arquero);
    Toastify({
        text: `${arquero.nombre} ahora está en el banco`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    return arrayArqueros.indexOf(arquero);
}

function mandarDefensorAlBanco(e){
    e.preventDefault();
    let idDefensorElegido = document.querySelector("#inputDefensoresSup").value;

    if(arrayDefensores.some(j => j.id == idDefensorElegido)){
        quitarDefensor(idDefensorElegido);
        idDefensorElegido = "";
        if(arrayDefensores.length > 4){
            document.querySelector("#botonDefensoresSup").classList.remove("disabled");
        }
        if(arrayDefensores.length == 4){
            document.querySelector("#botonVolantesSup").classList.remove("disabled");
        }
    }
    else {
        document.querySelector("#inputDefensoresSup").value="";
        Toastify({
            text: `Jugador no encontrado`,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #DC0707, #EE5959)'
            }
        }).showToast();
    }
}

function quitarDefensor(id){
    arrayDefensores.splice(posicionDefensorABorrar(id), 1);
    (arrayDefensores.length > 4)? mostrarListaDefensores() : cantidadSuficiente("DEFENSORES: ", menuDefensoresSup);
}

function posicionDefensorABorrar(id){
    const defensor = arrayDefensores.find((x) => x.id == id);
    suplentes.push(defensor);
    Toastify({
        text: `${defensor.nombre} ahora está en el banco`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    return arrayDefensores.indexOf(defensor);
}

function mandarVolanteAlBanco(e){
    e.preventDefault();
    let idVolanteElegido = document.querySelector("#inputVolantesSup").value;
    if(arrayVolantes.some(j => j.id == idVolanteElegido)){
        quitarVolante(idVolanteElegido);
        idVolanteElegido = "";
        if(arrayVolantes.length > 3){
            document.querySelector("#botonVolantesSup").classList.remove("disabled");
        }
        if(arrayVolantes.length == 3){
            document.querySelector("#botonDelanterosSup").classList.remove("disabled");
        }
    }
    else {
        document.querySelector("#inputVolantesSup").value="";
        Toastify({
            text: `Jugador no encontrado`,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #DC0707, #EE5959)'
            }
        }).showToast();
    }

    
}

function quitarVolante(id){
    arrayVolantes.splice(posicionVolanteABorrar(id), 1);
    (arrayVolantes.length > 3)? mostrarListaVolantes() : cantidadSuficiente("VOLANTES: ", menuVolantesSup);
}

function posicionVolanteABorrar(id){
    const volante = arrayVolantes.find((x) => x.id == id);
    suplentes.push(volante);
    Toastify({
        text: `${volante.nombre} ahora está en el banco`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    return arrayVolantes.indexOf(volante);
}

function mandarDelanteroAlBanco(e){
    e.preventDefault();
    let idDelanteroElegido = document.querySelector("#inputDelanterosSup").value;

    if(arrayDelanteros.some(j => j.id == idDelanteroElegido)){
        quitarDelantero(idDelanteroElegido);
        idDelanteroElegido = "";
        if(arrayDelanteros.length > 3){
            document.querySelector("#botonDelanterosSup").classList.remove("disabled");
        }
        if(arrayDelanteros.length == 3){
            document.querySelector("#botonConfirmarSuplentes").classList.remove("disabled");
        }
    }
    else {
        document.querySelector("#inputDelanterosSup").value="";
        Toastify({
            text: `Jugador no encontrado`,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #DC0707, #EE5959)'
            }
        }).showToast();
    }

    
}

function quitarDelantero(id){
    arrayDelanteros.splice(posicionDelanteroABorrar(id), 1);
    (arrayDelanteros.length > 3)? mostrarListaDelanteros() : cantidadSuficiente("DELANTEROS: ", menuDelanterosSup);
}

function posicionDelanteroABorrar(id){
    const delantero = arrayDelanteros.find((x) => x.id == id);
    suplentes.push(delantero);
    Toastify({
        text: `${delantero.nombre} ahora está en el banco`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    return arrayDelanteros.indexOf(delantero);
}

document.querySelector("#botonConfirmarSuplentes").addEventListener("click", irAlEquipo);

function irAlEquipo(e){
    e.preventDefault();
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

function simularPartidos(e){
    e.preventDefault();
    Swal.fire({
        title: '¿Está seguro que desea simular los partidos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Simulación en proceso!',
                icon: 'success',
                text: 'El equipo está jugando los partidos'
            })
        }
    })

    let cantPartidosTitulares = parseInt(document.querySelector("#inputSimular").value);
    let cantPartidosSuplentes = parseInt(Math.floor(cantPartidosTitulares / 3));
    actualizarTitulares(cantPartidosTitulares);
    actualizarSuplentes(cantPartidosSuplentes);
    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    peticionPOSTJugadores();
    
}

function peticionPOSTJugadores(){
    jugadores.forEach(jug => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: `${jug.nombre}`,
                body: `EDAD: ${jug.edad} años\n
                POSICION: ${cualPosicion(jug.posicion)}\n
                PROMEDIO: ${jug.promedio}`,
                userId: `${jug.id}`,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
    })
}

function cualPosicion(jug){
    if(jug.posicion==1)return "ARQ";
    else if(jug.posicion==2)return "DEF";
    else if(jug.posicion==3)return "VOL";
    else return "DEL";
}

function actualizarTitulares(cantPartidos){
    titulares.forEach(unTitular => {
        actualizarDatosTitular(unTitular, cantPartidos);
    });
}

function actualizarDatosTitular(titular, cantPartidos){
    promedioTitular = (Math.floor(Math.random() * (100-70+1)) + 70) / 10;
    infraccionesTitular = Math.floor(Math.random() * (Math.floor(cantPartidos / 7)));

    sueldoResultante = parseInt(titular.sueldo);
    if(buenRendimiento(titular, promedioTitular, cantPartidos)){
        sueldoResultante += sueldoResultante * 0.3;
    }
    if(esJoven(titular)){
        sueldoResultante += sueldoResultante * 0.15;
    }

    sueldoResultante = restarPorInfracciones(sueldoResultante, infraccionesTitular);
    const jugTitularActualizado = new Jugador(titular.id, titular.nombre, parseInt(titular.edad), titular.posicion, parseInt(cantPartidos), promedioTitular, sueldoResultante, infraccionesTitular);
    jugadores.push(jugTitularActualizado);
    console.log(sueldoResultante);
}

function actualizarSuplentes(cantPartidos){
    suplentes.forEach(unSuplente => actualizarDatosSuplentes(unSuplente, cantPartidos));
}

function actualizarDatosSuplentes(suplente, cantPartidos){
    promedioSuplente = (Math.floor(Math.random() * (100-50+1)) + 50) / 10;
    infraccionesSuplente = Math.floor(Math.random() * (Math.floor(cantPartidos / 5)));

    sueldoResultante = parseInt(suplente.sueldo);
    if(buenRendimiento(suplente, promedioSuplente, cantPartidos)){
        sueldoResultante += sueldoResultante * 0.3;
    }
    if(esJoven(suplente)){
        sueldoResultante += sueldoResultante * 0.15;
    }

    sueldoResultante = restarPorInfracciones(sueldoResultante, infraccionesSuplente);
    const jugSuplenteActualizado = new Jugador(suplente.id, suplente.nombre, parseInt(suplente.edad), suplente.posicion, parseInt(cantPartidos), promedioSuplente, sueldoResultante, infraccionesSuplente);
    jugadores.push(jugSuplenteActualizado);
}


//Funcion que aumenta el salario si el jugador tuvo buen rendimiento

function recompensarPorRendimiento(unJugador, sueldoRes){
    if(buenRendimiento(unJugador)){
        console.log("FUNCIONA");
        sueldoResultante += agregarBonoRendimiento(sueldoResultante);
        esJoven(unJugador) && (sueldoResultante = agregarBonoJuventud(sueldoResultante));
    }
}

function buenRendimiento(jug, promedio, partidos){
    if(jug.posicion == 1){
        console.log("ARQUERO");
        return (partidos >= 20 && promedio >= 8);
    }
    else if(jug.posicion == 2){
        console.log("DEFENSOR");
        return (partidos >= 10 && promedio >= 9);
    }
    else if(jug.posicion == 3){
        console.log("VOLANTE");
        return (partidos >= 15 && promedio >= 7);
    }
    else {
        console.log("DELANTERO");
        return (partidos >= 25 && promedio >= 8);
    }
}

function esJoven(jug){
    return (jug.edad <= 25);
}

function buenaConducta(jug){
    return (jug.infracciones == 0);
}

const agregarBonoRendimiento = (salario) => salario + salario * 0.3;

const agregarBonoJuventud = (salario) => salario + salario * 0.15;

const restarPorInfracciones = (salario, faltas) => salario - 2000 * faltas;