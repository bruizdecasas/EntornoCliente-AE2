console.log("comprobado tamaño");

const URL_DESTINO = "http://localhost:5500/AE2Cliente/"
const RECURSO = "precios.json"

   function cargarTamanos() {

        let xmlHttpTamano = new XMLHttpRequest()

        xmlHttpTamano.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    procesarRespuestaTamano(this.responseText)
                } else {
                    alert("Es una trampa!!")
                }
            }
        }

        xmlHttpTamano.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttpTamano.send(null)
    }

    function procesarRespuestaTamano(jsonDocTamano) {
        var objetoJsonTamano = JSON.parse(jsonDocTamano)
        console.log(objetoJsonTamano)

        var tablaTamano = "<tr><th>Tamaño</th><th>Precio</th></tr>";
        var arrayTamaños = objetoJsonTamano.size;
        console.log(arrayTamaños[0].tamaño) //comprobando que funciona
        
        
        for (let i = 0; i < arrayTamaños.length; i++) {
            tablaTamano += "<tr><td>" + arrayTamaños[i].tamaño + "</td>" + 
                "<td>" + arrayTamaños[i].precio + "</td></tr>";
        }

        tamano.innerHTML = tablaTamano;
       
        console.log(tablaTamano)
    }

    function cargarIngredientes() {

        let xmlHttpIngredientes = new XMLHttpRequest()
    
        xmlHttpIngredientes.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    procesarRespuestaIngredientes(this.responseText)
                } else {
                    alert("Es una trampa!!")
                }
            }
        }
    
        xmlHttpIngredientes.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttpIngredientes.send(null)
    }
    
    function procesarRespuestaIngredientes(jsonDocIngredientes) {
        var objetoJsonIngredientes = JSON.parse(jsonDocIngredientes)
        console.log(objetoJsonIngredientes)
    
        var tablaIngredientes = "<tr><th>Ingredientes</th><th>Precio</th></tr>";
        var arrayIngredientes = objetoJsonIngredientes.ingredientes;
        console.log(arrayIngredientes[0].nombreIngrediente) //comprobando que funciona
        
        
        for (let i = 0; i < arrayIngredientes.length; i++) {
            tablaIngredientes += "<tr><td>" + arrayIngredientes[i].nombreIngrediente + "</td>" + 
                "<td>" + arrayIngredientes[i].precioIngrediente + "</td></tr>";
        }
    
    
        ingredientes.innerHTML = tablaIngredientes;
    
        console.log(tablaIngredientes)
    }
