'use strict';

class Restoran{
    constructor(naziv, opis, tipKuhinje){
        this.naziv =naziv
        this.tipKuhinje=tipKuhinje
        this.opis = opis
    }
}

let restorani = [];

if (localStorage.getItem("restorani")) {
    let ucitani = JSON.parse(localStorage.getItem("restorani"));
    for (let i = 0; i < ucitani.length; i++) {
        let a = ucitani[i];
        let noviRestoran = new Restoran(a.naziv, a.opis, a.tipKuhinje);
        restorani.push(noviRestoran);
    }
} else {
    let italija = new Restoran("Italijanski kutak", "Autenticni ukusi italije u centru grada", "Italijanska");
    let kina = new Restoran("Zlatni stapic", "Ne plimamo kalticu", "Kineska");
    let srbija = new Restoran("Gurmanova oaza", "Autenticni ukusi nasih prostora", "Srpska, Balkanska");
    restorani = [italija, kina, srbija];
    localStorage.setItem("restorani", JSON.stringify(restorani));
}


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

function dodajRestoran(){
    let dugme = document.querySelector("#dodaj")
    let dugmePlus = document.querySelector("#tipKuhinje")
    dugmePlus.addEventListener('click', function(){
        let input = document.querySelector("#kuhinja")
        let vrednost = input.value.trim()

        let kuhinjeDiv = document.querySelector("#kuhinjeDodate");

        let red = document.createElement("div");
        red.className = "kuhinjaRed";

        let tip = document.createElement("span")
        tip.textContent = vrednost

        let dugmeMinus = document.createElement("button");
        dugmeMinus.textContent = "-";
        dugmeMinus.type = "button";
        dugmeMinus.id = "obrisi";
        dugmeMinus.style.width = "25px";
        dugmeMinus.addEventListener('click', function () {
            red.remove();
        });
        // Sakriveni input koji koristim kako bih sacuvao vrijednosti tipova koje kasnije mogu povuci iz formData.getAll("kuhinja")
        let hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "kuhinja";
        hiddenInput.value = vrednost;

        red.appendChild(tip);
        red.appendChild(hiddenInput);
        red.appendChild(dugmeMinus);
        kuhinjeDiv.appendChild(red);
    
        input.value = ""; // da obrisem input polje tipa svaki put kada kliknem +
    })



    dugme.addEventListener('click', function(){
        let form = document.querySelector("#forma")
        let formData = new FormData(form)

        let naziv = formData.get("naziv")
        let tipKuhinje = formData.getAll("kuhinja")
        let opis = formData.get("opis")

        //Primjetio sam da prilikom ispisa imam zarez ispred prvog tipa Kuhinje
        //Vjerovatno niz tipKuhinje ima na indeksu 0 prazan string ali ne znam zasto pa cu filtrirati ispod
        let filtriraneKuhinje = [];
        for (let i = 0; i < tipKuhinje.length; i++) {
            let t = tipKuhinje[i];
            if (t.trim() !== "") {
            filtriraneKuhinje.push(t);
            }
        }
        let string = filtriraneKuhinje.join(", ");

        let noviRestoran = new Restoran (naziv,opis,string)
        restorani.push(noviRestoran)

        localStorage.setItem("restorani", JSON.stringify(restorani));

        kreirajRedove()
        form.reset();
        let kuhinjeDiv = document.querySelector("#kuhinjeDodate");
        kuhinjeDiv.innerHTML=""
    })
}

function prikaziDetalje(restoran){
    let p = document.createElement("p")
    p.innerHTML ="Naziv: "+restoran.naziv +"<br>Tip Kuhinje: "+ restoran.tipKuhinje + "<br>Opis: "+restoran.opis
    let detalji = document.querySelector("#detalji")
    detalji.style.display = "block";
    detalji.innerHTML=""
    detalji.appendChild(p)
}

function pokreniStranicu(){
    kreirajRedove()
    dodajRestoran()
}

document.addEventListener('DOMContentLoaded', pokreniStranicu)
