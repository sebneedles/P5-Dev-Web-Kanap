// Récupère les données de l'API
fetch("http://localhost:3000/api/products")
    
    // Données bruts en format json
    .then(data => data.json())

    // Ce que retourne le json
    .then(jsonListProduct => {

        // Boucle pour afficher tous les produits de l'array
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);

            // Affichage des produits dans le DOM
            document.querySelector(".items").innerHTML += `
            <a href="./product.html?${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
            `;
        }
        console.log(jsonListProduct)
    });

    // Objet Product
    class Product{
        constructor(jsonProduct){
            jsonProduct && Object.assign(this, jsonProduct);
        }
    }