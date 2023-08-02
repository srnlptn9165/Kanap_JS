//---------------------------
// Global Variables Definitions
//---------------------------
// Getting the product Id from the home page via URL
let productId = new URL(location.href).searchParams.get("id");
// -----------------------------------------

// remplissage des champs à partir d'une clé associée à une valeur
function fillField(id, text) {
  document.getElementById(id).innerText = text;
}

// Description des fonctions
// récupération dans l'api product des différentes valeurs associées au numéro d'id
function fillHTML() {
  //   let productId = new URL(location.href).searchParams.get("id");
  fetch("http://localhost:3000/api/products/" + productId)
    .then((resultat) => {
      if (resultat.ok) {
        return resultat.json();
      }
    })

    .then((product) => {
      /* -----------------------------------------------------------
                  --- Remplissage de la div Image avec class="item__img"  ---
                  ----------------------------------------------------------- */
      let img = document.createElement("img");

      img.src = product.imageUrl;
      img.alt = product.altTxt;

      document.getElementsByClassName("item__img")[0].appendChild(img);

      /* --------------------------------------------
                  --- Remplissage des attributs du produit ---
                  -------------------------------------------- */
      // Nom
      fillField("title", product.name);

      // Prix
      fillField("price", product.price);

      // Description
      fillField("description", product.description);

      /* --------------------------------
                  --- Remplissage des couleurs ---
                  -------------------------------- */
      let colors_section = document.getElementById("colors");

      for (let color of product.colors) {
        let option = document.createElement("option");
        option.innerText = color;

        colors_section.appendChild(option);
      }
    })

    .catch((error) => {
      //une erreur est survenue
      console.log("The following error appeared: " + error);
    });
}
// Appel des fonctions
// Affichage sur la page produit de l'élément choisi sur la page d'accueil à partir des données de l'API
fillHTML();

// Array Cart (Déclaration du tableau panier )
let cart = [];

// création d'un objet : productSelected, pour capter les données sélectionnées dans l'écran
let productSelected = {};
productSelected._id = productId; // passage de l'identifiant de l'url, identifiant de l'objet consulté dans l'objet analysé

// prise en compte de la couleur choisie - EcouteAnalyse du clic
let colorSelection = document.querySelector("#colors");
colorSelection.addEventListener("input", (cs) => {
  let colorSelected = cs.target.value; //récupération de la valeur de la cible de l'événement dans couleur
  productSelected.color = colorSelected; // ajout de la couleur dans l'objet pour le panier
});

// Prise en compte de la quantité saisie - EcouteAnalyse du clic
let quantitySelection = document.querySelector('input[id="quantity"]');
quantitySelection.addEventListener("input", (itemQuantity) => {
  productSelected.quantity = itemQuantity.target.value; // ajout de la quantity dans l'objet pour le panier
  parseInt(productSelected.quantity);
});

// --------------------------------------------------
// BAC : Action Click for ButtonAddCart (bouton "Ajout au panier")
// --------------------------------------------------
let addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click", () => {
  if (
    parseInt(productSelected.quantity) < 1 ||
    parseInt(productSelected.quantity) > 100 ||
    productSelected.quantity === undefined
  ) {
    alert(
      "pour ajouter un article au panier, une quantité non nulle doit être saisie"
    );
  } else {
    if (productSelected.color === "" || productSelected.color === undefined) {
      alert(
        "pour ajouter un article au panier, une couleur doit être sélectionnée"
      );
    } else {
      // ajout dans le panier du produit sélectionné à l'écran
      addToTheCart(productSelected); // verif ok sans test
      // changement du libellé du bouton à la fin de l'ajout
      document.querySelector("#addToCart").textContent = "Ajout effectué"; // verif ok
    }
  }
});

// --------------------
// ATTC : Fonction AddToTheCart pour ajout dans le panier d'un produit générique
function addToTheCart(product) {
  let cart = getCart(); // récupération du panier : Vide ou non vide ?

  if (cart != null) {
    // si panier non vide
    // recherche dans le panier tableau s'il y a un produit p dont l'id est égal à l'id du produit sélectionné à ajouter
    let foundProduct = cart.find(
      (p) => p._id === product._id && p.color === product.color
    );

    if (foundProduct != undefined) {
      // convertir les variables en utilisant parseInt      // calcul de la nouvelle quantité
      foundProduct.quantity =
        parseInt(product.quantity) + parseInt(foundProduct.quantity);
      // ajout de la quantité dans le panier function map
      cart.map((p) =>
        p._id === product._id ? { ...p, quantity: foundProduct.quantity } : p
      );
    } else {
      // ajout du produit dans le panier function push
      cart.push(product);
    }
    saveCart(cart);
  } else {
    cart.push(product);
    saveCart(cart);
    console.log(cart);
  }
}

// --------------------
// SC : fonction permettant d'enregistrer le panier désigné par le paramètre "cart" dans le localstorage
// le local storage est une api qui permet de conserver des données, en enregistrant une valeur associée à une clé
// le localstorage n’est pas capable d’enregistrer une donnée complexe comme un tableau ;
// il faut transformer le tableau, donnée complexe, en une chaine de caractère avec JSON.stringify
// --------------------
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// --------------------
// GC : fonction pour récupérer le panier vide ou avec des valeurs
// GC : Si avec valeurs, récupération avec JSON.parse pour transformer la chaîne de caractère dans le tableau cartWithProduct
function getCart() {
  let cart = localStorage.getItem("cart");
  // console.log(
  //   "function getCart (récupération du panier vide ou existant) : ",
  //   cart
  // );
  if (cart === null) {
    // console.log("panier vide :");
    return []; // renvoi du tableau vide
  } else {
    // console.log("panier renseigné :", cart);

    return JSON.parse(cart); // renvoi du tableau renseigné
    console.table(cart);
    cartWithProduct = JSON.parse(cart);
  }
}
