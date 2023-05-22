console.log("1 - avant id fetch - envoi requête HTTP avec la méthode GET pour récupérer les données enregistrées sur ce lien");
// envoi d'un requête HTTP avec la méthode GET pour récupérer des données enregistrées à ce lien

function readArticle() { 
  fetch("http://localhost:3000/api/products")
  
    //récupération du résultat de la requête au format json
    .then((resultat) => {
      if (resultat.ok) {
        console.log("2 - stockage des données dans un fichier json value ");
        return resultat.json();
      }
    })

    .then((value) => {
      // traitement des données récupérées en json pour les afficher dans les bons champs
      // recuperation du resultat, en utilisant la boucle for of et en chargeant les éléments
      console.log("3 - valeurs du résultat : ");
      console.table(value);

      for(let product of value) {

        // création d'un nouvel élément de type <a> ajouté dans l'élément ayant pour id "items"
        let a = document.createElement("a");
        document.getElementById("items").appendChild(a);
        a.href = "./product.html";

        // création d'un nouvel élément de type article , ajouté dans l'élément <a>"
        let article = document.createElement("article");
        a.appendChild(article);

        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        article.appendChild(img);
        
        let productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.innerText = product.name;
        article.appendChild(productName);

        let productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");
        productDescription.innerText = product.description;
        article.appendChild(productDescription);
        
        let product_id = document.createElement("p");
        product_id.innerText = product._id;

        let productPrice = document.createElement("p");
        productPrice.innerText = product.price;

        let productColors = document.createElement("table");
        productColors.innerText = product.colors;

        // données articles affichées et/ou récupérées pour la page produit
        console.log("4 - boucle / données articles affichées et/ou récupérées pour la page produit / Article : ", product.name, " / id : ", product._id, " / prix : ", product.price, " / couleurs : ", product.colors);

        // modification de l'url pour passer l'id de l'article sélectionné
        a.href += "?id=" + product._id;
        console.log("5 - boucle / url avec id :" , a.href);

        let liens = document.querySelectorAll("a");
        console.table("6 - boucle / liens <a> :", liens);
      }
    })

    .catch(function(error) {
      //une erreur est survenue
      console.log("7 - l'erreur ", error, " est survenue");
    })
}
// appel de la fonction créée
readArticle();

console.log("8 - FIN - Après appel de la fonction");

