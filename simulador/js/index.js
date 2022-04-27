
//--------------------------------------------------------------------FUNCIONES------------------------------------------------------------------------------------------------------

const agregarBonoRendimiento = (salario) => salario + salario * 0.3;

const agregarBonoJuventud = (salario) => salario + salario * 0.15;

const restarPorInfracciones = (salario, faltas) => salario - 4000 * faltas;


//Funcion que aumenta el salario si el jugador tuvo buen rendimiento
function recompensarPorRendimiento(unJugador){
    if(unJugador.buenRendimiento()){
        sueldo = agregarBonoRendimiento(sueldo);
        if(unJugador.esJoven()){
            sueldo = agregarBonoJuventud(sueldo);
        }
    }
}


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
    asignarNombreClub(formulario.children[0].value);
    asignarDatosDueño(formulario.children[1].value, formulario.children[2].value);
    document.querySelector("#menuModificarClub").style.display = "none";
    document.querySelector(".sueldoDisponible").innerHTML = `Sueldo disponible: $${formulario.children[2].value}`;
    sueldoDisponible = formulario.children[2].value;
    document.querySelector("#menuModificarJugadores").style.display = "block";
}


//Funcion que pide el nombre del jugador
function pedirNombreJugador(){
    nombre = prompt("Ingrese nombre del jugador (Para salir, ingresar cadena vacía)");
    while(jugadores.includes(nombre)){
        alert("ERROR. El nombre ingresado ya esta en el sistema");
        nombre = prompt("Ingrese nombre del jugador (Para salir, ingresar cadena vacía)");
    }
}


//Funcion que pide salario, rendimiento e infracciones del jugador
function pedirEstadisticasJugador(){
    edad = parseInt(prompt("Ingrese edad del jugador"));
    let opcion = parseInt(prompt("Ingrese posicion del jugador\n1-ARQUERO\n2-DEFENSOR\n3-VOLANTE\n4-DELANTERO\n"));
    switch(opcion){
        case 1: 
            posicion="ARQUERO";
            break;
        case 2: 
            posicion="DEFENSOR";
            break;
        case 3: 
            posicion="VOLANTE";
            break;
        case 4: 
            posicion="DELANTERO";
            break;
        default: break;
    }
    partidos = parseInt(prompt("Ingrese partidos del jugador"));
    promedio = parseFloat(prompt("Ingrese promedio del jugador"));
    sueldo = parseInt(prompt("Ingrese salario del jugador"));
    infracciones = parseInt(prompt("Ingrese infracciones del jugador"));
}


function eliminarJugador(){
    let idBorrar;
    
    document.querySelector(`#borrar${idBorrar}`).addEventListener("click", quitarJugador);
}

function quitarJugador(){
    jdores.innerHTML="";
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

    borrarContenidoFormJugador();

    if(sueldoDisponible >= sueldo){
        const ingresante = new JugadorIngresado(nombre, edad, posicion, sueldo);
        ingresantes.push(ingresante);

        actualizarCantidades();
        actualizarListaJugadores();
        actualizarMejorPago();
        actualizarBotonConfirmar();
        //eliminarJugador();
    }

    else{
        alert("Error: Saldo del club insuficiente para meter al jugador")
    }

    
    
}



//Funcion que actualiza el jugador mejor pagado, con su cifra correspondiente
function actualizarMejorPago(){
    if(sueldo > salarioMaximo){
        jugadorSalarioMaximo = nombre;
    }
}


function actualizarCantidades(){
    if(posicion == 1){
        posicion = "ARQUERO";
        arqueros++;
        document.querySelector(".cantArqueros").innerHTML = `Arqueros: ${arqueros}`;
    }
    else if(posicion == 2){
        posicion = "DEFENSOR";
        defensores++;
        document.querySelector(".cantDefensores").innerHTML = `Defensores: ${defensores}`;
    }
    else if(posicion == 3){
        posicion = "VOLANTE";
        volantes++;
        document.querySelector(".cantVolantes").innerHTML = `Volantes: ${volantes}`;
    }
    else {
        posicion = "DELANTERO";
        delanteros++;
        document.querySelector(".cantDelanteros").innerHTML = `Delanteros: ${delanteros}`;
    }
    sueldoTotal += parseInt(sueldo);
    document.querySelector(".sueldoTotal").innerHTML = `Sueldo total: $${sueldoTotal}`;
    sueldoDisponible -= sueldo;
    document.querySelector(".sueldoDisponible").innerHTML = `Sueldo disponible: $${sueldoDisponible}`;
    if(sueldoDisponible <= 10000){
        document.querySelector(".sueldoDisponible").classList.add("sueldoBajo");
        if(sueldoDisponible <= 5000){
            document.querySelector(".sueldoDisponible").classList.add("sueldoMuyBajo");
        }
    }
}


function actualizarListaJugadores(){
    contador++;
    innerListado += `<div class="jugador jug${contador}">
                <h2>${nombre}</h2>
                <p>${edad} años</p>
                <p>${posicion}</p>
                <p>Sueldo: $${sueldo}</p>
                <button id="borrar${contador} type="button" class="btn btn-danger">Borrar jugador</button>
                </div><br>`;
    jdores.innerHTML = innerListado;
}


function actualizarBotonConfirmar(){
    if(arqueros>=1 && defensores>=4 && volantes>=3 && delanteros>=3){
        document.querySelector("#botonConfirmarJugs").classList.remove("disabled");
    }
}


//Funcion que recibe un array de objetos clase "Jugador" y devuelve sus respectivos nombres
function nombres(arrayJugadores){
    return arrayJugadores.map((unJugador) => unJugador.nombre);
}


//Funcion que recibe un array de objetos clase "Jugador" y devuelve sus respectivos sueldos
function sueldos(arrayJugadores){
    return arrayJugadores.map((unJugador) => unJugador.sueldo);
}


//Funcion que recibe un array de sueldos y devuelve el de mayor valor
function salarioMaximo(arraySueldos){
    let salMax = -999999999;
    arraySueldos.forEach((num) => {
        if(num > salMax){
            salMax = num;
        }
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






function guardarJugadores(){
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




const infractores = jugadores.filter((unJugador) => !unJugador.buenaConducta());
const rendidores = jugadores.filter((unJugador) => unJugador.buenRendimiento());
const estrellas = jugadores.filter((unJugador) => unJugador.buenRendimiento() && unJugador.buenaConducta() && unJugador.esJoven());

//estadisticaParticular();




let botonTerminarJugadores = document.querySelector("#botonConfirmarJugs");
botonTerminarJugadores.addEventListener("click", guardarJugadores);





