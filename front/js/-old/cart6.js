
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