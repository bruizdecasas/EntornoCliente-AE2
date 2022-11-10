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

        
        var arrayTamaños = objetoJsonTamano.size;
        console.log(arrayTamaños[0].tamaño) //comprobando que funciona
        
        const tamañoRadioFieldset = document.createElement ("FIELDSET");
        const tamañoRadioLegend = document.createElement("LEGEND");
        const tamañoRadioLegendText = document.createTextNode("Elige el tamaño de tu pizza: ");
        tamañoRadioLegend.appendChild(tamañoRadioLegendText);
        tamañoRadioFieldset.appendChild(tamañoRadioLegend);

        for (let i = 0; i < arrayTamaños.length; i++) {

            const tamañoRadio = document.createElement("input");
            tamañoRadio.id = arrayTamaños[i].tamaño;
            tamañoRadio.name = (arrayTamaños[i].tamaño);
            tamañoRadio.setAttribute ("type", "radio");
            tamañoRadio.setAttribute ("name", "tamaño");
            tamañoRadio.setAttribute ("value", arrayTamaños[i].tamaño)
            tamañoRadioFieldset.appendChild(tamañoRadio);

            const tamañoLabel = document.createElement("label");
            const tamañoLabelText = document.createTextNode(arrayTamaños[i].tamaño);
            tamañoLabel.setAttribute("for", arrayTamaños[i].tamaño)
            tamañoLabel.appendChild(tamañoLabelText);
            tamañoRadioFieldset.appendChild(tamañoLabel)
        }
        
        tamano.appendChild(tamañoRadioFieldset);
        document.getElementById("tamanoPizza").remove();

       // tamano.innerHTML = tablaTamano;
       
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
