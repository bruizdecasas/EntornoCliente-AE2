console.log("comprobado");

const URL_DESTINO = "http://localhost:5500/AE2Cliente/"
const RECURSO = "precios.json"

    function cargarTamanos() {

        let xmlHttp = new XMLHttpRequest()

        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    procesarRespuesta(this.responseText)
                } else {
                    alert("Es una trampa!!")
                }
            }
        }

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
    }

    function procesarRespuesta(jsonDoc) {
        var objetoJson = JSON.parse(jsonDoc)
        console.log(objetoJson)

        var table = "<tr><th>Tamaño</th><th>Precio</th></tr>";
        var arrayTamaños = objetoJson.size;
        console.log(arrayTamaños[0].precio) //comprobando que funciona
        
        
        for (let i = 0; i < arrayTamaños.length; i++) {
            table += "<tr><td>" + arrayTamaños[i].tamaño + "</td>" + 
                "<td>" + arrayTamaños[i].precio + "</td></tr>";
        }

        tamano.innerHTML = table;

        console.log(table)
    }
