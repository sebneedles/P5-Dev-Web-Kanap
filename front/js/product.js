// Récupération du produit par ID
const product = window.location.search.split("?").join("");
console.log('product in product js', product);
//console.log('ici mon produit par ID =>', product);

// Création table vide
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
    // Tout ca pour afficher une image ??
    // selection de la class existante
    const currentImg = document.querySelector('div.item__img');
    // ajout d'un id à la div
    currentImg.setAttribute("id", "item__img");
    // creation d'un new tag <img>
    const newImgProduct = document.createElement("img");
    // ajout des attributs à <img>
    newImgProduct.setAttribute("src", `${productData.imageUrl}`); // lien dynamique image
    newImgProduct.setAttribute("alt", `${productData.altTxt}`);
    //ajout du contenu dans <img>
    currentImg.appendChild(newImgProduct);
    console.log('youpi, une image ... =>', newImgProduct);

    // affichage du titre du produit
    const newTitleProduct = document.getElementById("title");
    const newContentTitle = document.createTextNode(`${productData.name}`);
    console.log('titre produit =>', newTitleProduct);
    newTitleProduct.appendChild(newContentTitle);

    // affichage du prix
    const newPriceProduct = document.getElementById("price");
    const newContentPrice = document.createTextNode(`${productData.price} `);
    console.log('prix produit =>', newContentPrice);
    newPriceProduct.appendChild(newContentPrice);

    // affichage de la description du produit
    const newDescProduct = document.getElementById("description");
    console.log('desc', newDescProduct);
    const newContentDesc = document.createTextNode(`${productData.description}`);
    newDescProduct.appendChild(newContentDesc);


    // Modification du bouton 'Ajouter au panier' afin de récupérer l'ID
    
    const buttonBasket = document.querySelector(".item__content__addButton");
    buttonBasket.setAttribute("id", `${productData._id}`);

    let select = document.getElementById("colors");
        //console.log('récupération du select couleur =>', select);    
        //console.log('récupération du nombre de couleur =>', productData.colors);

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

// fonction qui ajoute produit dans le panier
const addBasket = () => {
    let bouton = document.getElementById(productData._id);
    //console.log(bouton);
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
            id: `${product}`
        }

        // const fusionProductColors = Object.assign({}, productData, {
        //     colors: `${select.value}`,
        //     quantity: 1,
        // });
        //console.log(fusionProductColors);
        productTable.push(storageProduct);
        console.log(productTable);
        // js en format json avec stringify
        localStorage.setItem("product", JSON.stringify(productTable));

    });
};