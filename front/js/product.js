// console.table(location);

//---------------------------
// Global Variables Definitions
//---------------------------
// Getting the product Id from the home page via URL 
// (Récupération de l'identifiant du produit passé dans l'url depuis la page d'accueil)
let productId = new URL(location.href).searchParams.get("id");
// -----------------------------------------

// Description des fonctions
// récupération dans l'api product des différentes valeurs associées au numéro d'id
function fillHTML(){
    //   let productId = new URL(location.href).searchParams.get("id");
       fetch("http://localhost:3000/api/products/" + productId)
           .then((resultat) => {
               if (resultat.ok) {
                   return resultat.json();
               }
           })
       
           .then((product) => {
               console.log("produit affiché (product):");
               console.table(product);
               /* -----------------------------------------------------------
                  --- Remplissage de la div Image avec class="item__img"  ---
                  ----------------------------------------------------------- */
               let img = document.createElement("img");
   
               img.src = product.imageUrl;
               img.alt = product.altTxt;
   
               document.getElementsByClassName("item__img")[0]
                   .appendChild(img);
               
               /* --------------------------------------------
                  --- Remplissage des attributs du produit ---
                  -------------------------------------------- */
               // Nom
               fillField('title', product.name)
   
               // Prix
               fillField('price', product.price)
   
               // Description
               fillField('description', product.description)
   
   
               /* --------------------------------
                  --- Remplissage des couleurs ---
                  -------------------------------- */
               let colors_section = document.getElementById('colors')
               
               for (let color of product.colors) {
                 let option = document.createElement('option');       
                 option.innerText = color;
   
                 colors_section.appendChild(option);
               }
   
           })
   
           .catch((error) => {
               //une erreur est survenue
               console.log("The following error appeared: " + error);
           })
   }
// Appel des fonctions
// Affichage sur la page produit de l'élément choisi sur la page d'accueil à partir des données de l'API
fillHTML();

// Array Cart (Déclaration du tableau panier )
// un panier est considéré comme un tableau sur lequel plusieurs actions peuvent être menées
let cart = [];
// console.log("panier déclaré (cart): ", cart)

// -----------------
// création d'un objet : productSelected, pour capter les données sélectionnées dans l'écran
// function get pour récupérer le tableau panier
// function find pour rechercher une valeur dans le tableau
// function sort pour trier le tableau
// function add pour ajouter le produit dans le panier si (id+color not founded)
// function map pour modifier la quantité si (id+color founded) 

let productSelected = {};
productSelected._id = productId; // passage de l'identifiant de l'url, identifiant de l'objet consulté dans l'objet analysé
// console.log("produit affiché à l'écran : ", productSelected);

// prise en compte de la couleur choisie - EcouteAnalyse du clic
let colorSelection = document.querySelector("#colors"); // accès au champ Couleur
colorSelection.addEventListener("input",(cs) => {
    let colorSelected;
    colorSelected = cs.target.value; //récupération de la valeur de la cible de l'événement dans couleur
    productSelected.color = colorSelected;// ajout de la couleur dans l'objet pour le panier 
    console.log("couleur dans addEventlistener - productSelected.color :" , productSelected.color); // verif ok
    });

// Prise en compte de la quantité saisie - EcouteAnalyse du clic
let quantitySelection = document.querySelector('input[id="quantity"]');
quantitySelection.addEventListener("input", (itemQuantity) => {
    productSelected.quantity = itemQuantity.target.value; // ajout de la quantity dans l'objet pour le panier
    parseInt(productSelected.quantity);// transformation en valeur numérique : est ce utile à cet endroit ? puisqu'il est rajouté sur chaque test ? Est ce qu'il n'aurait pas été possible d'écrire :
    // productSelected.quantity = parseInt(productSelected.quantity) une fois pour toutes, et utiliser ensuite productSelected.quantity dans les opérations de contrôle ?
    console.log("quantité sélectionnée  dans function de récupération:", productSelected.quantity); // verif ok
    });
console.log("produit affiché à l'écran, avec couleur et quantité sélectionnées : ", productSelected); // => ne s'affiche pas, pourquoi ?

// --------------------------------------------------
// BAC : Action Click for ButtonAddCart (bouton "Ajout au panier")
// --------------------------------------------------
// déclaration d'une variable pour accéder au bouton dont l'id est "addToCart"
let addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click",() => {
    // contrôle de la sélection d'une couleur et de la saisie d'une quantité 
    // pourquoi () sans paramètre ?
    console.log("produit affiché à l'écran, avec couleur et quantité sélectionnées, suite clic bouton  : ", productSelected); // verif ok
    console.log("quantité prise en compte, quand non sélectionnée :", productSelected.quantity);// undefined
    console.log("couleur affichée quand non sélectionnée : ", productSelected.color); // undefined
    if (
        parseInt(productSelected.quantity) < 1 ||
        parseInt(productSelected.quantity) > 100 ||
        productSelected.quantity === undefined ) {
            alert("pour ajouter un article au panier, une quantité non nulle doit être saisie");
            } else {
                if (
                    productSelected.color === "" ||
                    productSelected.color === undefined) {
                        alert("pour ajouter un article au panier, une couleur doit être sélectionnée");
                        } else {
                            // ajout dans le panier du produit sélectionné à l'écran
                            addToTheCart(productSelected); // verif ok sans test
                            // changement du libellé du bouton à la fin de l'ajout
                            document.querySelector("#addToCart").textContent = "Ajout effectué"; // verif ok
                            }
            }
        }) ;
// TO DO
// ayant changé le libellé du bouton Ajout au panier en Ajout effectué
// prévoir de revenir au libellé initial si
// - retour à page accueil pour changement de produit 
// - modification couleur ou quantité

// --------------------
// ATTC : Fonction AddToTheCart pour ajout dans le panier d'un produit générique
function addToTheCart(product){

    console.log("dans ATTC avt recup panier article sélectionné déclaré (productSelected):", product);
    
    let cart = getCart(); // récupération du panier : Vide ou non vide ?

    console.log("panier ATTC : ", cart); // verif ok

   if(cart != null) {
        // si panier non vide
        console.log("ATTC - identifiant recherché panier non vide: ", product._id, ", couleur : ", product.color, ", produit : ", product);

        // recherche dans le panier tableau s'il y a un produit p dont l'id est égal à l'id du produit sélectionné à ajouter
        let foundProduct = cart.find((p) => 
          p._id === product._id && p.color === product.color);
        alert("identifiant de product : ", product._id, ", couleur de product : ", product.color );

        if (foundProduct != undefined) {
            // convertir les variables en utilisant parseInt
            // calcul de la nouvelle quantité
            foundProduct.quantity=parseInt(product.quantity)+parseInt(foundProduct.quantity);
            // ajout de la quantité dans le panier
            // réutiliser une fonction du tableau pour mettre à jour le tableau
            // function map retourne un tableau
            // function ternaires ? (vrai) et : (faux) remplace if et else
            cart.map((p) => p._id === product._id ?  {...p, quantity: foundProduct.quantity } : p)

            // spread operator : ...p pour la totalité de l'objet p, donc entre{}

        }else{
            console.log("panier vide, ajouter le produit : ", product);
            // ajouter un produit dans le panier function push
            cart.push(product);
        }
        // sauvegarder le panier
        saveCart(cart);
    }else{
        console.log("panier vide dans ATTC : ", cart);
        cart.push(product);
        saveCart(cart);
        console.log("push");
    }
  
}



// remplissage des champs à partir d'une clé associée à une valeur
function fillField(id, text) {
    document.getElementById(id).innerText = text;
}


// --------------------
// SC : fonction permettant d'enregistrer le panier désigné par le paramètre "cart" dans le localstorage
// le local storage est une api qui permet de conserver des données, en enregistrant une valeur associée à une clé
// le localstorage n’est pas capable d’enregistrer une donnée complexe comme un tableau ;
// il faut transformer le tableau, donnée complexe, en une chaine de caractère avec JSON.stringify
// --------------------
function saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
    console.log("function saveCart(cart) : enregistrement du panier dans le local storage");
}
// --------------------
// GC : fonction pour récupérer le panier vide ou avec des valeurs
// GC : Si avec valeurs, récupération avec JSON.parse pour transformer la chaîne de caractère dans le tableau cartWithProduct
function getCart(){
    let cart = localStorage.getItem("cart");
    console.log("function getCart (récupération du panier vide ou existant) : ", cart);
    if(cart === null) {
        console.log("panier vide :");
        return [];// renvoi du tableau vide
    }else{
        console.log("panier renseigné :", cart);
        console.table(cart);
        return JSON.parse(cart); // renvoi du tableau renseigné
        cartWithProduct = JSON.parse(cart);
        }
}
// -----------------------
// écriture de l'article sélectionné
// ------------------
/*
function fillProductSelected (){
    let productSelected = {};
    productSelected._id = productId;
    let colorSelected ;
    let quantitySelected ;
    console.log("variables déclarées : ", productSelected," et c : ", colorSelected, " et q : ", quantitySelected);

    // prise en compte de la couleur choisie
    let colorSelection = document.querySelector("#colors");
    colorSelection.addEventListener("input",(colorSel) => {
        colorSelected = colorSel.target.value; // récupération de la couleur sélectionnée
        productSelected.color = colorSelected;// ajout de la couleur dans l'objet pour le panier 
        console.log("couleur sélectionnée :" , productSelected.color);
    });

        // Prise en compte de la quantité saisie
        let quantitySelection = document.querySelector('input[id="quantity"]');
        quantitySelection.addEventListener("input", (quantitySel) => {
            quantitySelected = quantitySel.target.value; // récupération de la quantité saisie
            productSelected.quantity = quantitySelected; // ajout de la quantity dans l'objet pour le panier
            console.log("article sélectionné  :", productSelected);
        })
        return productSelected;
}
*/

