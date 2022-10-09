document.querySelector("#btn-agregar").addEventListener("click", agregar);
document.querySelector("#form").addEventListener("submit", function(e) {e.preventDefault();});
let tabla=  document.querySelector("#tabla");
const URL = "https://62c46d85abea8c085a7591fd.mockapi.io/build/v1";

cargar_json();

async function cargar_json() {
    try {
        let rest = await fetch(URL); //get
        let filtro = null;
        if (document.querySelector("#filtro_linea") != null) {
            filtro = document.querySelector("#filtro_linea").value;
        }
        let json = await rest.json();
        tabla.innerHTML =    `<thead>
                                    <tr>
                                        <th> Invocador </th> 
                                        <th> Linea </th>
                                        <th> Item core </th>
                                        <th> <button id="btn_filtro"> Buscar </button> <select id="filtro_linea">
                                                                                    <option value="CUALQUIERA">CUALQUIERA</option>
                                                                                    <option value="TOP">TOP</option>
                                                                                    <option value="JG">JG</option>
                                                                                    <option value="MID">MID</option>
                                                                                    <option value="ADC">ADC</option>
                                                                                    <option value="SUP">SUP</option>
                                                                                    </select></th>
                                    </tr>
                            </thead>`
        for (let i = 0; i < json.length; i++) {
            if ((filtro == null) || (filtro == "CUALQUIERA")) {    
                tabla.innerHTML += `<tr> 
                                        <td> ${json[i].invocador} </td> 
                                        <td> ${json[i].linea} </td> 
                                        <td> ${json[i].item_core} </td> 
                                        <td> <button class="btn_e" id="${json[i].id}">Editar</button> <button class="btn_b" id="${json[i].id}">Borrar</button></td>
                                    </tr>`;
            }
            else {
                if (filtro == json[i].linea) {
                    tabla.innerHTML += `<tr> 
                                        <td> ${json[i].invocador} </td> 
                                        <td> ${json[i].linea} </td> 
                                        <td> ${json[i].item_core} </td> 
                                        <td> <button class="btn_e" id="${json[i].id}">Editar</button> <button class="btn_b" id="${json[i].id}">Borrar</button></td>
                                    </tr>`;
                }
            }
        }
        document.querySelector("#btn_filtro").addEventListener("click", cargar_json);
        document.querySelectorAll(".btn_b").forEach(boton => {
            boton.addEventListener("click", borrar);
        });
        document.querySelectorAll(".btn_e").forEach(boton => {
            boton.addEventListener("click", editar);
        });
    }
    catch (error) {
        console.log(error);
        tabla.innerHTML = "Hubo un error";
    }
    document.querySelector("#avisos").innerHTML = "";
}

async function agregar() {
    let formulario = document.querySelector("#form");
    let formdata = new FormData(formulario);
    let invocador = formdata.get('invocador');
    let linea = formdata.get('linea');
    let item_core = formdata.get('item_core');
    if ((invocador != "") && (linea != "NINGUNA") && (item_core != "")) {
        try {
            let res = await fetch(URL, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify({"invocador" : invocador, "linea" : linea,"item_core" : item_core})
            });
        
            if (res.status == 201) {
                console.log("Creado!");
            }
        } catch (error) {
            console.log(error);
        }
        cargar_json();
    }
    else {
        document.querySelector("#avisos").innerHTML = `Debe llenar todas las casillas`
    }
}


async function borrar() {
    try {
        let res = await fetch(`${URL}/${this.id}`, {
            "method": "DELETE",
            "headers": { "Content-type": "application/json" }
        });
     
        if (res.status == 200) {
            console.log("Eliminado!");
        }
    } catch (error) {
        console.log(error);
    }
    cargar_json();
}

async function editar() {
    let formulario = document.querySelector("#form");
    let formdata = new FormData(formulario);
    let invocador = formdata.get('invocador');
    let linea = formdata.get('linea');
    let item_core = formdata.get('item_core');
    if ((invocador != "") && (linea != "NINGUNA") && (item_core != "")) {
        try {
            let res = await fetch(`${URL}/${this.id}`, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify({"invocador" : invocador, "linea" : linea,"item_core" : item_core})
            });
        
            if (res.status == 200) {
                console.log("Editado!");
            }
        } catch (error) {
            console.log(error);
        }
        cargar_json();
    }
    else {
        document.querySelector("#avisos").innerHTML = `Debe llenar todas las casillas`
    }
}

