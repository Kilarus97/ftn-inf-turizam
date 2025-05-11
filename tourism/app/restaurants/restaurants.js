'use strict';

class Restoran{
    constructor(naziv, opis, tipKuhinje){
        this.naziv =naziv
        this.tipKuhinje=tipKuhinje
        this.opis = opis
    }
}

let italija = new Restoran("Italijanski kutak", "Autenticni ukusi italije u centru grada","Italijanska")
let kina = new Restoran ("Zlatni stapic","Ne plimamo kalticu", "Kineska")
let srbija = new Restoran ("Gurmanova oaza", "Autenticni ukusi nasih prostora", "Srpska, Balkanska")

let restorani = [italija, kina, srbija]


function kreirajRedove(){
    let tabela = document.querySelector("#restorani-telo")
    tabela.innerHTML=""
    for (let i=0; i<restorani.length; i++){
        let tr = document.createElement("tr")
        let naziv = document.createElement("td")
        let tipKuhinje = document.createElement("td")

        tr.addEventListener("click", function(){
            prikaziDetalje(restorani[i])
        })

        naziv.textContent = restorani[i].naziv
        tipKuhinje.textContent = restorani[i].tipKuhinje

        tr.appendChild(naziv)
        tr.appendChild(tipKuhinje)

        tabela.appendChild(tr)
    }
}

function prikaziDetalje(restoran){
    let p = document.createElement("p")
    p.innerHTML ="Naziv: "+restoran.naziv +"<br>Tip Kuhinje: "+ restoran.tipKuhinje + "<br>Opis: "+restoran.opis
    let detalji = document.querySelector("#detalji")
    detalji.style.display = "block";
    detalji.innerHTML=""
    detalji.appendChild(p)
}


document.addEventListener('DOMContentLoaded', kreirajRedove())
