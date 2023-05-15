console.log("Bonjour dans le P5 - Essai affichage de données ! ");

 let art =document.getElementById('items');
 art.innerHTML = "<a><article><img><h3>productName</h3><p>productDescription</p></article></a>";

// création d'un nouvel élément de type article , ajouté dans l'élément ayant pour id "items"
let article = document.createElement("article");
document.getElementById("items").appendChild(article);

let img = document.createElement("img");
img.src = article.img;
let productName = document.createElement("h3");
productName.innerText = article.productName;
productName.classList.add("productName");
let productDescription = document.createElement("p");
productDescription.innerText = article.productDescription;
productDescription.classList.add("productDescription")

// envoi d'un requête HTTP avec la méthode GET pour récupérer des données enregistrées à ce lien
function readProduct() {
    fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")

    //récupérer le résultat de la requête au format json
    console.log("id fetch")
    .then(function(res) {
        //vérifier que la requête s’est bien passée
        if (res.ok) {
            console.log("if res");
            return res.json();
            }
    })
    .then(function(value) {
        // 

    })
    .catch(function(err) {
        //une erreur est survenue
        console.log("une erreur est survenue");
    })
}
console.log("après fetch");


