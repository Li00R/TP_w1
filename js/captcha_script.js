"use strict";

document.getElementById("boton_enviar").addEventListener("click", verificar_formulario);
document.getElementById("r_captcha").addEventListener("click", recargar_captcha);
// SERIA VALIDAR NO ENVIAR DATOS
let numeros = "";
for (var i= 0; i < 5; i++) {
    let numero = Math.floor(Math.random() * 10);
    numeros = numeros + numero;
}
document.querySelector("#captcha_numeros").innerHTML = numeros;
function recargar_captcha() {
    numeros = "";
    for (var i= 0; i < 5; i++) {
        let numero = Math.floor(Math.random() * 10);
        numeros = numeros + numero;
    }
    document.querySelector("#captcha_numeros").innerHTML = numeros;
}
function verificar_formulario() {
    let num_input = document.getElementById("captcha_input").value;
    let name = document.getElementById("name_invocador").value;
    console.log(name)
    if (name == "") {
        document.querySelector("#validacion").innerHTML = "Falta nombre de invocador";
    }
    else 
        if (num_input == numeros) {
            document.querySelector("#validacion").innerHTML = "VALIDADO";
        }

    else 
        document.querySelector("#validacion").innerHTML = "CAPTCHA INCORRECTO";
}
