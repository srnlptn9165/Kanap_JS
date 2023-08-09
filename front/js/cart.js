// récupération du panier
let cart = JSON.parse(localStorage.getItem("cart"));
// variables pour calcul du prix total et du nombre total d'articles
let number = 0;
let total = 0;

// Affichage du panier
function getCart() {
  // console.log(cart);

  // let sortedCart = cart.sort((a, b) =>
  //   a._id > b._id ? 1 : a._id > b._id ? -1 : 0
  // );
  // console.log(sortedCart);

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
        // console.log(product);

        let article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.classList.add("cart__item");
        // ajouter data-id="{product-ID}" data-color="{product-color}"
        article.dataset.id = item._id;
        article.dataset.color = item.color;

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
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";

        addEventListenerOnDeleteBtn();
      });
  }
}

function handleDelete(e) {
  let btnSuppr = e.target;
  let articleEl = btnSuppr.closest(".cart__item");

  // suppression dans le DOM de l'article consulté
  articleEl.remove();
  // suppression dans le localStorage de l'aticle consulté à partir de son index dans le tableau
  // console.log(cart);
  // console.log(articleEl.dataset.id);
  // console.log(articleEl.dataset.color);

  for (let i = 0, cartLength = cart.length; i < cartLength; i++)
    if (
      cart[i]._id === articleEl.dataset.id &&
      cart[i].color === articleEl.dataset.color
    ) {
      // déclaration de variable utile pour la suppression : index de l'objet à supprimer
      const indexDelete = [i];
      // création d'un tableau miroir
      let newCart = JSON.parse(localStorage.getItem("cart"));
      //suppression de 1 élément à l'indice num
      newCart.splice(indexDelete, 1);
      // console.log(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return location.reload();
    }
  e.stopPropagation();
}

function addEventListenerOnDeleteBtn() {
  let btnSupprArray = document.querySelectorAll(".deleteItem");

  btnSupprArray.forEach((btn) => {
    btn.addEventListener("click", handleDelete, false);
  });
}

// window.addEventListener("DOMContentLoaded", ()=>console.log("2. AddEventListenerOnDeleteBtn"));

// trier le panier => ne fonctionne pas

// supprimer un produit

// modifier le DOM et le localStorage
// avant de remove, récupérer l'id pour le supprimer du local storage

// pour la modif récupérer la nouvelle qté dans le e.target

getCart();

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

// -----------------------------
const form = document.querySelector("form");
// pointer les input pour vérifier ce qui est saisi
const inputs = document.querySelectorAll(
  'input[type = "text"], input[type="email"]'
);
// console.log(inputs);

//création des variables pour stocker le formulaire avant envoi
let firstName, lastName, address, city, email;

// affichage des messages d'erreur
const errorDisplay = (tag, message, valid) => {
  // on pointe l'espace de l'input pour le message d'erreur
  const container = document.querySelector("#" + tag + "ErrorMsg");

  if (!valid) {
    container.textContent = message;
  } else {
    container.textContent = message;
  }
};

// contrôle sur la saisie du prénom
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "firstName",
      "Le prénom doit contenir entre 3 et 20 caractères"
    );
    firstName = null;
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    errorDisplay(
      "firstName",
      "Le prénom ne doit pas contenir de caractères spéciaux"
    );
    firstName = null;
  } else {
    // errorDisplay.textContent =""
    errorDisplay("firstName", "", true);
    firstName = value;
  }
};

// contrôle sur la saisie du nom
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("lastName", "Le nom doit contenir entre 3 et 20 caractères");
    lastName = null;
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    errorDisplay(
      "lastName",
      "Le nom ne doit pas contenir de caractères spéciaux"
    );
    lastName = null;
  } else {
    // errorDisplay.textContent =""
    errorDisplay("lastName", "", true);
    lastName = value;
  }
};
const addressChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 40)) {
    errorDisplay("address", "L'adresse doit contenir entre 2 et 40 caractères");
    address = null;
  } else {
    errorDisplay("address", "", true);
    address = value;
  }
};
const cityChecker = (value) => {
  if (value.length > 0 && (value.length < 2 || value.length > 20)) {
    errorDisplay("city", "La ville doit contenir entre 2 et 20 caractères");
    city = null;
  } else if (!value.match(/^[a-zA-Z_.-]*$/)) {
    errorDisplay(
      "city",
      "La ville ne doit pas contenir de caractères spéciaux"
    );
    city = null;
  } else {
    // errorDisplay.textContent =""
    errorDisplay("city", "", true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};
// création de 5 EventListener
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // console.log(e.target.value);

    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstName && lastName && address && city && email) {
    const data = {
      fisrName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    firstName = null;
    lastName = null;
    address = null;
    city = null;
    email = null;
    alert("inscription validée");
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});
