// récupérer le panier
function getCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        return [];
    }else{
        return JSON.parse(cart);
        console.log("contenu du panier : ", cart);
        console.table(cart);

        for(let product of cart) {

            // <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            let article = document.createElement("article");
            document.getElementById("cart__items").appendChild(article);
            // ajouter data-id="{product-ID}" data-color="{product-color}"
                
            // <div class="cart__item__img">
            let cartItemImg = document.createElement("div");
            article.appendChild(cartItemImg);
            cartItemImg.classList.add("cart__item__img");

            const img = document.createElement("img");
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
            cartItemContentDescription.classList.add("cart__item__content__description");

            // <h2>Nom du produit</h2>
            let productName = document.createElement("h2");
            productName.innerText = cart.product.name;
            cartItemContentDescription.appendChild(productName);
            
            // <p>Vert</p>
            let productColor = document.createElement("p");
            productColor.innerText = cart.product.color;
            cartItemContentDescription.appendChild(productColor);

            // <p>42,00 €</p>
            let productPrice = document.createElement("p");
            productPrice.innerText = cart.product.price;
            cartItemContentDescription.appendChild(productPrice);
            
            // <div class="cart__item__content__settings">
            let cartItemContentSettings = document.createElement("div");
            cartItemContent.appendChild(cartItemContentSettings);
            cartItemContentSettings.classList.add("cart__item__content__settings");

            // <div class="cart__item__content__settings__quantity">
            let cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
  
  //          <p>Qté : </p>
            let qte = document.createElement("p");
            cartItemContentSettingsQuantity.appendChild(qte));
            qte.innerText="Qté : ";

  //          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">             </div>
            let itemQuantity = document.createElement("input");
            cartItemContentSettingsQuantity.appendChild(itemQuantity);
            itemQuantity.name="itemQuantity";
            itemQuantity.classList.add="itemQuantity";
            itemQuantity.value=product.itemQuantity;
            
            // <div class="cart__item__content__settings__delete">
            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
            cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

            // <p class="deleteItem">Supprimer</p> 
            let deleteItem = document.createElement("p");
            cartItemContentSettingsDelete.appendChild(deleteItem);
            deleteItem.innerText="Supprimer";
            
    }
}

// supprimer un produit
function removeFromCart(product){
    let cart=getCart();
    cart = cart.filter(p => p.id != product.id & p.color != product.color);
    saveCart(cart);
}

// modifier une quantité
function changeQuantity(product, quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id & p.color==product.color);
    if(foundProduct!=undefined){
        foundProduct.quantity += quantity;
        if(foundProduct<=0){
            removefromCart(foundProduct);
        }else{
            saveCart(cart);
        }
    }
}
// modifier une couleur
function changeColor(product, color){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id & p.color==product.color);
    if(foundProduct!=undefined){
        foundProduct.color += color;
    }
    saveCart(cart);
}

// calcul la quantité totale de produits dans le panier
function getNumberProduct(){
    let cart=getCart();
    let number=0;
    for(let product of cart){
        number += product.quantity;
    }
    return number;
}

// calcul du prix total du panier
function getTotalPrice(){
    let cart=getCart();
    let total=0;
    for(let product of cart){
        total += product.quantity * product.price;
    }
    return number;
}

// passer la commande