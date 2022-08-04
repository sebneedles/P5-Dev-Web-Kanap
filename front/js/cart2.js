let addProduct = JSON.parse(localStorage.getItem("product"));



const basketDisplay = async () => {
    if(addProduct){
        await addProduct;
        console.log('affichage de objet', addProduct);

       

        // Sélection de <section id="cart__items">
        const currentProduct = document.getElementById('cart__items');

        // Création des nouveau tags
        const newArticleProduct = document.createElement("article"); // <article>
        const newDivImg = document.createElement("div"); // <div>
        const newImgProduct = document.createElement("img"); // <img>
        
        const newDivContent = document.createElement('div'); // <div>
        const newDivDescription = document.createElement('div'); // <div>
        const newTitleDescription = document.createElement('h2'); // <h2>
        const newParagrapheColor = document.createElement('p'); // <p>
        const newParagraphePrice = document.createElement('p'); // <p>

        const newDivSetting = document.createElement('div') // <div>
        const newDivQuantity = document.createElement('div'); // <div>
        const newParagrapheQuantity = document.createElement('p'); // <p>
        const newInput = document.createElement('input'); // <input>

        const newDivDelete = document.createElement('div'); // <div>
        const newParagrapheDelete = document.createElement('p'); // <p>


        // Ajout des différents attributs dans les tags
        newArticleProduct.setAttribute("class", "cart__item");
        newArticleProduct.setAttribute("data-id", `${product._id}`);

        // Ajout de <article> dans <section id="cart__items">
        currentProduct.appendChild(newArticleProduct);

        // Ajout <div class="cart__item__img">


        /*cart__items.innerHTML = addProduct.map((product) => `
            <article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>Couleur : ${product.colors}</p>
                        <p>Prix : ${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" ${product.quantity} min="1" max="100" value="1" data-id="${product._id}">
                        </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${product._id}">Supprimer</p>
                    </div>
                    </div>
                </div>
            </article>
        `)
        document.querySelector(".cart__price").innerHTML = addProduct.map((product) => `
        <p>Total (<span id="totalQuantity">${product.quantity}</span> article) : <span id="totalPrice">${product.quantity * product.price}</span> €</p>
        `)*/
    }
};


// Appel de la fonction
basketDisplay();