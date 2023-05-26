console.table(location);

function fillField(id, text) {
    document.getElementById(id).innerText = text;
}

function fillHTML(){
    let productId = new URL(location.href).searchParams.get("id");
    fetch("http://localhost:3000/api/products/" + productId)
        .then((resultat) => {
            if (resultat.ok) {
                return resultat.json();
            }
        })
    
        .then((product) => {
            /* -----------------------------------
               --- Remplissage de la div Image ---
               ----------------------------------- */
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
              option.innerText = color

              colors_section.appendChild(option);
            }

        })

        .catch((error) => {
            //une erreur est survenue
            console.log("The following error appeared: " + error);
        })
}

fillHTML();

// le local storage n’est pas capable d’enregistrer une donnée complexe comme un tableau ;
// passer une donnée complexe dans une chaine de caractère avec JSON.stringify
let cart=[];

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart)) ;
    }

//récupérer la chaine sérialisée (transformée en chaine de caractère par stringify) en tableau avec JSON.parse
function getCart(){
    let cart = locaStorage.getItem("cart");
        if(cart==null){
            return [] ; // retourne un panier vide
        } else {
            return JSON.parse(cart) ;
        }
    }

    // récupérer id, quantité, la couleur
function addToCart(product){
    let cart=getCart() ; //on récupère le panier présent dans le localStorage
    
    // find : function qui travaille sur un tableau, qui va chercher un élément sur un tableau par rapport à une conditiion. Je cherche dans mon panier si je trouve un produit avec le même id
    let foundProduct = cart.find(p => p.id==product.id && p.color==product.color) ;
        if (foundProduct != undefined) {
            foundProduct.quantity++ ;
        } else {
            product.quantity=1 ;
            cart.push(product) ; //ajout du produit dans le tableau ;
        }
        saveCart(cart) ;// on enregistre le nouveau panier
    }
    

// enregistrement des éléments dans le panier
const element = document.getElementById("addToCart");
element.addEventListener("click", function(addToCart) {
});
// edition du panier
// console.log(cart);