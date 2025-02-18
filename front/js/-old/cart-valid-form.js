/* -------------------------------------------------------------------------------- 
RECUPERATION DES PRODUITS DEPUIS LOCALSTORAGE
-------------------------------------------------------------------------------- */
let productTable = JSON.parse(localStorage.getItem("product"));
console.log('Produits récupérés depuis localStorage =>', productTable);


/* -------------------------------------------------------------------------------- 
// MODIFICATION DU TITLE DANS <head></head>
-------------------------------------------------------------------------------- */
document.title = "KANAP | Votre panier ";


/* -------------------------------------------------------------------------------- 
RECUPERATION DES PRODUITS HORS LOCALSTORAGE
-------------------------------------------------------------------------------- */
let productsData = [];

const getProductsData = async () => {

    const result = await fetch(`http://localhost:3000/api/products`);
    productsData = await result.json();
    console.log('Produits récupérés depuis API =>', productsData);

    // Si le panier est vide afficher ceci
    if (productTable === null || productTable == 0) {
        document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide. :-(</p>`);
        document.getElementById('cart__items').style.textAlign = "center";
        return
    }
    // Sinon, afficher les éléments du localStorage
    else {
        let totalPrice = 0;
        // Boucle pour récupérer les produits du localStorage
        for (let i = 0; i < productTable.length; i++) {
            const kanapStorage = productTable[i];
            const kanapApi = productsData.find(data => data._id === kanapStorage.id);

            // Calcul du prix total directement à chaque boucle.
            totalPrice += productTable[i].quantity * kanapApi.price;
            let totalPriceElement = document.getElementById('totalPrice');
            totalPriceElement.textContent = totalPrice;
            console.log('Prix total du panier à chaque fois / produit =>', totalPrice);

            displayProductsBasket(kanapStorage, kanapApi);
        }
    }
}
getProductsData()


/* -------------------------------------------------------------------------------- 
AFFICHER LES PRODUITS DANS LE DOM
-------------------------------------------------------------------------------- */
const displayProductsBasket = (productStorage, productApi) => {

    // <article></article>
    let newArticleProduct = document.createElement("article");
    document.getElementById('cart__items').appendChild(newArticleProduct);
    newArticleProduct.className = "cart__item";
    newArticleProduct.setAttribute('data-id', productStorage.id);
    newArticleProduct.setAttribute('data-color', productStorage.colors);

    // <div><img /></div> : IMAGE
    let newDivImg = document.createElement("div");
    newArticleProduct.appendChild(newDivImg);
    newDivImg.className = "cart__item__img";
    let cartImg = document.createElement("img");
    newDivImg.appendChild(cartImg);
    cartImg.src = productApi.imageUrl;
    cartImg.alt = productApi.altTxt;

    // Description Bloc 
    let newDivContent = document.createElement("div");
    newDivContent.className = 'cart__item__content';
    newArticleProduct.appendChild(newDivContent);
    let divItemDescription = document.createElement('div');
    newDivContent.appendChild(divItemDescription);
    divItemDescription.className = 'cart__item__content__description';

    // Titre h2
    let newTitleDescription = document.createElement("h2");
    newTitleDescription.textContent = productApi.name;
    divItemDescription.appendChild(newTitleDescription);

    // Couleur
    let newParagrapheColor = document.createElement('p');
    newParagrapheColor.textContent = productStorage.colors;
    divItemDescription.appendChild(newParagrapheColor);

    // Prix
    let newParagraphePrice = document.createElement('p');
    newParagraphePrice.textContent = productApi.price + ' ' + '€';
    divItemDescription.appendChild(newParagraphePrice);

    // Bloc Settings
    let newDivSetting = document.createElement('div');
    newDivSetting.className = 'cart__item__content__settings';
    newDivContent.appendChild(newDivSetting);

    // Quantité
    let newDivQuantity = document.createElement('div');
    newDivQuantity.className = 'cart__item__content__settings__quantity';
    newDivSetting.appendChild(newDivQuantity);
    let newParagrapheQuantity = document.createElement('p');
    newParagrapheQuantity.textContent = 'Qte : ';
    newDivQuantity.appendChild(newParagrapheQuantity);

    // Quantité <input>
    let newInput = document.createElement('input');
    newInput.setAttribute("type", "number");
    newInput.setAttribute("name", "itemQuantity");
    newInput.setAttribute("min", 1);
    newInput.setAttribute("max", 100);
    newInput.setAttribute("value", productStorage.quantity);
    newInput.classname = 'itemQuantity';
    newDivQuantity.appendChild(newInput);

    // Settings bloc : remove quantity
    let removeQuantity = document.createElement('div');
    removeQuantity.className = 'cart__item__content__settings__delete';
    newDivSetting.appendChild(removeQuantity);
    let removeQuantityButton = document.createElement('p');
    removeQuantityButton.className = 'deleteItem';
    removeQuantityButton.textContent = 'Supprimer';
    removeQuantityButton.setAttribute("id", `${productStorage.id && productStorage.colors}`)
    removeQuantity.appendChild(removeQuantityButton);


    /* -------------------------------------------------------------------------------- 
    MODIFIER LA QUANTITE
    -------------------------------------------------------------------------------- */
    newInput.addEventListener('change', function (qtt) {
        console.log('Affiche l\'evennement qtt =>', qtt);
        productStorage.quantity = newInput.value;
        
            localStorage.setItem("product", JSON.stringify(productTable));
            location.reload();

            console.log('Affiche le panier avec la nouvelle quantité ajoutée =>', productStorage.quantity);
    })


    /* -------------------------------------------------------------------------------- 
    SUPPRIMER UN PRODUIT
    -------------------------------------------------------------------------------- */
    removeQuantityButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('evenement qui supprime le produit =>', event);

        let productStorageRemoveId = productStorage.id;
        let productStorageRemoveColors = productStorage.colors;
        console.log(productStorageRemoveId);
        console.log(productStorageRemoveColors)

        productTable = productTable.filter(element => element.id !== productStorageRemoveId || element.colors !== productStorageRemoveColors);
        localStorage.setItem("product", JSON.stringify(productTable));
        event.target.closest('.cart__item').remove();
        alert(`Le modèle ${productApi.name} à été retiré du panier !`);
        location.reload();
        console.log(productTable)
    })


    getTotalProducts();
}


/* -------------------------------------------------------------------------------- 
AFFICHER LA QUANTITE ET LE PRIX TOTAL
-------------------------------------------------------------------------------- */
async function getTotalProducts() {

    let productQuantity = productTable;
    let totalQuantity = 0

    for (let product of productQuantity) {
        totalQuantity += Number(product.quantity);
    }

    let quantityItemTotal = document.getElementById('totalQuantity');
    quantityItemTotal.textContent = totalQuantity
    console.log('Total article =>', totalQuantity);
}


/* -------------------------------------------------------------------------------- 
FORMULAIRE D'ENVOI
-------------------------------------------------------------------------------- */
let order = document.getElementById("order");
let valueOrder;

// Input firstName
let firstName = document.getElementById("firstName");
let messErrorFirstName = document.getElementById("firstNameErrorMsg");
firstName.addEventListener("input", (e) => {
    let valueFirstName;
    if (e.target.value.length == 0) {
        valueFirstName = null;
    }
    else if (e.target.value.length < 3 || e.target.value.length > 30) {
        messErrorFirstName.textContent = "Le prénom doit contenir entre 3 et 30 caractères.";
        messErrorFirstName.style.color = "#fbbcbc";
        valueFirstName = null;
    }
    if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
        messErrorFirstName.textContent = "Le prénom est valide.";
        messErrorFirstName.style.color = "#4dff00";
        valueFirstName = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/) && e.target.value.length > 3 && e.target.value.length < 30) {
        messErrorFirstName.textContent = "Le prénom ne doit pas contenir de caratères spéciaux.";
        messErrorFirstName.style.color = "#fbbcbc";
        valueFirstName = null;
    }
})

// Input lasttName
let lasttName = document.getElementById("lastName");
let messErrorLastName = document.getElementById("lastNameErrorMsg");
lasttName.addEventListener("input", (e) => {
    let valueLastName;
    if (e.target.value.length == 0) {
        valueLastName = null;
    }
    else if (e.target.value.length < 3 || e.target.value.length > 30) {
        messErrorLastName.textContent = "Le nom doit contenir entre 3 et 30 caractères.";
        messErrorLastName.style.color = "#fbbcbc";
        valueLastName = null;
    }
    if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
        messErrorLastName.textContent = "Le nom est valide.";
        messErrorLastName.style.color = "#4dff00";
        valueLastName = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/) && e.target.value.length > 3 && e.target.value.length < 30) {
        messErrorLastName.textContent = "Le nom ne doit pas contenir de caratères spéciaux.";
        messErrorLastName.style.color = "#fbbcbc";
        valueLastName = null;
    }
})

// Inout address
let address = document.getElementById("address");
let messErrorAddress = document.getElementById("addressErrorMsg");
address.addEventListener("input", (e) => {
    let valueAddress;
    if (e.target.value.length == 0) {
        valueAddress = null;
    }
    else if (e.target.value.length < 10 || e.target.value.length > 70) {
        messErrorAddress.textContent = "L'adresse doit contenir entre 10 et 70 caractères.";
        messErrorAddress.style.color = "#fbbcbc";
        valueAddress = null;
    }
    if (e.target.value.match(/^[a-z A-Z 0-9 éèàâêîôûçäëïöü - ']{10,70}$/)) {
        messErrorAddress.textContent = "l'adresse est valide.";
        messErrorAddress.style.color = "#4dff00";
        valueAddress = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z 0-9 éèàâêîôûçäëïöü - ']{10,70}$/) && e.target.value.length > 10 && e.target.value.length < 70) {
        messErrorAddress.textContent = "L'adresse ne doit pas contenir de caratères spéciaux.";
        messErrorAddress.style.color = "#fbbcbc";
        valueAddress = null;
    }
})

// Input city
let city = document.getElementById("city");
let messErrorCity = document.getElementById("cityErrorMsg");
city.addEventListener("input", (e) => {
    let valueCity;
    if (e.target.value.length == 0) {
        valueCity = null;
    }
    else if (e.target.value.length < 2 || e.target.value.length > 30) {
        messErrorCity.textContent = "La ville doit contenir entre 2 et 30 caractères.";
        messErrorCity.style.color = "#fbbcbc";
        valueCity = null;
    }
    if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{2,30}$/)) {
        messErrorCity.textContent = "La ville est valide.";
        messErrorCity.style.color = "#4dff00";
        valueCity = e.target.value;
    }
    if (!e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{2,30}$/) && e.target.value.length > 2 && e.target.value.length < 30) {
        messErrorCity.textContent = "La ville ne doit pas contenir de caratères spéciaux.";
        messErrorCity.style.color = "#fbbcbc";
        valueCity = null;
    }
})

// Input email
let email = document.getElementById("email");
email.addEventListener("input", (e) => {
    let messErrorEmail = document.getElementById("emailErrorMsg");
    let valueEmail;
    if (e.target.value.length == 0) {
        messErrorEmail.textContent = "";
        valueEmail = null;
    }
    else if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        messErrorEmail.textContent = "";
        valueEmail = e.target.value;
    }
    if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        messErrorEmail.textContent = "L'email est valide";
        messErrorEmail.style.color = "#4dff00";
        valueEmail = e.target.value;
    }
    if (!e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && !e.target.value.length == 0) {
        messErrorEmail.textContent = "L'email n'est pas valide";
        messErrorEmail.style.color = "#fbbcbc";
        valueEmail = null;
    }
})


/* -------------------------------------------------------------------------------- 
// Bouton Commander !
-------------------------------------------------------------------------------- */
const btnEnvoiCommande = document.getElementById("order");

btnEnvoiCommande.addEventListener("click", (e) => {
    e.preventDefault();

    // Création d'une classe pour fabriquer l'objet dans lequel iront les données du formulaire
    class MyForm {
        constructor(input){
            this.prenom = document.querySelector("#firstName").value;
            this.nom = document.querySelector("#lastName").value;
            this.adresse = document.querySelector("#address").value;
            this.ville = document.querySelector("#city").value;
            this.email = document.querySelector("#email").value;
            this.input = document.querySelector(`#${input}`).value;
        }
    }

    // Appel de l'instance de la classe MyForm pour créer l'objet formValues
    const formValues = new MyForm("city");

    console.log('formValues', formValues);

    // Insérer les données dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));

    // Envoyer toutes les données (formulaire et produits) dans un objet sendToConfirmation
    const sendToConfirmation = {
        productTable,
        formValues,
    };
    console.log('sendToConfirmation : Envoyer vers le serveur =>', sendToConfirmation);

    // Envoyer l'objet sendToConfirmation vers le serveur
    const promise01 = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(sendToConfirmation),
        headers: {
            "Content-Type" : "application/json",
        },
    });

    // Voir le résultat du serveur dans la console


})


/* -------------------------------------------------------------------------------- 
// Garder les valeurs du localStorage dans le formulaire
-------------------------------------------------------------------------------- */
// Prendre la key formValues et la mettre dans une variable
//const dataFormLocalStorage = localStorage.getItem("formValues");

// Convertir la chaine de caractère en objet javascript
//const dataFormLocalStorageObjet = JSON.parse(dataFormLocalStorage);
//console.log('dataFormLocalStorageObjet', dataFormLocalStorageObjet);

// Mettre les valeurs du localStorage dans les champs du formulaire
// document.querySelector("#firstName").value = dataFormLocalStorageObjet.prenom;
// document.querySelector("#lastName").value = dataFormLocalStorageObjet.nom;
// document.querySelector("#address").value = dataFormLocalStorageObjet.adresse;
// document.querySelector("#city").value = dataFormLocalStorageObjet.ville;
// document.querySelector("#email").value = dataFormLocalStorageObjet.email;