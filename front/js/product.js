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