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

    //Si un jugador no tiene infracciones, tiene buena conducta
    buenaConducta(){
        return this.infracciones == 0;
    }

    //El rendimiento de un jugador dependerá de ciertas condiciones, que son distintas dependiendo de la posicion en la que juegue
    buenRendimiento(){
        if(this.infracciones <= 2){
            switch(this.posicion){
                case "ARQUERO":
                    return (this.partidos >= 20 && this.promedio >= 8.0);
                case "DEFENSOR":
                    return (this.partidos >= 10 && this.promedio >= 9.0 && this.buenaConducta());
                case "VOLANTE":
                    return (this.partidos >= 15 && this.promedio >= 7.5);
                case "DELANTERO":
                    return (this.partidos >= 25 && this.promedio >= 8.5 && this.buenaConducta());
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