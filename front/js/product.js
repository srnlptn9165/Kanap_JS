// console.table(location);

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
            console.log("product :");
            console.log("product._id dans fetch: ", product._id);
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

// fonction permettant d'enregistrer le panier désigné par le paramètre "cart" dans le localstorage
// le local storage est une api qui permet de conserver des données, en enregistrant une valeur associée à une clé
// un panier est considéré comme un tableau sur lequel plusieurs actions peuvent être menées
// le localstorage n’est pas capable d’enregistrer une donnée complexe comme un tableau ;
// il faut transformer le tableau, donnée complexe, en une chaine de caractère avec JSON.stringify

function saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
    console.log("1/ fonction de création du panier dans le local storage");
}
// fonction permettant de récupérer le panier avec JSON.parse qui permet de transformer la chaîne de caractère en tableau
function getCart(){
    let cart = localStorage.getItem("cart");
    console.log("2/ fonction de récupération du panier vide ou existant : ")
    if(cart == null) {
        return [];
        console.log("panier vide");
    }else{
        return JSON.parse(cart);
        console.log("panier :");
        console.table("cart");
    }
}

// fonction d'ajout au panier d'un produit particulier
function addToTheCart(product){
    // récupération du panier présent dans le localStorage
    console.log("3/ fonction d ajout : ")
    let cart = getCart();
    console.log("récupération du panier => ")
    // recherche du produit existant, pour gérer la quantité plutôt que de dupliquer le produit
    let productId = new URL(location.href).searchParams.get("id");
    fetch("http://localhost:3000/api/products/" + productId)
        .then((resultat) => {
            if (resultat.ok) {
                return resultat.json();
            }
        })
        .then((product) => {
            console.log("product._id dans fetch2: ", product._id);
            let foundProduct = cart.find(p => p.id == product._id);
            console.log("recherche du produit : ", foundProduct);
            console.log("product._id : ", product._id);
                if(foundProduct != undefined){
                foundProduct.quantity++;
            }else{
                console.log("product._id dans else : ", product._id, ", --- qte : ", quantity);
                product.quantity=1;
                cart.push(product); // ajout (push) du produit dans le tableau (panier)
            }
        
            // sauvegarde du panier
            saveCart(cart);
            console.log("enregistrement du panier")
        })
        .catch((error) => {
            //une erreur est survenue
            console.log("The following error appeared: " + error);
        })
    }

    let addToCart = document.querySelector("#addToCart");
    // fonction addToTheCart sans les () pour ne pas déclencher immmédiatement l'action
    addToCart.addEventListener("click",addToTheCart);
