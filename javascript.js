function getdata(){
    var a ={ 
        prioridade: 'Urgente',
        descricao: 'Entregar trabalho final DWI',
        local: 'IFC',
        recursosNecessarios: ['Computador', 'Internet', 'Exemplos das aulas anteriores'],
        dataLimite: '2025-12-03 00:00:00',
        matricula: 3030303
    }
    return a
}
function split_string(string){
    let nova_string = string.replace(",","")
    let lista = nova_string.split(" ")
    return lista
}

async function addtarefa() {
    var dados = {
        prioridade : document.getElementById("prioridade").value,
        descricao : document.getElementById("descricao").value,
        recursos : split_string(document.getElementById("recursos").value),
        data : document.getElementById("data").value,
        matricula : document.getElementById("matricula").value
    }
    await fetch("http://159.65.228.63/tarefas", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
}

function redirecionar(url) {
    window.location.href = url;
}
