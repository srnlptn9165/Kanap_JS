// fonction permettant d'enregistrer le panier dans le localstorage sous forme de chaîne de caractères
// --------------------
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// fonction de récupération du panier
// --------------------
function getCart() {
  let cart = localStorage.getItem("cart");

  if (cart === null) {
    return []; // renvoi du tableau vide
  } else {
    return JSON.parse(cart); // renvoi du tableau renseigné
  }
}
