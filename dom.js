const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "precios.json"

function llamadaHttp(funcion) {
    // Nos ayudaremos de esta función para traernos lo datos que tenemos guardados en nuestro JSON. 
    let xmlHttpTamano = new XMLHttpRequest()

    xmlHttpTamano.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                funcion(this.responseText)
            } else {
                alert("Es una trampa!!")
            }
        }
    }

    xmlHttpTamano.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttpTamano.send(null)

}

function cargarDatos() {
    llamadaHttp(procesarRespuesta)
}

function refrescar() {
    cargarDatos();
}


function procesarRespuesta(jsonDocTamano) {
    // Dentro de esta función construiremos el DOM. Primero parseando las datos recibidos para poderlos manejar. 

    var objetoJsonTamano = JSON.parse(jsonDocTamano)
    var arrayIngredientes = objetoJsonTamano.ingredientes;

    const ingredientesCheckboxFieldset = document.createElement("FIELDSET");
    const ingredientesCheckboxLegend = document.createElement("LEGEND");
    ingredientesCheckboxFieldset.setAttribute("id", "ingredientesFieldset");
    const ingredientesCheckboxLegendText = document.createTextNode("Elige tus ingredientes: ");
    ingredientesCheckboxLegend.appendChild(ingredientesCheckboxLegendText);
    ingredientesCheckboxFieldset.appendChild(ingredientesCheckboxLegend);

    // Aqui iteramos en el array de ingredientes, y contruimos el DOM gracias a un for
    for (let i = 0; i < arrayIngredientes.length; i++) {
        const ingredientesCheckbox = document.createElement("input");
        ingredientesCheckbox.id = arrayIngredientes[i].nombreIngrediente;
        ingredientesCheckbox.name = arrayIngredientes[i].nombreIngrediente;
        ingredientesCheckbox.setAttribute("type", "checkbox");
        ingredientesCheckbox.setAttribute("name", "ingredientesCheckbox");
        ingredientesCheckbox.setAttribute("value", arrayIngredientes[i].nombreIngrediente)
        ingredientesCheckboxFieldset.appendChild(ingredientesCheckbox);

        const ingredientesLabel = document.createElement("label");
        const ingredientesLabelText = document.createTextNode(arrayIngredientes[i].nombreIngrediente);
        ingredientesLabel.setAttribute("for", arrayIngredientes[i].nombreIngrediente)
        ingredientesLabel.appendChild(ingredientesLabelText);
        ingredientesCheckboxFieldset.appendChild(ingredientesLabel)
    }

    ingredientes.appendChild(ingredientesCheckboxFieldset);

    var arrayTamaños = objetoJsonTamano.size;

    const tamañoRadioFieldset = document.createElement("FIELDSET");
    const tamañoRadioLegend = document.createElement("LEGEND");
    tamañoRadioFieldset.setAttribute("id", "tamanoFieldset");
    const tamañoRadioLegendText = document.createTextNode("Elige el tamaño de tu pizza: ");
    tamañoRadioLegend.appendChild(tamañoRadioLegendText);
    tamañoRadioFieldset.appendChild(tamañoRadioLegend);

    // Aqui iteramos en el array de size, y contruimos el DOM gracias a un for
    for (let i = 0; i < arrayTamaños.length; i++) {
        const tamañoRadio = document.createElement("input");
        tamañoRadio.id = arrayTamaños[i].tamaño;
        tamañoRadio.name = arrayTamaños[i].tamaño;
        tamañoRadio.setAttribute("type", "radio");
        tamañoRadio.setAttribute("name", "tamaño");
        tamañoRadio.setAttribute("value", arrayTamaños[i].tamaño)
        tamañoRadioFieldset.appendChild(tamañoRadio);

        const tamañoLabel = document.createElement("label");
        const tamañoLabelText = document.createTextNode(arrayTamaños[i].tamaño);
        tamañoLabel.setAttribute("for", arrayTamaños[i].tamaño)
        tamañoLabel.appendChild(tamañoLabelText);
        tamañoRadioFieldset.appendChild(tamañoLabel)
    }

    tamano.appendChild(tamañoRadioFieldset);

    if (!!document.getElementById("tamanoPizza")) {
        document.getElementById("tamanoPizza").remove(); // Solo se elimina el botón de cargar, la primera vez, después ya no existe. 
    } else {
        document.getElementById("tamanoFieldset").remove();
        document.getElementById("ingredientesFieldset").remove(); // Eliminamos los anteriores parrafos de tamaño e ingredientes, para que no se dubliquen una vez clickamos en refrescar. 
    }


}

function calcularPrecio() {
    // Nos traemos los datos de los precios, para calcular el precio de la pizza.
    llamadaHttp(procesarPrecio)
}

function procesarPrecio(jsonDocPrecio) {
    // Dentro de esta función calcularemos el precios del pedido, y además saldrá una alerta con el precio total a pagar. 
    var objetoJsonPrecio = JSON.parse(jsonDocPrecio)
    var arrayTamaños = objetoJsonPrecio.size;
    var arrayIngredientes = objetoJsonPrecio.ingredientes;

    var precioPizzaSeleccionado = 0; //Creamos la variable para recoger el valor del for por el tamaño y el for de los ingrediente
    var precioPizzaTamaño = 0;
    var precioPizzaIngredientes = 0;
    tamano = document.getElementsByName("tamaño");

    for (var i = 0; i < tamano.length; i++) {
        if (tamano[i].checked) {
            precioPizzaTamaño = arrayTamaños[i].precio;
            break;
        }
    }

    ingredientesPrecio = document.getElementsByName("ingredientesCheckbox")

    for (var j = 0; j < ingredientesPrecio.length; j++) {
        if (ingredientesPrecio[j].checked) {
            precioPizzaIngredientes = precioPizzaIngredientes + arrayIngredientes[j].precioIngrediente;
        }
    }

    precioPizzaSeleccionado = precioPizzaTamaño + precioPizzaIngredientes; //Incrementamos el precio de la pizza el valor de cada ingrediente seleccionado.
    alert("el precio de tu pizza es " + precioPizzaSeleccionado + "€. Ya va en camino");
}

