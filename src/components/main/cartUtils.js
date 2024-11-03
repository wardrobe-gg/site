// cartUtils.js

// Helper function to trigger the custom 'cartUpdated' event
const triggerCartUpdateEvent = () => {
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
};

// Function to get the current cart from localStorage
export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

// Function to add an item to the cart, ensuring no duplicates by id
export const addToCart = (newItem) => {
    let cartData = getCart();
    
    // Check if the item already exists in the cart by id
    const itemExists = cartData.some(item => item.id === newItem.id);
    
    if (!itemExists) {
        cartData.push({
            name: newItem.name,
            cost: newItem.cost,
            id: newItem.id,
            quantity: 1,
            price: newItem.stripe_priceid
        }); // Add new item
        localStorage.setItem('cart', JSON.stringify(cartData)); // Update localStorage
        triggerCartUpdateEvent(); // Trigger update event
    }
};
// Function to remove an item from the cart
export const removeFromCart = (itemIndex) => {
    const cartData = getCart();
    cartData.splice(itemIndex, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cartData)); // Update localStorage
    triggerCartUpdateEvent(); // Trigger update event
};

// Function to clear the cart
export const clearCart = () => {
    localStorage.removeItem('cart'); // Clear localStorage
    triggerCartUpdateEvent(); // Trigger update event
};