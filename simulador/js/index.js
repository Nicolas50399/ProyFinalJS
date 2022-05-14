
//--------------------------------------------------------------------FUNCIONES------------------------------------------------------------------------------------------------------

//Funcion que pide el nombre del club y modifica una etiqueta HTML
function asignarNombreClub(nombre){

    let nombreEquipo = document.querySelector(".nombreEquipo");
    nombreEquipo.innerText = nombre;
}


//Funcion que pide datos del dueño y modifica etiquetas HTML
function asignarDatosDueño(nombre, plata){
    let nombreD = document.querySelector(".nombreDueño");
    nombreD.innerText = "Nombre: " + nombre;

    let plataD = document.querySelector(".plataDueño");
    plataD.innerText = "Fondos: $" + plata;
}


function formularioDelClub(){
    let formularioClub = document.querySelector("#formularioClub");
    formularioClub.addEventListener("submit", validarFormularioClub);
}


function validarFormularioClub(e){
    e.preventDefault();
    let formulario = e.target;

    asignarNombreClub(formulario.children[0].value || "Sociedad Anónima"); //OPERADOR LOGICO OR
    asignarDatosDueño(formulario.children[1].value, formulario.children[2].value);

    nombreClub = formulario.children[0].value;
    nombreDuenio = formulario.children[1].value;
    plataDuenio = formulario.children[2].value;

    peticionPOSTClub();

    const club = new Club(nombreClub, nombreDuenio, plataDuenio);
    localStorage.setItem("club", JSON.stringify(club));

    document.querySelector("#menuModificarClub").style.display = "none";
    document.querySelector(".sueldoDisponible").innerHTML = `Sueldo disponible: $${formulario.children[2].value}`;
    sueldoDisponible = document.querySelector("#plataDue").value;
    document.querySelector("#menuModificarJugadores").style.display = "block";
}
//alert
function peticionPOSTClub(){
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: `${nombreClub}`,
                body: `DUEÑO: ${nombreDuenio}\n
                FONDOS: $${plataDuenio}`,
                userId: 0,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
}


function borrarJugador(){
    document.querySelector("#eliminarJug").style.width = "60%";
     document.querySelector("#formularioBorrarJugador").addEventListener("submit", chequearQuiteJugador);
}

function chequearQuiteJugador(e){
    e.preventDefault();
    (document.querySelector("#eliminarJug").value <= id)? quitarJugador() : jugadorNoEncontrado();
    document.querySelector("#eliminarJug").value = "";
}

function jugadorNoEncontrado(){
    alert("Error, el id de jugador no esta en la lista");
}

function quitarJugador(){

    ingresantes.splice(posicionIngresanteABorrar(document.querySelector("#eliminarJug").value), 1);
    Toastify({
        text: `El jugador fue quitado de la lista`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #DC0707, #EE5959)'
        }
    }).showToast();
    actualizarListaJugadores();
}

function posicionIngresanteABorrar(idIngresante){
    const ingresanteABorrar = ingresantes.find((unIngresante) => unIngresante.id == idIngresante);
    actualizarCantidades(ingresanteABorrar, "restar");
    return ingresantes.indexOf(ingresanteABorrar);
}

function borrarContenidoFormJugador(){
    const inputsJugador = document.querySelectorAll(".inputJugador");
    inputsJugador.forEach(inputJ => {
        inputJ.value = "";
    })
}


function formularioDeJugador(){
    let formularioJugador = document.querySelector("#formularioJugador");
    formularioJugador.addEventListener("submit", validarFormularioJugador);
    
}

function validarFormularioJugador(e){
    
    e.preventDefault();
    nombre = document.querySelector("#nombreJug").value;
    edad = document.querySelector("#edadJug").value;
    posicion = document.querySelector("#posicionJug").value;
    sueldo = document.querySelector("#sueldoJug").value;
    if(nombre!="" && edad!="" && posicion!="" && sueldo!=""){
        
        borrarContenidoFormJugador();

    (parseInt(sueldoDisponible) >= parseInt(sueldo)) ? listarIngresante() : saldoInsuficiente();
    }
    else{
        alert("Error, faltan datos del jugador");
    }
}


const desestructurarIngresante = ( {nombre, sueldo} ) => console.log(nombre, sueldo);

//Funcion que devuelve el integrante 7, el del numero de la suerte
function loguearIngresanteDeLaSuerte(arrayIngresantes){
    const [,,,,,,i] = arrayIngresantes;
    console.log(i);
}


function listarIngresante(){
    const ingresante = new JugadorIngresado(id, nombre, edad, posicion, sueldo);
    id++;
    //DESESTRUCTURACION DEL OBJETO INGRESANTE
    desestructurarIngresante(ingresante);


    ingresantes.push(ingresante);
    Toastify({
        text: `${ingresante.nombre} incluido en la lista`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    //DESESTRUCTURACION DEL ARRAY DE INGRESANTES
    loguearIngresanteDeLaSuerte(ingresantes);

    actualizarCantidades(ingresante, "sumar");
    actualizarListaJugadores();
    actualizarMejorPago();




    actualizarBotonConfirmar();
    //eliminarJugador();
}


function saldoInsuficiente(){
    alert("Error: Saldo del club insuficiente para meter al jugador")
}

function actualizarIngresanteMasVeterano(arrayIngresantes){
    elMasVeterano = arrayIngresantes.find((unIngresante) => unIngresante.edad == edadMaxima(arrayIngresantes));
}


function edadMaxima(arrayIngresantes){
    return Math.max(edades(...arrayIngresantes));
}

//Funcion que actualiza el jugador mejor pagado, con su cifra correspondiente
function actualizarMejorPago(){
    sueldo > salarioMaximo && (jugadorSalarioMaximo = nombre);
}


function actualizarCantidades(jugIngresado, operacion){
    if(jugIngresado.posicion == 1){
        (operacion == "sumar")? arqueros++ : arqueros--;
        document.querySelector(".cantArqueros").innerHTML = `Arqueros: ${arqueros}`;
    }
    else if(jugIngresado.posicion == 2){
        (operacion == "sumar")? defensores++ : defensores--;
        document.querySelector(".cantDefensores").innerHTML = `Defensores: ${defensores}`;
    }
    else if(jugIngresado.posicion == 3){
        (operacion == "sumar")? volantes++ : volantes--;
        document.querySelector(".cantVolantes").innerHTML = `Volantes: ${volantes}`;
    }
    else {
        (operacion == "sumar")? delanteros++ : delanteros--;
        document.querySelector(".cantDelanteros").innerHTML = `Delanteros: ${delanteros}`;
    }
    (operacion == "sumar")? sueldoTotal += parseInt(jugIngresado.sueldo) : sueldoTotal -= parseInt(jugIngresado.sueldo);
    document.querySelector(".sueldoTotal").innerHTML = `Sueldo total: $${sueldoTotal}`;
    (operacion == "sumar")? sueldoDisponible -= parseInt(jugIngresado.sueldo) : sueldoDisponible += parseInt(jugIngresado.sueldo);
    document.querySelector(".sueldoDisponible").innerHTML = `Sueldo disponible: $${sueldoDisponible}`;
    (sueldoDisponible <= 10000) && document.querySelector(".sueldoDisponible").classList.add("sueldoBajo");
    (sueldoDisponible <= 5000) && document.querySelector(".sueldoDisponible").classList.add("sueldoMuyBajo");
}


function actualizarListaJugadores(){
    if(ingresantes.length == 0){
        jdores.innerHTML = "";
    }
    else{
        for (const j of ingresantes){
            innerListado += `<div class="jugador jug${j.id}">
                    <div class="jugadorId">
                        <h2>${j.id}</h2>
                    </div>
                    <div class="jugadorDatos">
                        <h2>${j.nombre}</h2>
                        <p>${j.edad} años</p>
                        <p>${j.jugadorPosicion(j.posicion)}</p>
                        <p>Sueldo: $${j.sueldo}</p>
                    </div>
                </div>`;
            jdores.innerHTML = innerListado;
        }
        innerListado="";
    }
    
}


function actualizarBotonConfirmar(){
    cumpleCantJugadores = (arqueros>=1 && defensores>=4 && volantes>=3 && delanteros>=3)? true : false;

    cumpleCantJugadores ? jugadoresSuficientes() : jugadoresInsuficientes();
}


function jugadoresSuficientes(){
    document.querySelector("#mensajeFaltanJugs").innerHTML = "Jugadores suficientes para continuar";
    document.querySelector("#mensajeFaltanJugs").style.color = "rgba(8, 243, 27, 0.966)";
    document.querySelector("#botonConfirmarJugs").classList.remove("disabled");
}

function jugadoresInsuficientes(){
    document.querySelector("#mensajeFaltanJugs").innerHTML = "¡Todavía faltan jugadores!";
}



//Funcion que recibe un array de objetos clase "Jugador" y devuelve sus respectivos nombres
function nombres(arrayJugadores){
    return arrayJugadores.map((unJugador) => unJugador.nombre);
}


//Funcion que recibe un array de objetos clase "Jugador" y devuelve sus respectivos sueldos
function sueldos(arrayJugadores){
    return arrayJugadores.map((unJugador) => unJugador.sueldo);
}


function edades(arrayJugadores){
    return arrayJugadores.map((unJugador) => unJugador.edad);
}


//Funcion que recibe un array de sueldos y devuelve el de mayor valor
function salarioMaximo(arraySueldos){
    let salMax = -999999999;
    arraySueldos.forEach((num) => {
        num > salMax && (salMax = num);
    });
    return salMax;
}


//Funcion que recibe un array de jugadores y devuelve el jugador con el sueldo mas alto
function jugadorSalarioMaximo(arrayJugadores){
    return arrayJugadores.find((unJugador) => unJugador.sueldo == salarioMaximo(sueldos(arrayJugadores)));
}


//Funcion que recibe un array de sueldos y devuelve el resultado de sumarlos todos
function salarioTotal(arraySueldos){
    return arraySueldos.reduce((acumulador, elemento) => acumulador + elemento, 0);
}


//Funcion que recibe un nombre y un array de jugadores, que devuelve el jugador que coincida con el nombre puesto
function buscarJugadorPorNombre(arrayJugadores, nomb){
    return arrayJugadores.find(unJugador => unJugador.nombre == nomb);
}




function guardarDatos(){
    
    Swal.fire({
        title: '¿Está seguro que desea confirmar el equipo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No'
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Confirmado!',
                icon: 'success',
                text: 'El equipo ha sido confirmado'
            })
        }
    })
    localStorage.setItem("ingresantes", JSON.stringify(ingresantes));
}


//Funcion que muestra estadisticas de un jugador que se ingrese por teclado
function estadisticaParticular(){
    let jugador = prompt("¿Desea ver el informe de un jugador particular? Ingrese su nombre. De lo contrario, no ingrese nada: \n\n" +
                        "JUGADORES: " + nombres(jugadores).join(" - "));
    
    while(jugador!=""){//Para interrumpir el ciclo, no se debe ingresar nada en el nombre del siguiente jugador
        while(jugador != "" && !(nombres(jugadores).includes(jugador))){
            alert("ERROR, el nombre ingresado no se encuentra en el sistema");
            jugador = prompt("¿Desea ver el informe de un jugador particular? Ingrese su nombre. De lo contrario, no ingrese nada: \n\n" +
            "JUGADORES: " + nombres(jugadores).join(" - "));
        }

        let jugadorBuscado = buscarJugadorPorNombre(jugadores, jugador);

        let informe = "Nombre: " + jugadorBuscado.nombre + "\n" + 
                "Edad: " + jugadorBuscado.edad + "\n" + 
                "Posicion: " + jugadorBuscado.posicion + "\n" + 
                "Partidos: " + jugadorBuscado.partidos + "\n" + 
                "Promedio: " + jugadorBuscado.promedio + "\n" + 
                "Sueldo: $" + jugadorBuscado.sueldo + "\n" + 
                "Infracciones: " + jugadorBuscado.infracciones + "\n\n";

        let rendidor = nombres(rendidores).includes(jugador);
        if(rendidor){
            informe += "Rendidor: SI\n";
        }
        else informe += "Rendidor: NO\n";

        let infractor = nombres(infractores).includes(jugador);
        if(infractor){
            informe += "Infractor: SI\n";
        }
        else informe += "Infractor: NO\n";

        let estrella = nombres(estrellas).includes(jugador);
        if(estrella){
            informe += "Estrella: SI";
        }
        else informe += "Estrella: NO";

        alert(informe);
        jugador = prompt("¿Desea ver el informe de un jugador particular? Ingrese su nombre. De lo contrario, no ingrese nada: ");
    }
}


//-----------------------------------------------------------------------------MENU--------------------------------------------------------------------------------------------------


let jdores = document.querySelector(".jugadores");

formularioDelClub();

formularioDeJugador();

borrarJugador();



//estadisticaParticular();

let botonTerminarJugadores = document.querySelector("#botonConfirmarJugs");
botonTerminarJugadores.addEventListener("click", guardarDatos);
