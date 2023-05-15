console.log("1 - Bonjour dans le P5 - Essai affichage de données ! ");

let art =document.getElementById('items');
art.innerHTML = "<a><article><img><h3>nom de l'article</h3><p>Description de l'article</p></article></a>";

// envoi d'un requête HTTP avec la méthode GET pour récupérer des données enregistrées à ce lien
console.log("2 - avant id fetch");
fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
//récupérer le résultat de la requête au format json
.then(function(resultat) {
    if (resultat.ok) {
        console.log("3 - résultat ok");
        return resultat.json();
    }
})
.then(function(value) {
    // recuperation du resultat
    console.log("4 - recuperation donnees");

})
.catch(function(error) {
    //une erreur est survenue
    console.log("5 - une erreur est survenue");
})

console.log("6 - après fetch");

// création d'un nouvel élément de type article , ajouté dans l'élément ayant pour id "items"
let article = document.createElement("article");
document.getElementById("items").appendChild(article);

let img = document.createElement("img");
// img.src = article.img;
img.src = "http://localhost:3000/images/kanap01.jpeg";
img.alt = "Photo d'un canapé bleu, deux places";
article.appendChild(img);
let productName = document.createElement("h3");
// productName.innerText = article.productName;
productName.classList.add("productName");
article.appendChild(productName);
let productDescription = document.createElement("p");
// productDescription.innerText = article.productDescription;
productDescription.classList.add("productDescription");
article.appendChild(productDescription);

// structure article créé
console.log("7 - structure article créée");