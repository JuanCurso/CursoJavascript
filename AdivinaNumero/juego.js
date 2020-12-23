
const INTENTOS = 5;
let numIntentos = INTENTOS;
let numAdivinar;

let tiradas = [];

/*MANEJO DEL HISTORICO
    [
        {
            IDPartida : number
            nombre : string
            resultado : string //ganado perdido
        }
    ]
*/
let miNombre;
let IDPartida;
let historico = [];


function comienza() {

    actuIntentos();

    document.getElementById("reset").style.visibility = "hidden";
    document.getElementById("puntua").style.visibility = "hidden";

    numAdivinar = parseInt((Math.random()*100)+1);

    miNombre = localStorage.getItem("nombre");
    if (!miNombre || miNombre == "") {
        location.href = "./intro_nombre.html"
    } else {
        document.getElementById("usuario").innerHTML = `<b>Usuario:</b> ${miNombre}`;

        cargarHistorico();

    }



    console.log(numAdivinar);
}

function cargarHistorico() {
    // cargamos el historico

    historico = Partida.cargarPartidas();

    if (historico) {
        IDPartida = historico.length;
    } else {
        IDPartida = 0;
    }


    console.log(IDPartida);
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
    tiradas.push(parseInt(cajaNum));

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

    document.getElementById("numero").value = "";

}

function mostrarResult(accion) {
    const resultado = document.getElementById("result");
    const imagen = document.getElementById("imagen");
    

    document.getElementById("tiradas").innerHTML = tiradas.sort(function(a, b){return a - b}).toString();
    numIntentos--;
    actuIntentos();

    if (accion == "acertado") {
        resultado.innerHTML = `HAS ACERTADO EN ${INTENTOS-numIntentos} INTENTOS`;
        imagen.setAttribute("src", "img/confetti.gif")
        document.getElementById("reset").style.visibility = "visible";
        document.getElementById("puntua").style.visibility = "visible";

        actualizarHistorico(INTENTOS-numIntentos);

        numIntentos = 0;


    } else {
        if (numIntentos == 0) {
            resultado.innerHTML = "Has fallado";
            imagen.setAttribute("src", "img/fracaso.gif")
            document.getElementById("reset").style.visibility = "visible";
            document.getElementById("puntua").style.visibility = "visible";

            actualizarHistorico(INTENTOS-numIntentos);

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

function actualizarHistorico(intentos) {
    let miPartida = new Partida(IDPartida, miNombre, intentos);

    miPartida.mostrarPartida();

    historico.push(miPartida);

            
    IDPartida++;

    Partida.guardarPartidas(historico);
}


window.addEventListener("load", comienza, false);