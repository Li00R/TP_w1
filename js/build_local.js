"use strict";

document.querySelector("#btn-agregar").addEventListener("click",agregar);
document.querySelector("#btn-agregarx3").addEventListener("click",agregarx3);
document.querySelector("#btn-vaciar").addEventListener("click",borrar);

let Builds = [
    {
        "linea": "ADC", 
        "item_core": "Escudo de arco inmortal", 
        "botas": "Grebas de berserker"
    }
]

mostrar();


function agregar(e) {
    e.preventDefault();
    let formulario = document.querySelector("#form");
    let formdata = new FormData(formulario);
    let linea = formdata.get('linea');
    let item_core = formdata.get('item_core');
    let botas = formdata.get('botas');
    if ((linea != "") && (item_core != "") && (botas != "")) {
        let new_array = {
            "linea": linea,
            "item_core": item_core,
            "botas": botas,
        }
        Builds.push(new_array);
        mostrar()
    }
    else {
        document.querySelector("#avisos").innerHTML = `Debe llenar todas las casillas`;
    }
}
function mostrar() {
    let tabla =  document.querySelector("#tabla");
    document.querySelector("#avisos").innerHTML = "";
    tabla.innerHTML = "<thead>" +
        "<tr>" +
            "<th>" + "Linea" + "</th>" +
            "<th>" + "Item core" + "</th>" +
            "<th>" + "Botas" + "</th>" +
        "</tr>" +
    "</thead>";
    for (const i of Builds) {
        tabla.innerHTML += "<tr>" + "<td>" + i.linea + "</td>" + "<td>" + i.item_core + "</td>" + "<td>" + i.botas + "</td>" + "</tr>";
    }
}

function agregarx3(e) {
    e.preventDefault();
    let formulario = document.querySelector("#form");
    let formdata = new FormData(formulario);
    let linea = formdata.get('linea');
    let item_core = formdata.get('item_core');
    let botas = formdata.get('botas');
    if ((linea != "") && (item_core != "") && (botas != "")) {
        let new_array={
            "linea": linea,
            "item_core": item_core,
            "botas": botas,
        }
        for (let i=0; i<3; i++) {
            Builds.push(new_array);
        }
        mostrar();
    }
    else {
        document.querySelector("#avisos").innerHTML = `Debe llenar todas las casillas`;
    }
 }
function borrar(e){
    e.preventDefault();
    Builds = []
    mostrar();
}