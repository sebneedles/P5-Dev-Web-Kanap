let orderId = new URL(window.location.href).searchParams;
let id = orderId.get('orderId');

function getOrderId() {
    const displayOrderId = document.getElementById("orderId");
    displayOrderId.innerText = id;
    console.log("Le numéro de commande est celui-ci =>", id);
    localStorage.clear();
}

getOrderId();