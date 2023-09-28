// VARIABLES
const urlAPI = "http://localhost:3000/api/products";

// FONCTION de récupération des données articles disponibles à partir de l'API

function readArticle() {
  fetch(urlAPI)
    //récupération du résultat de la requête au format json
    .then((resultat) => {
      if (resultat.ok) {
        // stockage des données dans un fichier json
        return resultat.json();
      }
    })

    .then((products) => {
      // traitement des données récupérées en json pour les afficher dans les bons champs
      // recuperation du resultat, en utilisant la boucle for of et en chargeant les éléments

      for (let product of products) {
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

        // modification de l'url pour passer l'id de l'article sélectionné
        a.href += "?id=" + product._id;
      }
    })

    .catch(function (error) {
      console.log("l'erreur ", error, " est survenue");
    });
}
// APPEL de la fonction créée
readArticle();
