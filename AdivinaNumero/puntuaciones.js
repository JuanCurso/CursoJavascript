

let historico = [];


function comienza() {



    historico = Partida.cargarPartidas();

    if (!historico) {
        location.replace("./intro_nombre.html");
    }

    mostrarTabla("IDPartida");
}

function mostrarTabla(orden) {

/*     <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
       </tr> */

       let cad = "";

       let historicoOrden = Partida.ordenarPartidas(historico, orden);

       for (i of historicoOrden) {
           console.log("Rellenamos la tabla");
           
           let miPartida = new Partida();
           Object.assign(miPartida, i);
           
           cad = cad + "<tr>";
           cad = cad + `<th scope="row">${i.IDPartida + 1}</th>`
           cad = cad + `<td>${i.nombre}</td>`
           cad = cad + `<td>${i.intentos}</td>`
           cad = cad + "</tr>"
        }
        
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = cad;


} 
window.addEventListener("load", comienza, false);