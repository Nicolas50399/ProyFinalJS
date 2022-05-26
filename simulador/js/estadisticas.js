const actualizados = JSON.parse(localStorage.getItem("jugadores"));
let estadisticasClub = JSON.parse(localStorage.getItem("club"));
let innerListaActualizada;
let innerInfractores = "";
let innerRendidores = "";
let innerEstrellas = "";
let nombreBuscado;
let innerEstadisticasJugadorBuscado = "";
let gastoTotal = 0;

actualizarEstadisticas(actualizados);
gastosTotalesJugadores();

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
    <h3 id="edadJugLista" class="arqueroTitular width15">Edad</h3>
    <h3 class="arqueroTitular width15">Posicion</h3>
    <h3 class="arqueroTitular width15">Partidos</h3>
    <h3 id="promedioJugLista" class="arqueroTitular width15">Promedio</h3>
    <h3 id="sueldoJugLista" class="arqueroTitular width15">Sueldo</h3>
    <h3 id="infraccionesJugLista" class="arqueroTitular width15">Infracciones</h3>
    <h3 id="idJugLista" class="arqueroTitular width15">ID</h3>
    </div>`;
    listaJugadores.forEach(a => listarEstadisticasJugador(a));
}

function listarEstadisticasJugador(unJugador){
    innerListaActualizada += `<div class="menuHorizontal">
                            <h3 class="width30">${unJugador.nombre}</h3>
                            <h3 class="width15">${unJugador.edad}</h3>
                            <h3 class="width15">${cualPosicion(unJugador)}</h3>
                            <h3 class="width15">${unJugador.partidos}</h3>
                            <h3 class="width15">${unJugador.promedio}</h3>
                            <h3 class="width15">$${unJugador.sueldo}</h3>
                            <h3 class="width15">${unJugador.infracciones}</h3>
                            <h3 class="width15">${unJugador.id}</h3>
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
    innerInfractores+=`<ul class="listNone">`;
    infractores.forEach((j) =>{
        innerInfractores += `<li><h3 class="negro">${j.nombre}</h3></li>`;
    });
    innerInfractores+=`</ul>`;
    innerRendidores+=`<ul class="listNone">`;
    rendidores.forEach((j) => {
        innerRendidores += `<li><h3 class="negro">${j.nombre}</h3></li>`;
    });
    innerRendidores+=`</ul>`;  
    innerEstrellas+=`<ul class="listNone">`;
    estrellas.forEach((j) => {
        innerEstrellas += `<li><h3 class="negro">${j.nombre}</h3></li>`;
    });
    innerEstrellas+=`</ul>`;
    document.querySelector("#jugsInfractores").innerHTML = innerInfractores;
    document.querySelector("#jugsRendidores").innerHTML = innerRendidores;
    document.querySelector("#jugsEstrellas").innerHTML = innerEstrellas;
    innerRendidores="";
    innerInfractores="";
    innerEstrellas="";

}

function mostrarNombres(jug, inner){
    inner += `<li><h3>${jug.nombre}</h3></li>`;
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
function habilitarEstadisticasGrupales(){
    document.querySelector(".menuEstadisticas").style.display="none";
    document.querySelector("#mostrarEstadisticasGrupo").style.display="block";
}
function habilitarEstadisticasIndividuales(){
    document.querySelector(".menuEstadisticas").style.display="none";
    document.querySelector("#buscarEstadisticaJugador").style.display="block";
}

//Funcion que recibe un array de objetos clase "Jugador" y devuelve sus respectivos nombres
function nombres(){
    return actualizados.map((unJugador) => unJugador.nombre);
}

//Funcion que busca el jugador que coincida con el nombre puesto
function buscarJugadorPorID(e){
    e.preventDefault();
    idBuscado = document.querySelector("#buscarJug").value;
    if(actualizados.some(unJugador => unJugador.id == idBuscado)){
        const jugadorBuscado = actualizados.find(unJugador => unJugador.id == idBuscado);
        innerEstadisticasJugadorBuscado += `<div id="cartaJugadorBuscado" class="card" style="width: 18rem;">
        <img src="/assets/jugadorBuscado.png"" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title negro">${jugadorBuscado.nombre}</h5>
          <p class="card-text negro">Jugador de ${estadisticasClub.nombreClub}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item rojo">Edad: ${jugadorBuscado.edad}</li>
          <li class="list-group-item rojo">Posicion: ${cualPosicion(jugadorBuscado)}</li>
          <li class="list-group-item rojo">Partidos: ${jugadorBuscado.partidos}</li>
          <li class="list-group-item rojo">Promedio: ${jugadorBuscado.promedio}</li>
          <li class="list-group-item rojo">Infracciones: ${jugadorBuscado.infracciones}</li>
          <li class="list-group-item rojo">SUELDO TOTAL: $${jugadorBuscado.sueldo}</li>
          <li class="list-group-item rojo">ID: Nº ${jugadorBuscado.id}</li>
          <li class="list-group-item rojo">--------</li>
          <li class="list-group-item rojo">INFRACTOR: ${enLaLista(infractores, jugadorBuscado.id)}</li>
          <li class="list-group-item rojo">RENDIDOR: ${enLaLista(rendidores, jugadorBuscado.id)}</li>
          <li class="list-group-item rojo">ESTRELLA: ${enLaLista(estrellas, jugadorBuscado.id)}</li>
        </ul>
      </div>`;
    
      document.querySelector(".jugadorEncontrado").innerHTML = innerEstadisticasJugadorBuscado;
      innerEstadisticasJugadorBuscado="";
    }
    else{
        document.querySelector("#buscarJug").value = "";
        Toastify({
            text: `El jugador no se encuentra en el equipo`,
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #DC0707, #EE5959)'
            }
        }).showToast();
    }
}

function enLaLista(array, num){
    if(array.some(j => j.id == num)){
        return "SI";
    }
    else return "NO"
}

function volverGrupal(){
    document.querySelector(".menuEstadisticas").style.display="flex";
    document.querySelector("#mostrarEstadisticasGrupo").style.display="none";
}

function volverIndividual(){
    document.querySelector(".menuEstadisticas").style.display="flex";
    document.querySelector("#buscarEstadisticaJugador").style.display="none";
}

function gastosTotalesJugadores(){
    actualizados.forEach(j => {
        gastoTotal += j.sueldo;
    })
}

document.querySelector(".botonEstGrupales").addEventListener("click", habilitarEstadisticasGrupales);
document.querySelector(".botonEstIndividuales").addEventListener("click", habilitarEstadisticasIndividuales);

document.querySelector("#formularioBuscarJugador").addEventListener("submit", buscarJugadorPorID);

document.querySelector("#botonAtrasGrupal").addEventListener("click", volverGrupal);
document.querySelector("#botonAtrasIndividual").addEventListener("click", volverIndividual);
document.querySelector("#sueldoClubResultante").innerHTML = `
                    <div class="sueldoFinalClub">
                        <h2>Fondos club: $${estadisticasClub.fondos}</h2>
                        <h2>Gastos jugadores: $${gastoTotal}</h2>
                        <h2>Fondos club: $${estadisticasClub.fondos - gastoTotal}</h2>
                    </div>`;
