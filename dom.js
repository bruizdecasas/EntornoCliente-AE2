console.log("comprobado tamaño");

const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "precios.json"

   function cargarDatos() {

        let xmlHttpTamano = new XMLHttpRequest()

        xmlHttpTamano.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    procesarRespuesta(this.responseText)
                } else {
                    alert("Es una trampa!!")
                }
            }
        }

        xmlHttpTamano.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttpTamano.send(null)
    }

    function procesarRespuesta(jsonDocTamano) {
        var objetoJsonTamano = JSON.parse(jsonDocTamano)
        console.log(objetoJsonTamano)

        
        var arrayIngredientes = objetoJsonTamano.ingredientes;
        console.log(arrayIngredientes[0].nombreIngrediente) //comprobando que funciona
        
        const ingredientesCheckboxFieldset = document.createElement ("FIELDSET");
        const ingredientesCheckboxLegend = document.createElement("LEGEND");
        const ingredientesCheckboxLegendText = document.createTextNode("Elige tus ingredientes: ");
        ingredientesCheckboxLegend.appendChild(ingredientesCheckboxLegendText);
        ingredientesCheckboxFieldset.appendChild(ingredientesCheckboxLegend);

        for (let i = 0; i < arrayIngredientes.length; i++) {

            const ingredientesCheckbox = document.createElement("input");
            ingredientesCheckbox.id = arrayIngredientes[i].nombreIngrediente;
            ingredientesCheckbox.name = arrayIngredientes[i].nombreIngrediente;
            ingredientesCheckbox.setAttribute ("type", "checkbox");
            ingredientesCheckbox.setAttribute ("name", "ingredientesCheckbox");
            ingredientesCheckbox.setAttribute ("value", arrayIngredientes[i].nombreIngrediente)
            ingredientesCheckboxFieldset.appendChild(ingredientesCheckbox);

            const ingredientesLabel = document.createElement("label");
            const ingredientesLabelText = document.createTextNode(arrayIngredientes[i].nombreIngrediente);
            ingredientesLabel.setAttribute("for", arrayIngredientes[i].nombreIngrediente)
            ingredientesLabel.appendChild(ingredientesLabelText);
            ingredientesCheckboxFieldset.appendChild(ingredientesLabel)
        }
        
        ingredientes.appendChild(ingredientesCheckboxFieldset);

        var arrayTamaños = objetoJsonTamano.size;
        //console.log(arrayTamaños[0].tamaño) //comprobando que funciona
        
        const tamañoRadioFieldset = document.createElement ("FIELDSET");
        const tamañoRadioLegend = document.createElement("LEGEND");
        const tamañoRadioLegendText = document.createTextNode("Elige el tamaño de tu pizza: ");
        tamañoRadioLegend.appendChild(tamañoRadioLegendText);
        tamañoRadioFieldset.appendChild(tamañoRadioLegend);

        for (let i = 0; i < arrayTamaños.length; i++) {

            const tamañoRadio = document.createElement("input");
            tamañoRadio.id = arrayTamaños[i].tamaño;
            tamañoRadio.name = arrayTamaños[i].tamaño;
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
       
    }

    function calcularPrecio() {

        let xmlHttpTamano = new XMLHttpRequest()

        xmlHttpTamano.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    procesarPrecio(this.responseText)
                } else {
                    alert("Es una trampa!!")
                }
            }
        }

        xmlHttpTamano.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttpTamano.send(null)
    }
    
    function procesarPrecio (jsonDocPrecio) {

        var objetoJsonPrecio = JSON.parse(jsonDocPrecio)
        

        var arrayTamaños = objetoJsonPrecio.size;
        //console.log(arrayTamaños[0])
        var arrayIngredientes = objetoJsonPrecio.ingredientes;
        //console.log(arrayIngredientes[3].precioIngrediente)

        var precioPizzaSeleccionado = 0; //Creamos la variable para recoger el valor del for por el tamaño y el for de los ingrediente
        var precioPizzaTamaño = 0;
        var precioPizzaIngredientes = 0;
        tamano = document.getElementsByName("tamaño");

        for(var i=0; i<tamano.length; i++) {
            if(tamano[i].checked) {
                precioPizzaTamaño=arrayTamaños[i].precio;
                break;
            }     
        }
     
        ingredientesPrecio=document.getElementsByName("ingredientesCheckbox")
        
        for(var j=0; j<ingredientesPrecio.length; j++){
            if(ingredientesPrecio[j].checked) {
            precioPizzaIngredientes = precioPizzaIngredientes + arrayIngredientes[j].precioIngrediente;                
            }
        }

        precioPizzaSeleccionado = precioPizzaTamaño + precioPizzaIngredientes; //Incrementamos el precio de la pizza el valor de cada ingrediente seleccionado.
        alert("el precio de tu pizza es " + precioPizzaSeleccionado + "€. Ya va en camino");
        // return precioPizzaSeleccionado; //Devolvemos el precio de la pizza teniendo en cuenta el tamaño y los ingredientes.
        }
