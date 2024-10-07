function addToCart(id) {
    "use client";

    const currentCart = localStorage.getItem('cart');

    let newCart = JSON.parse(currentCart).append(id);

    localStorage.setItem(newCart)
}

function removeFromCart(id) {
    "use client";

    const currentCart = localStorage.getItem('cart');

    
}