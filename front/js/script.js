console.log("1 - avant id fetch - envoi requête HTTP avec la méthode GET pour récupérer les données enregistrées sur ce lien");
// envoi d'un requête HTTP avec la méthode GET pour récupérer des données enregistrées à ce lien

function readArticle() { 
fetch("http://localhost:3000/api/products")
//récupérer le résultat de la requête au format json
.then(function(resultat) {
    if (resultat.ok) {
        console.log("3 - stockage données dans fichier json value ");
        return resultat.json();
    }
})
.then(function(value) {
    // traitement des données récupérées en json pour les afficher dans les bons champs
    // recuperation du resultat, en utilisant la boucle for of et en chargeant les éléments
    console.table(value);

    for(let product of value) {
  
        // création d'un nouvel élément de type <a> ajouté dans l'élément ayant pour id "items"
        let a = document.createElement("a");
        document.getElementById("items").appendChild(a);

        // création d'un nouvel élément de type article , ajouté dans l'élément <a>"
        let article = document.createElement("article");
        a.appendChild(article);

        const img = document.createElement("img");
        article.appendChild(img);
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        
        let productName = document.createElement("h3");
        article.appendChild(productName);
        productName.classList.add("productName");
        productName.innerText = product.name;

        let productDescription = document.createElement("p");
        article.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerText = product.description;
        
        let product_id = document.createElement("p");
        product_id.innerText = product._id;

        let productPrice = document.createElement("p");
        productPrice.innerText = product.price;

        let productColors = document.createElement("table");
        productColors.innerText = product.colors;

        // données articles affichées et/ou récupérées pour la page produit
        console.log("7 - données articles affichées et/ou récupérées pour la page produit");
        console.log(product.name, product._id, product.price, product.colors )
        
    }

})
.catch(function(error) {
    //une erreur est survenue
    console.log("5 - une erreur est survenue");
})
}
// appel de la fonction créée
readArticle();

console.log("6 - FIN - Après appel fonction");



