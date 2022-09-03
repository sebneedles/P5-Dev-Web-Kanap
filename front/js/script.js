// Récupération de l'API
fetch("http://localhost:3000/api/products")

.then(data => data.json())
.then(jsonListProduct => {

     // Changement des éléments du <head></head> : META TITLE
     document.title = "KANAP | Une gamme d'articles exclusifs";

    /* -------------------------------------------------------------------------------- 
    AFFICHAGE DE TOUS LES PRODUITS
    -------------------------------------------------------------------------------- */
    for(let jsonProduct of jsonListProduct) {
        let product = new Product(jsonProduct);

        // Elément <a>
        const newA = document.createElement("a");
        newA.setAttribute("href", `./product.html?${product._id}`); // attribut href et lien dynamique
        newA.setAttribute("target", "_self"); // suppression ouverture lien dans nouvel onglet
        const currentA = document.getElementById('items');
        currentA.appendChild(newA);

        // Elément <article>
        const newArticle = document.createElement("article");
        newA.appendChild(newArticle);

        // Elément <img>
        const newImg = document.createElement("img");
        newArticle.appendChild(newImg);
        newImg.setAttribute("src", `${product.imageUrl}`); // lien dynamique image
        newImg.setAttribute("alt", `${product.altTxt}`);

        // Elément <h3>
        const newTitleH3 = document.createElement("h3");
        newTitleH3.classList.add("productName");
        newArticle.appendChild(newTitleH3);
        const newContentTitle = document.createTextNode(`${product.name}`);
        newTitleH3.appendChild(newContentTitle);

        // Elément <p>
        const newParagraphe = document.createElement("p");
        newParagraphe.classList.add("productDescription");
        newArticle.appendChild(newParagraphe);
        const newContentP = document.createTextNode(`${product.description}`);
        newParagraphe.appendChild(newContentP);     
    }
    /* -------------------------------------------------------------------------------- 
    FIN AFFICHAGE DE TOUS LES PRODUITS
    -------------------------------------------------------------------------------- */
});

class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}