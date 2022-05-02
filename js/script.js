var golds = 0;
var gps = 1;

// sauvegarde dans le storage des ruppes 
if (localStorage.getItem("rupees")) {
    golds = parseInt(localStorage.getItem("rupees"))
}

// minions 
const minions = [
    { id: 1, name: "Bombe", cost: 10, gps: 5 },
    { id: 2, name: "Arc_du_héros", cost: 100, gps: 10 },
    { id: 3, name: "larme_de_fée", cost: 1000, gps: 100 },
];

// Initialiser les minions
minions.forEach(minion => {
    if (!localStorage.getItem('owned_' + minion.id)) {
        localStorage.setItem('owned_' + minion.id, '0')
    }

    // Si le cout du minion n'existe pas dans le local storage, l'initialiser avec la valeur par défaut
    if (!localStorage.getItem('cost_' + minion.id)) {
        localStorage.setItem('cost_' + minion.id, minion.cost)
    }

    document.querySelector("#price_" + minion.id).innerHTML = localStorage.getItem('cost_' + minion.id);
})

// calcul des gps 
function refreshGPS() {
    gps = 1;
    minions.forEach(function (minion) {
        gps += minion.gps * parseInt(localStorage.getItem('owned_' + minion.id));
    })
    displayGPS();
}


const gpsInterval = setInterval(function () {
    increment(gps);
}, 1000);


function increment(value) {
    addGolds(value);
    displayGolds();
    change_image();
}

function addGolds(x) {
    golds += x;
    localStorage.setItem("rupees", golds)
}

function displayGolds() {
    //console.log(golds);
    document.querySelector("#golds").innerHTML = golds;
}

function displayGPS() {
    //console.log(gps);
    document.querySelector("#gps").innerHTML = gps;
}

refreshGPS();
displayGolds();


//  acheter les minions
function buyMinion(id) {
    var minion = minions.find(minion => minion.id == id)

    var minionCost = parseInt(localStorage.getItem('cost_' + minion.id));

    if (golds >= minionCost) {
        golds = golds - minionCost;

        const minionOwned = localStorage.getItem('owned_' + minion.id)
        localStorage.setItem('owned_' + minion.id, parseInt(minionOwned) + 1); // + 1 minion à chaque fois 
    } else {
        return;
    }
    refreshGPS();
    // x1.15 sur le prix
    minionCost = Math.round(minionCost * 1.15);


    // On modifie le cout du minion dans le localStorage pour pouvoir le récuperer si on raffraichit la page
    localStorage.setItem('cost_' + minion.id, minionCost)

    document.querySelector("#golds").innerHTML = golds;
    document.querySelector("#price_" + minion.id).innerHTML = minionCost;
}




//style css 
function change_image(imagechange) {

    var imagechange = document.getElementById('imgchange');

    if (imagechange.src.match("../img/7ca49b9dd1838b74a11e8445bdee727f-removebg-preview.png")) {
        imagechange.src = "../img/OoT_Spin_Attack_Artwork.webp";
    }
    else if (imagechange.src = "../img/7ca49b9dd1838b74a11e8445bdee727f-removebg-preview.png");

}

// on verra plus tard, j'vais commencer les autres projets
function animation() {

    var animation = "../img/efeitos-gif-10-unscreen.gif"
    document.getElementById('.animation').src = animation;

}