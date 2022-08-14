/* -------------------------------------------------------------------------------- 
AFFICHAGE DES PRODUITS DEPUIS LOCALSTORAGE
-------------------------------------------------------------------------------- */
let productTable = JSON.parse(localStorage.getItem("product"));
console.log('Produits récupérés depuis localStorage =>', productTable);

// Dans le sélecteur <section></section>, on affiche les produits
const sectionProduct = document.querySelector('#cart__items');


/* -------------------------------------------------------------------------------- 
CONDITION
-------------------------------------------------------------------------------- */
if(productTable === null || productTable == 0){

    // Si panier vide = afficher dans le DOM
    const emptyBasket = document.createElement("div");
    emptyBasket.setAttribute("class", "container-empty-basket");
    sectionProduct.appendChild(emptyBasket);
    const emptyBasketText = document.createElement("p");
    emptyBasketText.textContent = "Le panier est vide :-(";
    emptyBasket.appendChild(emptyBasketText);

} else { // Sinon panier contient un produit = afficher le produit
    console.log('Le panier n\'est plus vide :-)');
    //let ProductBasket = [];

    /* -------------------------------------------------------------------------------- 
    BOUTON SUPPRIMER
    -------------------------------------------------------------------------------- */
    function removeProduct(value){
        console.log(value);
        const removeItem = document.querySelectorAll(".deleteItem");
        console.log('Ce bouton ...', removeItem);

        for(let j = 0; j < removeItem.length; j++){
            removeItem[j].addEventListener("click", (event) =>{
                event.preventDefault();

                let selectDeleteItem = productTable[j].id;
                console.log('cest quoi ?', selectDeleteItem);

            })
        }
    }
    

    for(let i = 0; i < productTable.length; i++){
        // FETCH LE BON PRODUIT
        fetch(`http://localhost:3000/api/products/${(productTable[i].id)}`)
        .then((response) => response.json())
        .then((promiseProduct) => {
            
            console.log('Récupération du produit =>', promiseProduct);

            /* -------------------------------------------------------------------------------- 
            AFFICHER LES PRODUITS DANS LE PANIER
            -------------------------------------------------------------------------------- */
            
            // <article>
            const newArticleProduct = document.createElement("article");
            newArticleProduct.setAttribute("class", "cart__item");
            newArticleProduct.setAttribute("data-id", `${promiseProduct._id}`);
            newArticleProduct.setAttribute("data-color", `${promiseProduct.colors}`);
            sectionProduct.appendChild(newArticleProduct);

            // <div class="cart__item__content">
            const newDivImg = document.createElement("div");
            newDivImg.setAttribute("class", "cart__item__img");
            newArticleProduct.appendChild(newDivImg);

            // <img src="" alt="">
            const newImgProduct = document.createElement("img");
            newImgProduct.setAttribute("src", `${promiseProduct.imageUrl}`);
            newImgProduct.setAttribute("alt", `${promiseProduct.altTxt}`);
            newDivImg.appendChild(newImgProduct);

            // <div class="cart__item__content">
            const newDivContent = document.createElement('div');
            newDivContent.setAttribute("class", "cart__item__content");
            newArticleProduct.appendChild(newDivContent);

            // <div class="cart__item__content__description">
            const newDivDescription = document.createElement('div');
            newDivDescription.setAttribute("class", "cart__item__content__description");
            newDivContent.appendChild(newDivDescription);

            // <h2>Nom du produit</h2>
            const newTitleDescription = document.createElement('h2');
            newTitleDescription.textContent = `${promiseProduct.name}`;
            newDivDescription.appendChild(newTitleDescription);

            // <p>couleur</p>
            const newParagrapheColor = document.createElement('p');
            newParagrapheColor.textContent = `${productTable[i].colors}`;
            newDivDescription.appendChild(newParagrapheColor);

            // <p>prix €</p>
            const newParagraphePrice = document.createElement('p');
            newParagraphePrice.textContent = `${promiseProduct.price} €`;
            newDivDescription.appendChild(newParagraphePrice);

            // <div class="cart__item__content__settings">
            const newDivSetting = document.createElement('div');
            newDivSetting.setAttribute("class", "cart__item__content__settings");
            newDivContent.appendChild(newDivSetting);

            // <div class="cart__item__content__settings__quantity">
            const newDivQuantity = document.createElement('div');
            newDivQuantity.setAttribute("class", "cart__item__content__settings__quantity");
            newDivSetting.appendChild(newDivQuantity);

            // <p>Qté : </p>
            const newParagrapheQuantity = document.createElement('p');
            newParagrapheQuantity.textContent = "Qté : ";
            newDivQuantity.appendChild(newParagrapheQuantity);

            // <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            const newInput = document.createElement('input');
            newInput.setAttribute("type", "number");
            newInput.setAttribute("class", "itemQuantity");
            newInput.setAttribute("name", "itemQuantity");
            newInput.setAttribute("min", "1");
            newInput.setAttribute("max", "100");
            newInput.setAttribute("value", `${productTable[i].quantity}`);
            newDivQuantity.appendChild(newInput);

            // <div class="cart__item__content__settings__delete">
            const newDivDelete = document.createElement('div');
            newDivDelete.setAttribute("class", "cart__item__content__settings__delete");
            newDivSetting.appendChild(newDivDelete);

            // <p class="deleteItem">Supprimer</p>
            const newParagrapheDelete = document.createElement('p');
            newParagrapheDelete.setAttribute("class", "deleteItem");
            newParagrapheDelete.setAttribute("onclick", "removeProduct(this)");
            newDivDelete.appendChild(newParagrapheDelete);
            newParagrapheDelete.textContent = "Supprimer";
            
        })
        console.log('Nombre de produits dans le local storage : ', productTable.length);
    }
}

/* -------------------------------------------------------------------------------- 
AFFICHAGE PRIX TOTAL
-------------------------------------------------------------------------------- */






    




/* -------------------------------------------------------------------------------- 
GERER LA QUANTITE
-------------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------------- 
FORMULAIRE DE COMMANDE
-------------------------------------------------------------------------------- */