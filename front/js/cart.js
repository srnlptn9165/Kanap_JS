// récupération du panier
let cart = JSON.parse(localStorage.getItem("cart"));
// variables pour calcul du prix total et du nombre total d'articles
let number = 0;
let total = 0;

// Affichage du panier
function getCart() {
  console.log(cart);
  cart.sort();
  console.log(cart);
  // item du localStorage
  for (let item of cart) {
    fetch(`http://localhost:3000/api/products/${item._id}`)
      //récupération du résultat de la requête au format json
      .then((resultat) => {
        if (resultat.ok) {
          // stockage des données dans un fichier json
          return resultat.json();
        }
      })
      // data de product (2ème promise)
      .then((product) => {
        // traitement des données récupérées en json pour les afficher dans les bons champs
        // recuperation du resultat, en utilisant la boucle for of et en chargeant les éléments
        console.log(product);

        let article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.classList.add("cart__item");
        // ajouter data-id="{product-ID}" data-color="{product-color}"

        // <div class="cart__item__img">
        let cartItemImg = document.createElement("div");
        article.appendChild(cartItemImg);
        cartItemImg.classList.add("cart__item__img");

        let img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        cartItemImg.appendChild(img);

        // <div class="cart__item__content__content">
        let cartItemContent = document.createElement("div");
        article.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        // <div class="cart__item__content__description">
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.classList.add(
          "cart__item__content__description"
        );

        // <h2>Nom du produit</h2>
        let productName = document.createElement("h2");
        productName.innerText = product.name;
        cartItemContentDescription.appendChild(productName);

        // <p>Vert</p>
        let productColor = document.createElement("p");
        productColor.innerText = item.color;
        cartItemContentDescription.appendChild(productColor);

        // <p>42,00 €</p>
        let productPrice = document.createElement("p");
        productPrice.innerText = product.price * item.quantity + " €";
        cartItemContentDescription.appendChild(productPrice);
        // calcul du prix total du panier
        total += parseInt(item.quantity) * parseInt(product.price);
        totalPrice.innerText = total.toString();

        // <div class="cart__item__content__settings">
        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.classList.add("cart__item__content__settings");

        // <div class="cart__item__content__settings__quantity">
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.classList.add(
          "cart__item__content__settings__quantity"
        );

        //          <p>Qté : </p>
        let qte = document.createElement("p");
        cartItemContentSettingsQuantity.appendChild(qte);
        qte.innerText = "Qté : ";

        //          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">             </div>
        let itemQuantity = document.createElement("input");
        cartItemContentSettingsQuantity.appendChild(itemQuantity);
        itemQuantity.type = "number";
        itemQuantity.className = "itemQuantity";
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = "1";
        itemQuantity.max = "100";

        itemQuantity.value = item.quantity;
        // calcul la quantité totale de produits dans le panier
        number += parseInt(item.quantity);
        totalQuantity.innerText = number.toString();

        // <div class="cart__item__content__settings__delete">
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.classList.add(
          "cart__item__content__settings__delete"
        );

        // <p class="deleteItem">Supprimer</p>
        let deleteItem = document.createElement("p");
        cartItemContentSettingsDelete.appendChild(deleteItem);
        deleteItem.innerText = "Supprimer";
      });
  }
}

getCart();

// // supprimer un produit
// function removeFromCart(product) {
//   let cart = getCart();
//   cart = cart.filter((p) => (p.id != product.id) & (p.color != product.color));
//   saveCart(cart);
// }

// // modifier une quantité
// function changeQuantity(product, quantity) {
//   let cart = getCart();
//   let foundProduct = cart.find(
//     (p) => (p.id == product.id) & (p.color == product.color)
//   );
//   if (foundProduct != undefined) {
//     foundProduct.quantity += quantity;
//     if (foundProduct <= 0) {
//       removefromCart(foundProduct);
//     } else {
//       saveCart(cart);
//     }
//   }
// }
// // modifier une couleur
// function changeColor(product, color) {
//   let cart = getCart();
//   let foundProduct = cart.find(
//     (p) => (p.id == product.id) & (p.color == product.color)
//   );
//   if (foundProduct != undefined) {
//     foundProduct.color += color;
//   }
//   saveCart(cart);
// }

// // id="order" bouton Commander !
// order.addEventListener("submit", () => {
//   console.log("commander");
//   // test   id="firstname renseigné  alert("Veuillez renseigner votre Prénom")
//   // test id="lastName renseigné alert("Veuillez renseigner votre Nom")
//   // test id "address" renseigné alert("Veuillez renseigner votre Adresse")
//   // test id "city" renseigné alert("Veuillez renseigner votre Ville")
//   // test id "email" renseigné alert("Veuillez renseigner votre mail")
// });
