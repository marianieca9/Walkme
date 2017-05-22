/*global document, window, alert, console, require*/
/*jslint plusplus: true */

/*Ninguna opcion seleccionada, todo vacio*/
function vacioSelected() {
    "use strict";
    
    document.getElementById("separador").style.display = "none";
    
    document.getElementById("textDataBody").style.display = "none";
    document.getElementById("radioSexo").style.display = "none";
    document.getElementById("radioSexoH").checked = false;
    document.getElementById("radioSexoM").checked = false;
    document.getElementById("divDataEdad").style.display = "none";
    document.getElementById("textboxEdad").value = "";
    document.getElementById("divDataEstatura").style.display = "none";
    document.getElementById("textboxEstatura").value = "";
    document.getElementById("divDataPeso").style.display = "none";
    document.getElementById("textboxPeso").value = "";
    document.getElementById("botonCalcular").style.display = "none";
    document.getElementById("textTitleResult").style.display = "none";
    document.getElementById("resultadosNumericos").style.display = "none";
    document.getElementById("resultNum").value = "";
    document.getElementById("resultadoTexto").style.display = "none";
    document.getElementById("parrafoResultadoFinal").innerHTML = "";
    document.getElementById("alertCampoVacio").innerHTML = "";
    document.getElementById("alertCampoVacio").style.display = "none";
}


/*Seleccionada una opcion, mostrando input para introducir datos*/
function optionSelected() {
    "use strict";
    
    document.getElementById("separador").style.display = "block";
    document.getElementById("textDataBody").style.display = "block";
    document.getElementById("radioSexo").style.display = "block";
    document.getElementById("radioSexoH").checked = false;
    document.getElementById("radioSexoM").checked = false;
    document.getElementById("divDataEdad").style.display = "block";
    document.getElementById("textboxEdad").value = "";
    document.getElementById("divDataEstatura").style.display = "block";
    document.getElementById("textboxEstatura").value = "";
    document.getElementById("divDataPeso").style.display = "block";
    document.getElementById("textboxPeso").value = "";
    document.getElementById("botonCalcular").style.display = "block";
    document.getElementById("textTitleResult").style.display = "none";
    document.getElementById("resultadosNumericos").style.display = "none";
    document.getElementById("resultNum").value = "";
    document.getElementById("resultadoTexto").style.display = "none";
    document.getElementById("parrafoResultadoFinal").innerHTML = "";
    document.getElementById("alertCampoVacio").innerHTML = "";
    document.getElementById("alertCampoVacio").style.display = "none";
}


/*Comprobar que opcion está seleccionada*/
function cambio() {
    "use strict";
    
    var opcion = document.getElementById("selectTypeCalc").value;
    
    if (opcion.localeCompare("vacio") === 0) {
        vacioSelected();
    } else if (opcion.localeCompare("imc") === 0) {
        optionSelected();
    } else if (opcion.localeCompare("pesoIdeal") === 0) {
        optionSelected();
    } else if (opcion.localeCompare("tmb") === 0) {
        optionSelected();
    }
    
}


/*Calcular IMC*/
function calcularImc(peso, estatura) {
    "use strict";
    
    var imc = peso / Math.pow(estatura, 2);
    
    
    return parseFloat(imc).toFixed(2);
}


/*Calcular Peso Ideal*/
function calcularPesoIdeal(estatura, edad, sexo) {
    "use strict";
    var estaturaCm, pesoIdeal;
    
    estaturaCm = estatura * 100;
    
    pesoIdeal = 50 + (((estaturaCm - 150) * 3) / 4) + ((edad - 20) / 4);
    
    if (sexo.localeCompare("mujer") === 0) {
        pesoIdeal *= 0.9;
    }
    
    return parseFloat(pesoIdeal).toFixed(2);
}


/*Calcular TMB*/
function calcularTMB(sexo, peso, altura, edad) {
    "use strict";
    
    var tmb;
    
    if (sexo.localeCompare("mujer") === 0) {
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    } else if (sexo.localeCompare("hombre") === 0) {
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    }
    
    return parseFloat(tmb).toFixed(2);
}


/*Obtener datos a mostrar*/
function obtenerResultadosTeoricos(imc) {
    "use strict";
    var resultado;
    
    if (imc < 16) {
        resultado = "Delgadez Severa";
    } else if (imc >= 16 && imc < 18.5) {
        resultado = "Delgadez";
    } else if (imc >= 18.5 && imc < 30) {
        resultado = "Complexión Normal";
    } else if (imc >= 30 && imc < 40) {
        resultado = "Obesidad";
    } else if (imc >= 40) {
        resultado = "Obesidad Severa";
    }
    
    return resultado;
}


/*Guardar datos. Comprobar si falta algún dato por rellenar y mostrar error. Si no, realizar calculos*/
function comprobarFormulario() {
    "use strict";
    
    var sexo, alert, radioH, radioM, edad, altura, peso, opcion, result, inputNum, inputText, etiqueta;
    
    alert = document.getElementById("alertCampoVacio");
    
    radioH = document.getElementById("radioSexoH");
    radioM = document.getElementById("radioSexoM");
    
    edad = document.getElementById("textboxEdad").value;
    altura = document.getElementById("textboxEstatura").value;
    peso = document.getElementById("textboxPeso").value;
        
    if (!radioH.checked && !radioM.checked) {
        alert.innerHTML = "Error, no ha seleccionado ningún sexo";
        alert.style.display = "block";
    } else if (radioH.checked || radioM.checked) {
        if (radioH.checked) {
            sexo = radioH.value.toString();
        } else if (radioM.checked) {
            sexo = radioM.value.toString();
        }
        
        if (edad.localeCompare("") === 0) {
            alert.innerHTML = "Error, no ha introducido la edad";
            alert.style.display = "block";
        } else if (edad < 1 || edad > 120) {
            alert.innerHTML = "Error, no ha introducido la edad correctamente. Tiene que estar entre 1 y 120";
            alert.style.display = "block";
        } else if (altura.localeCompare("") === 0) {
            alert.innerHTML = "Error, no ha introducido la estatura";
            alert.style.display = "block";
        } else if (altura < 0.1 || altura > 3) {
            alert.innerHTML = "Error, no ha introducido la estatura correctamente. Tiene que estar entre 0.1 y 3";
            alert.style.display = "block";
        } else if (peso.localeCompare("") === 0) {
            alert.innerHTML = "Error, no ha introducido el peso";
            alert.style.display = "block";
        } else if (peso < 1 || peso > 300) {
            alert.innerHTML = "Error, no ha introducido el peso correctamente. Tiene que estar entre 1 y 300";
            alert.style.display = "block";
        } else {
            alert.innerHTML = "";
            alert.style.display = "none";
            
            opcion = document.getElementById("selectTypeCalc").value;
            inputNum = document.getElementById("resultNum");
            inputText = document.getElementById("parrafoResultadoFinal");
            etiqueta = document.getElementById("etiqueta");
            
            if (opcion.localeCompare("imc") === 0) {
                result = calcularImc(peso, altura);
                etiqueta.innerHTML = "IMC";
                inputText.value = obtenerResultadosTeoricos(result);
                document.getElementById("resultadoTexto").style.display = "block";
            } else if (opcion.localeCompare("pesoIdeal") === 0) {
                etiqueta.innerHTML = "Peso Ideal";
                result = calcularPesoIdeal(altura, edad, sexo);
            } else if (opcion.localeCompare("tmb") === 0) {
                etiqueta.innerHTML = "Tasa Metabolismo Basal";
                result = calcularTMB(sexo, peso, altura, edad);
            }
            
            inputNum.value = result;
            document.getElementById("textTitleResult").style.display = "block";
            document.getElementById("resultadosNumericos").style.display = "block";
 
        }
        
    }

}


