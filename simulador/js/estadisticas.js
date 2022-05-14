const actualizados = JSON.parse(localStorage.getItem("jugadores"));
let innerListaActualizada;
let innerDestacados = "";

actualizarEstadisticas(actualizados);

btnOrdenarPorID = document.querySelector("#ordenarPorID");
btnOrdenarPorEdad = document.querySelector("#ordenarPorEdad");
btnOrdenarPorSueldo = document.querySelector("#ordenarPorSueldo");
btnOrdenarPorPromedio = document.querySelector("#ordenarPorPromedio");
btnOrdenarPorInfracciones = document.querySelector("#ordenarPorInfracciones");

btnOrdenarPorID.addEventListener("click", ordenarPorID);
btnOrdenarPorEdad.addEventListener("click", ordenarPorEdad);
btnOrdenarPorSueldo.addEventListener("click", ordenarPorSueldo);
btnOrdenarPorPromedio.addEventListener("click", ordenarPorPromedio);
btnOrdenarPorInfracciones.addEventListener("click", ordenarPorInfracciones);

function ordenarPorID(){
    const ordenadosID = actualizados;
    ordenadosID.sort((jugadorA, jugadorB) => {
        if(jugadorA.id > jugadorB.id) return 1;
        if(jugadorA.id < jugadorB.id) return -1;
        return 0;
    })
    actualizarEstadisticas(ordenadosID);
    document.querySelector("#idJugLista").classList.add("volanteTitular");
}

function ordenarPorEdad(){
    const ordenadosEdad = actualizados;
    ordenadosEdad.sort((jugadorA, jugadorB) => {
        if(jugadorA.edad > jugadorB.edad) return 1;
        if(jugadorA.edad < jugadorB.edad) return -1;
        return 0;
    })
    actualizarEstadisticas(ordenadosEdad);
    document.querySelector("#edadJugLista").classList.add("volanteTitular");
}

function ordenarPorSueldo(){
    const ordenadosSueldo = actualizados;
    ordenadosSueldo.sort((jugadorA, jugadorB) => {
        if(jugadorA.sueldo > jugadorB.sueldo) return 1;
        if(jugadorA.sueldo < jugadorB.sueldo) return -1;
        return 0;
    })
    actualizarEstadisticas(ordenadosSueldo);
    document.querySelector("#sueldoJugLista").classList.add("volanteTitular");
}

function ordenarPorPromedio(){
    const ordenadosPromedio = actualizados;
    ordenadosPromedio.sort((jugadorA, jugadorB) => {
        if(jugadorA.promedio > jugadorB.promedio) return 1;
        if(jugadorA.promedio < jugadorB.promedio) return -1;
        return 0;
    })
    actualizarEstadisticas(ordenadosPromedio);
    document.querySelector("#promedioJugLista").classList.add("volanteTitular");
}

function ordenarPorInfracciones(){
    const ordenadosInfracciones = actualizados;
    ordenadosInfracciones.sort((jugadorA, jugadorB) => {
        if(jugadorA.infracciones > jugadorB.infracciones) return 1;
        if(jugadorA.infracciones < jugadorB.infracciones) return -1;
        return 0;
    })
    actualizarEstadisticas(ordenadosInfracciones);
    document.querySelector("#infraccionesJugLista").classList.add("volanteTitular");
}

function actualizarEstadisticas(listaJugadores){
    innerListaActualizada= `<div class="menuHorizontal">
    <h3 class="arqueroTitular width30">Nombre</h3>
    <h3 id="edadJugLista" class="arqueroTitular width10">Edad</h3>
    <h3 class="arqueroTitular width10">Posicion</h3>
    <h3 class="arqueroTitular width10">Partidos</h3>
    <h3 id="promedioJugLista" class="arqueroTitular width10">Promedio</h3>
    <h3 id="sueldoJugLista" class="arqueroTitular width10">Sueldo</h3>
    <h3 id="infraccionesJugLista" class="arqueroTitular width10">Infracciones</h3>
    <h3 id="idJugLista" class="arqueroTitular width10">ID</h3>
    </div>`;
    listaJugadores.forEach(a => listarEstadisticasJugador(a));
}


function listarEstadisticasJugador(unJugador){
    innerListaActualizada += `<div class="menuHorizontal">
                            <h3 class="width30">${unJugador.nombre}</h3>
                            <h3 class="width10">${unJugador.edad}</h3>
                            <h3 class="width10">${cualPosicion(unJugador)}</h3>
                            <h3 class="width10">${unJugador.partidos}</h3>
                            <h3 class="width10">${unJugador.promedio}</h3>
                            <h3 class="width10">$${unJugador.sueldo}</h3>
                            <h3 class="width10">${unJugador.infracciones}</h3>
                            <h3 class="width10">${unJugador.id}</h3>
                            </div>`;
    let listaAct = document.querySelector("#tablaEstadisticas");
    listaAct.innerHTML = innerListaActualizada;
}

function cualPosicion(jug){
    if(jug.posicion==1)return "ARQ";
    else if(jug.posicion==2)return "DEF";
    else if(jug.posicion==3)return "VOL";
    else return "DEL";
}


const infractores = actualizados.filter((unJugador) => !conBuenaConducta(unJugador));
const rendidores = actualizados.filter((unJugador) => conBuenRendimiento(unJugador));
const estrellas = actualizados.filter((unJugador) => conBuenRendimiento(unJugador) && conBuenaConducta(unJugador) && jugEsJoven(unJugador));

mostrarDestacados();

function mostrarDestacados(){
    innerDestacados+=`<div class="menuHorizontal">
                    <h3>Infractores: </h3>`;
    infractores.forEach((j) => mostrarNombres(j));
    innerDestacados+=`</div>`;
    innerDestacados+=`<div class="menuHorizontal">
    <h3>Rendidores: </h3>`;
    rendidores.forEach((j) => mostrarNombres(j));
    innerDestacados+=`</div>`;  
    innerDestacados+=`<div class="menuHorizontal">
    <h3>Estrellas: </h3>`;
    estrellas.forEach((j) => mostrarNombres(j));
    innerDestacados+=`</div>`;
    document.querySelector("#jugadoresDestacados").innerHTML = innerDestacados;
    innerDestacados="";
}

function mostrarNombres(jug){
    innerDestacados += `<h3>${jug.nombre}</h3>`
}

function conBuenRendimiento(jug){
    if(jug.posicion == 1) return (jug.partidos >= 20 && jug.promedio >= 8.0);
    else if(jug.posicion == 2)return (jug.partidos >= 10 && jug.promedio >= 9.0);
    else if(jug.posicion == 3)return (jug.partidos >= 15 && jug.promedio >= 7.5);
    else return (jug.partidos >= 25 && jug.promedio >= 8.5);
}

function jugEsJoven(jug){
    return (jug.edad <= 25);
}

function conBuenaConducta(jug){
    return (jug.infracciones == 0);
}

