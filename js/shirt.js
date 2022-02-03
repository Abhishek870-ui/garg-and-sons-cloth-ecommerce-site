let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name : "adidas",
        tag : 'Cartoon',
        price : 500,
        gst : 0.02,
        inCart : 0
    },

    {
        name : "Duke",
        tag :  'Astronaut' ,
        price : 600,
        gst : 0.03,
        inCart : 0
    },

    {
        name : "ck",
        tag :  "T-Shirts",
        price : 700,
        gst : 0.03,
        inCart : 0
    },

    {
        name : "Dolor",
        tag : 'Cartoon' ,
        price : 500,
        gst : 0.04,
        inCart : 0
    }

];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent =productNumbers;
    }


}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent =productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;

    }
    setItems(product);
}


function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }

    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",((cartCost + product.price)+(cartCost + product.price)*product.gst));

    }
    else{
        localStorage.setItem("totalCost" , ((product.price) + (product.price)*product.gst))
    }
}


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product">
               <ion-icon name = "close-circle"></ion-icon>
               <img src = "${imageSrc}">
               <span>${item.name}</span>
            </div> 
            <div class = "price">${item.price}</div>
            <div class = "gst">${item.gst}</div>
            <div class = "quantity">
            <ion-icon class = "decrease" name = "arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class = "increase" name = "arrow-dropright-circle"></ion-icon>
            </div>
            <div class = "total">
                $${((item.inCart * item.price)+(item.inCart * item.price)*item.gst)}
                </div>`;
        });

        productContainer.innerHTML += `
        <div class = "basketTotalContainer">
            <h4 class = "basketTotalTitle">
                Basket Total
            </h4>
            <h4 class = basketTotal">
            $${cartCost}
            </h4>`
    }


}

onLoadCartNumbers();
onLoadCartNumbers();