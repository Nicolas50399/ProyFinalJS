class Jugador {

    constructor(id, nombre, edad, posicion, partidos, promedio, sueldo, infracciones){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.posicion = posicion;
        this.partidos = partidos;
        this.promedio = promedio;
        this.sueldo = sueldo;
        this.infracciones = infracciones;
    }
}

class JugadorIngresado{

    constructor(id, nombre, edad, posicion, sueldo){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.posicion = posicion;
        this.sueldo = sueldo;
    }

    jugadorPosicion(pos){
        if(pos==1)return "ARQUERO";
        else if(pos==2)return "DEFENSOR";
        else if(pos==3)return "VOLANTE";
        else return "DELANTERO";
    }

}

class Club{
    constructor(nombreClub, duenio, fondos){
        this.nombreClub = nombreClub;
        this.duenio = duenio;
        this.fondos = fondos;
    }
}

