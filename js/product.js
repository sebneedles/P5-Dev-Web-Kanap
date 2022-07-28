const product = window.location.search.split("?").join("");
console.log('ici mon produit par ID =>', product);

// var
let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((response) => response.json())
    .then((promise) => {
        productData = promise;
        console.log('Objet de mon produit =>', productData);
    });
};

// Afficher les éléments du  produit
const productDisplay = async () => {
    await fetchProduct();

    // Changement des éléments du head
    newPageTitle = `Kanap | ${productData.name}`;
    document.title = newPageTitle;

    const meta = document.getElementsByTagName('meta')  
    meta.description.content = `${productData.description}`

    // Affichage des éléments de la page produit
    document.querySelector(".item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
    document.getElementById("title").innerText = `${productData.name}`;
    document.getElementById("price").innerText = `${productData.price} `;
    document.getElementById("description").innerText = `${productData.description}`;

    // Modification du bouton 'Ajouter au panier' afin de récupérer l'ID
    document.querySelector(".item__content__addButton").innerHTML = `<button id="${productData._id}">Ajouter au panier</button>`;

    let select = document.getElementById("colors");
        console.log('récupération du select couleur =>', select);    
        console.log('récupération du nombre de couleur =>', productData.colors);

        // Récupérer les éléments du tableau colors
        productData.colors.forEach((couleur) => {
            //console.log(couleur);

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


// fonction qui ajoute dans le panier
const addBasket = () => {
    let bouton = document.getElementById(productData._id);
    //console.log(bouton);
    bouton.addEventListener("click", () =>{
        let productTable = JSON.parse(localStorage.getItem("product")) || [];
        let select = document.getElementById("colors");
        console.log('affiche la couleur choisie =>', select.value);
        console.log('affiche la valeur du tableau =>', productTable);

        const fusionProductColors = Object.assign({}, productData, {
            colors: `${select.value}`,
            quantity: 1,
        });
        console.log(fusionProductColors);

       // if(productTable == null) {
          //  productTable = [];
            productTable.push(fusionProductColors);
            console.log(productTable);
            localStorage.setItem("product", JSON.stringify(productTable));
        //}
    });
};