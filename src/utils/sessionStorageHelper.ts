import { Product } from 'domain/models/Product';

export const CART_UPDATE_EVENT = 'cartUpdate';
const CART_STORAGE_KEY = 'cart';

export const saveToCart = (product: Product) => {
  try {
    const cart = getFromCart();

    cart.push(product);
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  } catch {
    console.error('Error saving to cart');
  }
};

export const getFromCart = (): Product[] => {
  try {
    const cart = sessionStorage.getItem(CART_STORAGE_KEY);

    if (cart) {
      return JSON.parse(cart);
    }
  } catch {
    console.error('Error getting from cart');
  }

  return [];
};

export const removeFromCart = (product: Product) => {
  try {
    const cart = getFromCart();
    const newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);
    
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  } catch {
    console.error('Error getting from cart');
  }
};
