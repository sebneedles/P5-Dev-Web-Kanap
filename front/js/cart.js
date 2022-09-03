/* -------------------------------------------------------------------------------- 
RECUPERATION DES PRODUITS DEPUIS LOCALSTORAGE
-------------------------------------------------------------------------------- */
let productTable = JSON.parse(localStorage.getItem("product"));


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
        productStorage.quantity = newInput.value;
        
            localStorage.setItem("product", JSON.stringify(productTable));
            location.reload();

    })


    /* -------------------------------------------------------------------------------- 
    SUPPRIMER UN PRODUIT
    -------------------------------------------------------------------------------- */
    removeQuantityButton.addEventListener('click', function (event) {
        event.preventDefault();

        let productStorageRemoveId = productStorage.id;
        let productStorageRemoveColors = productStorage.colors;

        productTable = productTable.filter(element => element.id !== productStorageRemoveId || element.colors !== productStorageRemoveColors);
        localStorage.setItem("product", JSON.stringify(productTable));
        event.target.closest('.cart__item').remove();
        alert(`Le modèle ${productApi.name} à été retiré du panier !`);
        location.reload();
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
}


/* -------------------------------------------------------------------------------- 
FORMULAIRE D'ENVOI et VALIDATION DES CHAMPS
-------------------------------------------------------------------------------- */
function getForm() {

    // Input firstName
    let firstName = document.getElementById("firstName");
    let messErrorFirstName = document.getElementById("firstNameErrorMsg");
    firstName.addEventListener("input", (e) => {
        let valueFirstName;
        if (e.target.value.length == 0) {
            valueFirstName = null;
            messErrorFirstName.textContent = null;
        }
        else if (e.target.value.length < 3 || e.target.value.length > 30 && e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
            messErrorFirstName.textContent = "Le prénom doit contenir entre 3 et 30 caractères et ne pas avoir de caractères spéciaux.";
            messErrorFirstName.style.color = "#fbbcbc";
            valueFirstName = null;
        }
        if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
            messErrorFirstName.textContent = "Le prénom est valide.";
            messErrorFirstName.style.color = "#4dff00";
            valueFirstName = e.target.value;
        }
    })

    // Input lasttName
    let lasttName = document.getElementById("lastName");
    let messErrorLastName = document.getElementById("lastNameErrorMsg");
    lasttName.addEventListener("input", (e) => {
        let valueLastName;
        if (e.target.value.length == 0) {
            valueLastName = null;
            messErrorLastName.textContent = null;
        }
        else if (e.target.value.length < 3 || e.target.value.length > 30 && e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
            messErrorLastName.textContent = "Le nom doit contenir entre 3 et 30 caractères et ne pas avoir de caractères spéciaux.";
            messErrorLastName.style.color = "#fbbcbc";
            valueLastName = null;
        }
        if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{3,30}$/)) {
            messErrorLastName.textContent = "Le nom est valide.";
            messErrorLastName.style.color = "#4dff00";
            valueLastName = e.target.value;
        }
    })

    // Input address
    let address = document.getElementById("address");
    let messErrorAddress = document.getElementById("addressErrorMsg");
    address.addEventListener("input", (e) => {
        let valueAddress;
        if (e.target.value.length == 0) {
            valueAddress = null;
            messErrorAddress.textContent = null;
        }
        else if (e.target.value.length < 10 || e.target.value.length > 70 && e.target.value.match(/^[a-z A-Z 0-9 éèàâêîôûçäëïöü - ']{10,70}$/)) {
            messErrorAddress.textContent = "L'adresse doit contenir entre 10 et 70 caractères et ne pas avoir de caractères spéciaux.";
            messErrorAddress.style.color = "#fbbcbc";
            valueAddress = null;
        }
        if (e.target.value.match(/^[a-z A-Z 0-9 éèàâêîôûçäëïöü - ']{10,70}$/)) {
            messErrorAddress.textContent = "l'adresse est valide.";
            messErrorAddress.style.color = "#4dff00";
            valueAddress = e.target.value;
        }
    })

    // Input city
    let city = document.getElementById("city");
    let messErrorCity = document.getElementById("cityErrorMsg");
    city.addEventListener("input", (e) => {
        let valueCity;
        if (e.target.value.length == 0) {
            valueCity = null;
            messErrorCity.textContent = null;
        }
        else if (e.target.value.length < 2 || e.target.value.length > 30 && e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{2,30}$/)) {
            messErrorCity.textContent = "La ville doit contenir entre 2 et 30 caractères.";
            messErrorCity.style.color = "#fbbcbc";
            valueCity = null;
        }
        if (e.target.value.match(/^[a-z A-Z éèàâêîôûçäëïöü - ']{2,30}$/)) {
            messErrorCity.textContent = "La ville est valide.";
            messErrorCity.style.color = "#4dff00";
            valueCity = e.target.value;
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
            messErrorEmail.textContent = null;
        }
        else if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
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

}
getForm();


/* -------------------------------------------------------------------------------- 
// ENVOI DU FORMULAIRE : POST
-------------------------------------------------------------------------------- */
function postForm() {
    const btnCommandForm = document.getElementById('order');

    //  Récupération des inputs dans des variables
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');

    // Creation de l'événement au click 
    btnCommandForm.addEventListener('click', function (event) {

        // Si la valeur de chaque input n'est pas renseignée
        if (!inputFirstName.value || !inputLastName.value || !inputCity.value || !inputAddress.value || !inputEmail.value) {
            alert("Veuillez renseigner tous les champs !");
            event.preventDefault();
        } else {
            // Créer un tableau pour passer les infos dedans
            let productsId = [];
            for (let j = 0; j < productTable.lenght; j++) {
                productsId.push(productTable[i].id)
            }

            // Objet contact contenant les infos du formulaire à envoyer au serveur
            const order = {
                contact: {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                // Objet products contenant le ou les produits à envoyer au serveur
                products: productsId,
            };

            let options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json",
                }
            };

            // Envoyer les infos du tableau au serveur
            fetch('http://localhost:3000/api/products/order', options)
                .then((response) => response.json())
                .then((data) => {

                    document.location.href = './confirmation.html?orderId=' + data.orderId;
                })
                .catch((error) => {
                    alert("Problème avec fetch" + error.message);
                })
        }

    })
}
postForm();