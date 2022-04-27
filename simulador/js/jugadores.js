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

class JugadorIngresado{

    constructor(nombre, edad, posicion, sueldo){
        this.nombre = nombre;
        this.edad = edad;
        this.posicion = posicion;
        this.sueldo = sueldo;
    }

}