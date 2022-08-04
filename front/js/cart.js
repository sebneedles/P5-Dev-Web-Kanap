let productTable = JSON.parse(localStorage.getItem("product"));
console.log(productTable);

// Afficher les produits dans le panier
// dans le sélecteur suivant
const sectionProduct = document.querySelector('#cart__items');
console.log('ma balise section dans laquelle je vais injecter du code => ', sectionProduct);

// si le panier est vide : afficher le panier est vide
if(productTable === null){
    console.log('je suis vide');
    const emptyBasket = document.createElement("div");
    emptyBasket.setAttribute("class", "container-empty-basket");
    sectionProduct.appendChild(emptyBasket);

    const emptyBasketText = document.createElement("p");
    emptyBasketText.textContent = "Le panier est vide :-(";
    emptyBasket.appendChild(emptyBasketText);
} else {
    // si le panier nb'est pas vide, alors il faut afficher les produits dans le local storage
    let ProductBasket = [];
    for(i = 0; i < productTable.length; i++){

        // Création de <article>
        const newArticleProduct = document.createElement("article");
        newArticleProduct.setAttribute("class", "cart__item");
        newArticleProduct.setAttribute("data-id", `${productTable[i]._id}`);
        newArticleProduct.setAttribute("data-color", `${productTable[i].colors}`);
        sectionProduct.appendChild(newArticleProduct);

        // Création de <div class="cart__item__content">
        const newDivImg = document.createElement("div");
        newDivImg.setAttribute("class", "cart__item__img");
        newArticleProduct.appendChild(newDivImg);

        // Création de <img src="" alt="">
        const newImgProduct = document.createElement("img");
        newImgProduct.setAttribute("src", `${productTable[i].imageUrl}`);
        newImgProduct.setAttribute("alt", `${productTable[i].altTxt}`);
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
        newTitleDescription.textContent = `${productTable[i].name}`;
        newDivDescription.appendChild(newTitleDescription);

        // Création de <p>couleur</p>
        const newParagrapheColor = document.createElement('p');
        newParagrapheColor.textContent = `${productTable[i].colors}`;
        newDivDescription.appendChild(newParagrapheColor);

        // Création de <p>prix €</p>
        const newParagraphePrice = document.createElement('p');
        newParagraphePrice.textContent = `${productTable[i].price} €`;
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
        newInput.setAttribute("value", `${productTable[i].quantity}`);
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

        console.log('nombre de produits dans le local storage : ', productTable.length);
    }
    console.log('je ne suis pas vide');
    
    
}