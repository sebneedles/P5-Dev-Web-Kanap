// Récupération du tableau et conversion en js
let addProduct = JSON.parse(localStorage.getItem("product"));


// Nouvelle fonction basketDisplay
const basketDisplay = async () => {
    // Vérification si le produit éxiste
    if(addProduct){
        await addProduct;
        console.log('est ce que le produit existe ?', addProduct);
        

    } else {
        // rien pour le moment
    }
}; 

basketDisplay();