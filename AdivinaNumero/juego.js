
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
let jugadaJSON = {};

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

    }



    console.log(numAdivinar);
}

function cargarHistorico() {
    // cargamos el historico
    let historicoTEMP = localStorage.getItem("historico");

    //Comprobamos si existe
    if (historicoTEMP) {
/*         let historicoTEMP = localStorage.getItem("historico").split(",");

        let i = 0;

        while (i < historicoTEMP.length) {
            let cad = historicoTEMP[i] + ",";
            
            i++;
            cad = cad + historicoTEMP[i] + ",";

            i++;
            cad= cad + historicoTEMP[i];

            historico.push(cad);

            i++;
        } */

        console.log(historicoTEMP);
        historico = historicoTEMP.split(",");

        IDPartida = historico.length;

        
/*         historico.forEach( i => {
            console.log(JSON.stringify(i));
        }
        ); */

        console.log(JSON.stringify(historico[0]));

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

        numIntentos = 0;

        actualizarHistorico("ganado");

    } else {
        if (numIntentos == 0) {
            resultado.innerHTML = "Has fallado";
            imagen.setAttribute("src", "img/fracaso.gif")
            document.getElementById("reset").style.visibility = "visible";

            actualizarHistorico("perdido");

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

function actualizarHistorico(resultado) {
    let partidaJSON = {
        IDPartida : IDPartida,
        nombre : miNombre,
        resultado : resultado
    }

    console.log(partidaJSON);
    console.log(JSON.stringify(partidaJSON));
    historico.push(partidaJSON);

    historico.forEach( i => {
        console.log("Muestra el contenido del historico: " + JSON.stringify(i));
    }
    );
            
    IDPartida++;
    guardarHistorico();
}

function guardarHistorico() {

    localStorage.setItem("historico", historico);
}

window.addEventListener("load", comienza, false);