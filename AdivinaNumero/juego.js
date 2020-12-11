
let numIntentos = 5;
let numAdivinar;

/*MANEJO DEL HISTORICO
    [
        {
            nombre : string
            partidas : [
                {
                    id : number
                    resultado : string //acierto fallo
                    njugadas : number //numero de jugadas en las que ha acertado
                }
            ]
        }
    ]
*/
let miNombre;
let indexJugador;
let historico = [];
let jugador = {};

function comienza() {

    actuIntentos();

    document.getElementById("reset").style.visibility = "hidden";

    numAdivinar = parseInt((Math.random()*100)+1);

    miNombre = localStorage.getItem("nombre");
    if (!miNombre || miNombre == "") {
        location.href = "./intro_nombre.html"
    } else {
        document.getElementById("usuario").innerHTML = `<b>Usuario:</b> ${miNombre}`;

        cargarHistorico();

        buscarJugador();
    } 

    console.log(numAdivinar);
}

function cargarHistorico() {
    // cargamos el historico y obtenemos un array con los json
    let stringHistorico = localStorage.getItem("historico");

    if (stringHistorico)
        historico = localStorage.getItem("historico").split(",");
}

function buscarJugador() {

    //recorremos array y buscamos el jugador
    let i = 0;
    let encontrado = false;
    while (i < historico.length && !encontrado) {
        //TODO: buscar al jugador
    }
    
} 
function enviar() {
    if (numIntentos == 0) {
        alert("Recarga la página para comenzar a jugar!!!!!!!")
    } else {
        compruebaNum()
    }
}

function compruebaNum() {
    const cajaNum = document.getElementById("numero").value;

    switch(true) {
        case cajaNum == numAdivinar:
            mostrarResult("acertado");
            break;
        case cajaNum > numAdivinar:
            mostrarResult("menor");
            break;
        case cajaNum < numAdivinar:
            mostrarResult("mayor");
            break;           
    }
}

function mostrarResult(accion) {
    const resultado = document.getElementById("result");
    const imagen = document.getElementById("imagen");

    numIntentos--;
    actuIntentos();

    if (accion == "acertado") {
        resultado.innerHTML = `HAS ACERTADO EN ${5-numIntentos} INTENTOS`;
        imagen.setAttribute("src", "img/confetti.gif")
        document.getElementById("reset").style.visibility = "visible";

        numIntentos = 0;

        actualizarHistorico();

    } else {
        if (numIntentos == 0) {
            resultado.innerHTML = "Has fallado";
            imagen.setAttribute("src", "img/fracaso.gif")
            document.getElementById("reset").style.visibility = "visible";
        } else {
        resultado.innerHTML = "El numero que tienes que adivinar es " + accion;

        }
    }
}

function actuIntentos() {
    const miIntentos = document.getElementById("intentos");

    miIntentos.innerHTML=`Te quedan ${numIntentos} intentos`;
}

function cambiarJugador() {
    localStorage.setItem("nombre", "");
    location.href = "./intro_nombre.html";
}

function actualizarHistorico(id, resultado, jugadas = 0) {
    let partidaJSON = {
        "id" : id,
        "resultado" : resultado,
        "jugadas" : jugadas
    }

    jugador.partida.push(partidaJSON);

    guardarHistorico(jugador);
}

function guardarHistorico(jugador) {
    historico[indexJugador] = jugador;

    localStorage.setItem("historico", historico);
}

window.addEventListener("load", comienza, false);