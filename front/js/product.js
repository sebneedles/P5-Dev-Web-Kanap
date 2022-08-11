// Récupération du produit par ID
const product = window.location.search.split("?").join("");
console.log('ID du produit =>', product);

// Création table vide
let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((response) => response.json())
    .then((promise) => {
        productData = promise;
        console.log('Tableau du produit =>', productData);
    });
};


/* -------------------------------------------------------------------------------- 
AFFICHAGE DES ELEMENTS DU PRODUIT
-------------------------------------------------------------------------------- */
const productDisplay = async () => {

    await fetchProduct();

    // Changement des éléments du <head></head> : META TITLE
    newPageTitle = `Kanap | ${productData.name}`;
    document.title = newPageTitle;
    // Changement des éléments du <head></head> : META DESCRIPTION
    const meta = document.getElementsByTagName('meta')  
    meta.description.content = `${productData.description}`

    // Affichage des éléments de la page produit
    const currentImg = document.querySelector('div.item__img');
    
    // ajout de l'image et alt
    currentImg.setAttribute("id", "item__img");
    const newImgProduct = document.createElement("img");
    newImgProduct.setAttribute("src", `${productData.imageUrl}`);
    newImgProduct.setAttribute("alt", `${productData.altTxt}`);
    currentImg.appendChild(newImgProduct);

    // affichage du titre du produit
    const newTitleProduct = document.getElementById("title");
    const newContentTitle = document.createTextNode(`${productData.name}`);
    newTitleProduct.appendChild(newContentTitle);

    // affichage du prix
    const newPriceProduct = document.getElementById("price");
    const newContentPrice = document.createTextNode(`${productData.price} `);
    newPriceProduct.appendChild(newContentPrice);

    // affichage de la description du produit
    const newDescProduct = document.getElementById("description");
    const newContentDesc = document.createTextNode(`${productData.description}`);
    newDescProduct.appendChild(newContentDesc);

    // Modification du bouton 'Ajouter au panier' afin de récupérer l'ID
    const buttonBasket = document.querySelector(".item__content__addButton");
    buttonBasket.setAttribute("id", `${productData._id}`);

    let select = document.getElementById("colors");

    // Récupérer les éléments du tableau colors
    productData.colors.forEach((couleur) => {

        let tagOption = document.createElement("option");

        tagOption.innerHTML = `${couleur}`;
        tagOption.value = `${couleur}`;

        // Donner un enfant à la balise select
        select.appendChild(tagOption);
    });
    addBasket(productData);
};

// Appel de la fonction
productDisplay();
/* -------------------------------------------------------------------------------- 
FIN AFFICHAGE DES ELEMENTS DU PRODUIT
-------------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------------- 
FONCTION QUI AJOUTE LE PRODUIT AU PANIER
-------------------------------------------------------------------------------- */
const addBasket = () => {

    let bouton = document.getElementById(productData._id);
    
    bouton.addEventListener("click", () => {
        alert("le produit sera ajouté.")

        // json en format js avec parse
        let productTable = JSON.parse(localStorage.getItem("product")) || [];
        const selectColor = document.getElementById("colors");
        const selectQuantity = document.getElementById("quantity");  
        console.log('affiche la couleur choisie =>', selectColor.value);
        console.log('affiche la valeur du tableau =>', productTable);

        const storageProduct = {
            colors: `${selectColor.value}`,
            quantity: `${selectQuantity.value}`,
            id: productData._id
        }

        productTable.push(storageProduct);
        console.log(productTable);
        // js en format json avec stringify
        localStorage.setItem("product", JSON.stringify(productTable));

    });
};
/* -------------------------------------------------------------------------------- 
FIN FONCTION QUI AJOUTE LE PRODUIT AU PANIER
-------------------------------------------------------------------------------- */