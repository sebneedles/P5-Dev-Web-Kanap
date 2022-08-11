// AIDE JULIA
let productTable = JSON.parse(localStorage.getItem("product"));
//console.log(productTable);
const productsToDisplay = [];
// Afficher les produits dans le panier
// dans le sélecteur suivant
const sectionProduct = document.querySelector('#cart__items');
//console.log('ma balise section dans laquelle je vais injecter du code => ', sectionProduct);
const productFetchData = async () =>  {
    // si le panier est vide : afficher le panier est vide
if(productTable == null || productTable.length === 0){
    //console.log('Je suis un panier vide =>');
    const emptyBasket = document.createElement("div");
    emptyBasket.setAttribute("class", "container-empty-basket");
    sectionProduct.appendChild(emptyBasket);

    const emptyBasketText = document.createElement("p");
    emptyBasketText.textContent = "Le panier est vide :-(";
    emptyBasket.appendChild(emptyBasketText);
} else {
    await fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((promiseProduct) => {
        //productTable = promiseProduct;
        promiseProduct.map(product => productsToDisplay.push(product));
        console.log('C\'est quoi ce truc ?', promiseProduct);
    })
    // si le panier n'est pas vide, alors il faut afficher les produits dans le local storage
    let ProductBasket = [];
    for(i = 0; i < productsToDisplay.length; i++){
        console.log(productsToDisplay[i]);
        // chercher le bon produit
        //console.log('produit =>', productTable[i].replace('"', ''));
        // fetch(`http://localhost:3000/api/products/${(productTable[i].id)}`)
        // .then((response) => response.json())
        // .then((promiseProduct) => {
        //     //productTable = promiseProduct;
            
        //     console.log('C\'est quoi ce truc ?', productTable);
        // })
// AFFICHER LES PRODUITS DANS LE PANIER

        // Création de <article>
        const newArticleProduct = document.createElement("article");
        newArticleProduct.setAttribute("class", "cart__item");
        newArticleProduct.setAttribute("data-id", `${productsToDisplay[i].id}`); // OK, s'affiche dans HTML et LS
        newArticleProduct.setAttribute("data-color", `${productsToDisplay[i].colors}`); // OK, s'affiche dans HTML et LS
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

        //console.log('Nombre de produits dans le local storage : ', productTable.length);
    }
    //console.log('Je ne suis plus un panier vide');
}
}




// BOUTON SUPPRIMER
let btnDelete = document.querySelectorAll(".deleteItem");
//console.log(btnDelete);

for(let j = 0; j < btnDelete.length; j++){
    btnDelete[j].addEventListener("click", (event) =>{
        event.preventDefault();
        //console.log(event);

        let selectDelete = productTable[j]._id && productTable[j].colors;
        //console.log(selectDelete);
        //console.log("selectDelete");

        productTable = productTable.filter( element => element._id && element.colors !== selectDelete);
            //console.log(productTable);

        // Envoie la variable dans le local storage
        localStorage.setItem("product", JSON.stringify(productTable));

        // Suppression du produit et rechargement de la page
        alert("Ce produit sera supprimé du panier.");
        window.location.href = "./cart.html";
    })
}


productFetchData();


// MONTANT TOTAL DU PANIER
let calculTotalPrice = [];

// récupérer les prix du panier
for(let k = 0; k < productTable?.length; k++){
    let priceProductsBasket = productTable[k].price;

    // Ajouter prix du panier dans la variable TotalPrice
    calculTotalPrice.push(priceProductsBasket)
}

// Additionner les prix dans la variable TotalPrice
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = calculTotalPrice.reduce(reducer, 0);
//console.log('Total du panier', totalPrice);

// Affichage dans le DOM
const displayTotalPrice = `<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`
const cartPrice = document.querySelector(".cart__price");
cartPrice.innerHTML= displayTotalPrice;


// FORMULAIRE DE COMMANDE
const btnCommander = document.querySelector("#order");

// Gestionnaire d'événnement
btnCommander.addEventListener("click", (e) =>{
    e.preventDefault(); // A RETIRER A LA FIN DU PROJET
    
    localStorage.setItem("firstName", document.querySelector("#firstName").value);
    localStorage.setItem("lastName", document.querySelector("#lastName").value);
    localStorage.setItem("address", document.querySelector("#address").value);
    localStorage.setItem("city", document.querySelector("#city").value);
    localStorage.setItem("email", document.querySelector("#email").value);

    // Récupération des valeurs du formulaire dans un objet
    const form = {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        address: localStorage.getItem("address"),
        city: localStorage.getItem("city"),
        email: localStorage.getItem("email")
    }
    //console.log('données du formulaire', form);


    // AJOUTER VALEURS DU FORMULAIRE ET PRODUITS SELECTIONNES VERS LE SERVEUR
    const sendData = {
        productTable,
        form
    }
    //console.log('Envoi des données suivantes : =>', sendData);
})
