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
    if (productTable.length === 0) {
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

    getTotalProducts()
}


/* -------------------------------------------------------------------------------- 
AFFICHER LA QUANTITE ET PRIX TOTAL
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