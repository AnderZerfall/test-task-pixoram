import { Product } from 'domain/models/Product';

export const CART_UPDATE_EVENT = 'cartUpdate';
const CART_STORAGE_KEY = 'cart';

export const SaveToCart = (product: Product) => {
  try {
    const cart = GetFromCart();

    cart.push(product);
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  } catch {
    console.error('Error saving to cart');
  }
};

export const GetFromCart = (): Product[] => {
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

export const RemoveFromCart = (product: Product) => {
  try {
    const cart = GetFromCart();
    const newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);
    
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
  } catch {
    console.error('Error getting from cart');
  }
};
