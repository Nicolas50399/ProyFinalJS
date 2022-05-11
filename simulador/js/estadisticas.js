const actualizados = JSON.parse(localStorage.getItem("jugadores"));
let innerListaActualizada = `<div class="menuHorizontal">
                            <h3 class="arqueroTitular width30">Nombre</h3>
                            <h3 class="arqueroTitular width10">Edad</h3>
                            <h3 class="arqueroTitular width10">Posicion</h3>
                            <h3 class="arqueroTitular width10">Partidos</h3>
                            <h3 class="arqueroTitular width10">Promedio</h3>
                            <h3 class="arqueroTitular width10">Sueldo</h3>
                            <h3 class="arqueroTitular width10">Infracciones</h3>
                            <h3 class="arqueroTitular width10">ID</h3>
                            </div>`;

actualizados.forEach(a => listarEstadisticasJugador(a));

function listarEstadisticasJugador(unJugador){
    innerListaActualizada += `<div class="menuHorizontal">
                            <h3 class="width30">${unJugador.nombre}</h3>
                            <h3 class="width10">${unJugador.edad}</h3>
                            <h3 class="width10">${unJugador.posicion}</h3>
                            <h3 class="width10">${unJugador.partidos}</h3>
                            <h3 class="width10">${unJugador.promedio}</h3>
                            <h3 class="width10">$${unJugador.sueldo}</h3>
                            <h3 class="width10">${unJugador.infracciones}</h3>
                            <h3 class="width10">${unJugador.id}</h3>
                            </div>`;
    let listaAct = document.querySelector("#tablaEstadisticas");
    listaAct.innerHTML = innerListaActualizada;
    console.log(unJugador.partidos);
}
