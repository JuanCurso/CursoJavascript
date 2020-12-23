class Partida {
    constructor(IDPartida, nombre, intentos) {
        this.IDPartida = IDPartida;
        this.nombre = nombre;
        this.intentos = intentos;
    }

    mostrarPartida() {
        console.log("IDPartida: " + this.IDPartida + ", " +
                    "nombre: " + this.nombre + ", " +
                    "intentos: " + this.intentos
        );
    }

    static ordenarPartidas(histPartidas, ordenacion) {
        let histOrdenado = [];

        if (typeof eval(`histPartidas[0].${ordenacion}`) === "string") {
            histOrdenado = histPartidas.sort(
                function(a, b){
                    if (eval(`a.${ordenacion} > b.${ordenacion}`)) return 1;
                    if (eval(`a.${ordenacion} < b.${ordenacion}`)) return -1;
                    return 0;
                }
            );
        } else {
            histOrdenado = histPartidas.sort(
                function(a, b){
                    return eval(`a.${ordenacion} - b.${ordenacion}`)
                }
            );
        }
        histOrdenado = histPartidas.sort(
            function(a, b){
                return eval(`a.${ordenacion} - b.${ordenacion}`)
            }
        );

        return histOrdenado;
    }

    static cargarPartidas() {

        let historico = [];
        let historicoTEMP = localStorage.getItem("historico");

        //Comprobamos si existe
        if (historicoTEMP) {
            historico = JSON.parse(historicoTEMP);
    
            console.log("Mostramos el historico de partidas.");
            historico.forEach(element => {
                let miPartida = new Partida();
                Object.assign(miPartida, element);
                miPartida.mostrarPartida();  
            });
        }

        return historico;
    }
    static guardarPartidas(histPartidas) {
        localStorage.setItem("historico", JSON.stringify(histPartidas));
    }
}