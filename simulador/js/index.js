//----------------------------------------------------------------------------CLASES-------------------------------------------------------------------------------------------------

//Clase jugador, con sus respectivos atributos y funciones
class Jugador {

    constructor(nombre, edad, posicion, partidos, promedio, sueldo, infracciones){
        this.nombre = nombre;
        this.edad = edad;
        this.posicion = posicion;
        this.partidos = partidos;
        this.promedio = promedio;
        this.sueldo = sueldo;
        this.infracciones = infracciones;
    }

    //Si un jugador no tiene infracciones, tiene buena conducta
    buenaConducta(){
        return this.infracciones == 0;
    }

    //El rendimiento de un jugador dependerá de ciertas condiciones, que son distintas dependiendo de la posicion en la que juegue
    buenRendimiento(){
        if(this.infracciones <= 2){
            switch(this.posicion){
                case "ARQUERO":
                    return (this.partidos >= 30 && this.promedio >= 8.0);
                case "DEFENSOR":
                    return (this.partidos >= 20 && this.promedio >= 9.0 && this.buenaConducta());
                case "VOLANTE":
                    return (this.partidos >= 26 && this.promedio >= 7.5);
                case "DELANTERO":
                    return (this.partidos >= 35 && this.promedio >= 8.5 && this.buenaConducta());
                default:
                    break;
            }
        }
        return false;
    }

    //Si un jugador tiene 20 años o menos, es joven
    esJoven(){
        return (this.edad <= 25);
    }

}


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
            arqueros++;
            break;
        case 2: 
            posicion="DEFENSOR";
            defensores++;
            break;
        case 3: 
            posicion="VOLANTE";
            volantes++;
            break;
        case 4: 
            posicion="DELANTERO";
            delanteros++;
            break;
        default: break;
    }
    partidos = parseInt(prompt("Ingrese partidos del jugador"));
    promedio = parseFloat(prompt("Ingrese promedio del jugador"));
    sueldo = parseInt(prompt("Ingrese salario del jugador"));
    infracciones = parseInt(prompt("Ingrese infracciones del jugador"));
}


//Funcion que va listando jugadores con su sueldo
function actualizarListado(){
    listado += (nombre + "              $" + sueldo + "\n");
}


//Funcion que actualiza el jugador mejor pagado, con su cifra correspondiente
function actualizarMejorPago(){
    if(sueldo > salarioMaximo){
        jugadorSalarioMaximo = nombre;
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


//Funcion que muestra un listado de jugadores ingresados en la pagina
function mostrarJugadores(){
    for (const j of jugadores){
        contador++;
        inner += `<div class="jugador">
                    <h2>${j.nombre}</h2>
                    <p>${j.edad} años</p>
                    <p>${j.posicion}</p>
                    <p>Sueldo: $${j.sueldo}</p>
                    <button id="borrar${contador} type="button" class="btn btn-danger">Borrar jugador</button>
                    </div><br><br>`;
    }
}


//Funcion que muestra botones de "agregar jugadores" y "terminar equipo" en la pagina
function mostrarBotones(){
    inner += `<button type="button" class="botonTerminarEquipo btn btn-secondary">Agregar jugadores</button>`;
    if(arqueros>=1 && defensores>=4 && volantes>=3 && delanteros>=3){
        inner += `<button type="button" class="botonTerminarEquipo btn btn-success">Terminar Equipo</button>`;
    }
}


//Funcion que muestra en la pagina los resultados finales: jugador con mejor salario, el promedio de sueldo y la clasificacion de jugadores mediante arrays
function mostrarResultados(){
    /*alert(listado);
    alert("El jugador mejor pago fue " + (jugadorSalarioMaximo(jugadores)).nombre + ", con un salario de $" + jugadorSalarioMaximo(jugadores).sueldo);
    
    alert("El promedio de sueldo de todos los jugadores es de $" + (salarioTotal(sueldos(jugadores)) / jugadores.length));
    alert("Jugadores ingresados: " + (nombres(jugadores)).join(", ") + "\n\n" +
            "Jugadores rendidores: " + (nombres(rendidores)).join(", ") + "\n" +
            "Jugadores infractores: " + (nombres(infractores)).join(", ") + "\n\n" +
            "POSIBLES ESTRELLAS EN EL FUTURO: " + (nombres(estrellas)).join(", "));*/
    inner += `<p class="resultadosText">El jugador mejor pago es ${(jugadorSalarioMaximo(jugadores)).nombre}, con un salario de $ ${jugadorSalarioMaximo(jugadores).sueldo}</p><br>
            <p class="resultadosText">El promedio de sueldo de todos los jugadores es de $ ${(salarioTotal(sueldos(jugadores)) / jugadores.length)}</p><br><br>
            <p>Jugadores ingresados: ${(nombres(jugadores)).join(", ")}</p><br>
            <p class="resultadosText">Jugadores rendidores: ${(nombres(rendidores)).join(", ")}</p><br>
            <p class="resultadosText">Jugadores infractores: ${(nombres(infractores)).join(", ")}</p><br>
            <p class="resultadosText">POSIBLES ESTRELLAS EN EL FUTURO: ${(nombres(estrellas)).join(", ")}</p><br>`;
    

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

let nombre;
let edad;
let posicion;
let partidos;
let promedio;
let sueldo;
let infracciones;
let arqueros = 0;
let defensores = 0;
let volantes = 0;
let delanteros = 0;


let listado = "NOMBRE       SALARIO\n";
const jugadores = [];
let equipo = prompt("Ingrese nombre de su equipo");
let nombreEquipo = document.querySelector(".nombreEquipo");
nombreEquipo.innerHTML = equipo;

do{
    pedirNombreJugador();
    if(nombre != ""){
        pedirEstadisticasJugador();
        const jugador = new Jugador(nombre, edad, posicion, partidos, promedio, sueldo, infracciones);
        recompensarPorRendimiento(jugador);
        sueldo = restarPorInfracciones(sueldo, infracciones);

        alert("El salario resultante del jugador es: $" + sueldo); //Se muestra el salario resultante, teniendo en cuenta su rendimiento y restricciones

        const jugadorActualizado = new Jugador(nombre, edad, posicion, partidos, promedio, sueldo, infracciones);
        jugadores.push(jugadorActualizado);

        actualizarListado();
        actualizarMejorPago();
    }
}while(nombre != ""); //Para interrumpir el ciclo, no se debe ingresar nada en el nombre del siguiente jugador
let jdores = document.querySelector(".jugadores");
let inner = "";
let contador = 0;
mostrarJugadores();


const infractores = jugadores.filter((unJugador) => !unJugador.buenaConducta());
const rendidores = jugadores.filter((unJugador) => unJugador.buenRendimiento());
const estrellas = jugadores.filter((unJugador) => unJugador.buenRendimiento() && unJugador.buenaConducta() && unJugador.esJoven());

mostrarResultados();

mostrarBotones();

jdores.innerHTML = inner;
document.main.appendChild(jdores);

estadisticaParticular();