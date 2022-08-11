/* -------------------------------------------------------------------------------- 
MON NOUVEAU CODE
-------------------------------------------------------------------------------- */

// Affichage produit depuis le localStorage
const productTable = JSON.parse(localStorage.getItem("product"));
console.log('Affichage produit localStorage =>', productTable);

// Création sectionProduct pour panier
const sectionProduct = document.querySelector('#cart__items');

// Tableau vide qui va contenir les produits
const productsToDisplay = [];


/* -------------------------------------------------------------------------------- 
FONCTION AFFICHAGE DES PRODUITS
-------------------------------------------------------------------------------- */
const productFetchData = async () =>  {
    
    // Condition d'affichage : si le panier est vide : afficher le panier est vide
    if(productTable == null || productTable.length == 0 ){
        // Création élément panier vide
        const emptyBasket = document.createElement("div");
        emptyBasket.setAttribute("class", "container-empty-basket");
        sectionProduct.appendChild(emptyBasket);
        const emptyBasketText = document.createElement("p");
        emptyBasketText.textContent = "Le panier est vide :-(";
        emptyBasket.appendChild(emptyBasketText);
        console.log('oui =>', emptyBasket);

    } else { // Sinon : afficher le ou les produits dans le panier
        console.log('Le panier contient au moins 1 produit =>', productTable);

        await fetch(`http://localhost:3000/api/products${productTable[i]}`)
        .then((response) => response.json())
        .then((promiseProduct) => {
            
            promiseProduct.map(product => productsToDisplay.push(product));
            console.table('Je récupère quoi ? =>', promiseProduct);
        })

        // On boucle le nombre de produits du localStorage
        for(i = 0; i < productTable.length; i++){
            //console.log(productTable);
            
            // AFFICHER LES PRODUITS DANS LE PANIER
            // Création de <article>
            const newArticleProduct = document.createElement("article");
            newArticleProduct.setAttribute("class", "cart__item");
            newArticleProduct.setAttribute("data-id", `${productsToDisplay[i].id}`);
            newArticleProduct.setAttribute("data-color", `${productsToDisplay[i].colors}`);
            sectionProduct.appendChild(newArticleProduct);
            //console.log('C\'est quoi ce truc là ?', newArticleProduct);

            // Création de <div class="cart__item__content">
            const newDivImg = document.createElement("div");
            newDivImg.setAttribute("class", "cart__item__img");
            newArticleProduct.appendChild(newDivImg);

            // Création de <img src="" alt="">
            const newImgProduct = document.createElement("img");
            newImgProduct.setAttribute("src", `${productsToDisplay[i].imageUrl}`);
            newImgProduct.setAttribute("alt", `${productsToDisplay[i].altTxt}`);
            newDivImg.appendChild(newImgProduct);

            // Création de <div class="cart__item__content">
            const newDivContent = document.createElement('div');
            newDivContent.setAttribute("class", "cart__item__content");
            newArticleProduct.appendChild(newDivContent);

            // Création de <div class="cart__item__content__description">
            const newDivDescription = document.createElement('div');
            newDivDescription.setAttribute("class", "cart__item__content__description");
            newDivContent.appendChild(newDivDescription);

            // Création de <h2>Nom du produit</h2>
            const newTitleDescription = document.createElement('h2');
            newTitleDescription.textContent = `${productsToDisplay[i].name}`; // OK, s'affiche dans HTML et LS
            newDivDescription.appendChild(newTitleDescription);

            // Création de <p>couleur</p>
            const newParagrapheColor = document.createElement('p');
            newParagrapheColor.textContent = `${productsToDisplay[i].colors}`; // OK, s'affiche dans HTML et LS
            newDivDescription.appendChild(newParagrapheColor);

            // Création de <p>prix €</p>
            const newParagraphePrice = document.createElement('p');
            newParagraphePrice.textContent = `${productsToDisplay[i].price} €`;
            newDivDescription.appendChild(newParagraphePrice);

            // Création de <div class="cart__item__content__settings">
            const newDivSetting = document.createElement('div');
            newDivSetting.setAttribute("class", "cart__item__content__settings");
            newDivContent.appendChild(newDivSetting);

            // Création de <div class="cart__item__content__settings__quantity">
            const newDivQuantity = document.createElement('div');
            newDivQuantity.setAttribute("class", "cart__item__content__settings__quantity");
            newDivSetting.appendChild(newDivQuantity);

            // Création de <p>Qté : </p>
            const newParagrapheQuantity = document.createElement('p');
            newParagrapheQuantity.textContent = "Qté : ";
            newDivQuantity.appendChild(newParagrapheQuantity);

            // Création de <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            const newInput = document.createElement('input');
            newInput.setAttribute("type", "number");
            newInput.setAttribute("class", "itemQuantity");
            newInput.setAttribute("name", "itemQuantity");
            newInput.setAttribute("min", "1");
            newInput.setAttribute("max", "100");
            newInput.setAttribute("value", `${productsToDisplay[i].quantity}`); // OK, s'affiche dans HTML et LS
            newDivQuantity.appendChild(newInput);

            // Création de <div class="cart__item__content__settings__delete">
            const newDivDelete = document.createElement('div');
            newDivDelete.setAttribute("class", "cart__item__content__settings__delete");
            newDivSetting.appendChild(newDivDelete);

            // Création de <p class="deleteItem">Supprimer</p>
            const newParagrapheDelete = document.createElement('p');
            newParagrapheDelete.setAttribute("class", "deleteItem");
            newDivDelete.appendChild(newParagrapheDelete);
            newParagrapheDelete.textContent = "Supprimer";

        }

    }
}

productFetchData();
/* -------------------------------------------------------------------------------- 
FIN FONCTION AFFICHAGE DES PRODUITS
-------------------------------------------------------------------------------- */