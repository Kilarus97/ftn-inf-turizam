`use strict`

class Tura {
    constructor(naziv,opis,duzina,tagovi) {
        this.naziv = naziv
        this.opis = opis
        this.duzina = duzina
        this.tagovi = tagovi
    }
}

let Tura1 = new Tura('Carski Drum','Carski Drum koji su nekada koristili sultani proteze se od Beograda do Istanbula',951,'Istorija,Istanbul,Beograd,Srednji Vek')
let Tura2 = new Tura('Kanjon Morace','Morača je relativno mala reka,Njen kanjon je deo glavnog puta preko kog se dolazi do Podogrice',420,'Crna Gora,Priroda,Reka,Balkan')

let nizTura = [Tura1,Tura2]

ispisiUTabeli(nizTura)
isisDetaljaNaKlik()
preuzimanjePodatakaSaForma(nizTura)


function preuzimanjePodatakaSaForma(nizTura) {
    let submitBtn = document.querySelector('#dugmici')

    submitBtn.addEventListener('click',function(event){
        event.preventDefault();

        const forma = document.querySelector('#kreiraj');
        const formaData = new FormData(forma);
        
        const naziv = formaData.get('naziv');
        const opis =formaData.get('Opis');
        const duzina = formaData.get('Duzina');
        const tagovi = formaData.get('Tagovi')


        let novaTura = new Tura(naziv,opis,duzina,tagovi);
        nizTura.push(novaTura);
        
        sacuvajArtikalUlokalStorage(nizTura);
        ispisiUTabeli(nizTura)
})
}


function isisDetaljaNaKlik() {

    const tabela = document.querySelector('#artikli');
    const ispisNaziv = document.querySelector('#ispisNaziv');
    const ispisOpis = document.querySelector('#ispisOpis');
    const ispisDuzina = document.querySelector('#ispisDuzina');
    const ispisTagovi = document.querySelector('#ispisTagovi');

    tabela.addEventListener('click',(event) => {
        const red = event.target.closest('tr');

        if (red && red.rowIndex > 0){
            const nazivTure = red.querySelector('td').textContent;
            const tura = nizTura.find(a => a.naziv == nazivTure);
                if(tura) {
                    ispisNaziv.textContent = tura.naziv;
                    ispisOpis.textContent = tura.opis;
                    ispisDuzina.textContent = tura.duzina + ' KM';
                    ispisTagovi.textContent = tura.tagovi;
                }
        }
    });
}


function ispisiUTabeli(nizTura) {

    let tabela = document.querySelector("#artikliBody")
    tabela.innerHTML = '';


    for(tura of nizTura){
    let noviRed = tabela.insertRow()

    let nazivCell = noviRed.insertCell()
    nazivCell.textContent = tura.naziv

    let duzinaCell = noviRed.insertCell()
    duzinaCell.textContent = tura.duzina
    }

}

function sacuvajArtikalUlokalStorage(nizTura){
    console.log("Čuvanje u localStorage:", nizTura);
    localStorage.setItem("ture",JSON.stringify(nizTura))
}

function ucitajArtikalIzLokalStorage(){
    let sacuvaniPodaci = localStorage.getItem("ture")

    if(sacuvaniPodaci){
        nizTura = JSON.parse(sacuvaniPodaci)
        console.log(nizTura)
        ispisiUTabeli(nizTura);
    }
}

document.addEventListener("DOMContentLoaded", ucitajArtikalIzLokalStorage);