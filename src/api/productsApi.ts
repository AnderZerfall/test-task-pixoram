import { RawProduct } from 'domain/dto/RawProduct';
import { Product } from 'domain/models/Product';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

// I've added a delay to demonstrate loaders

const wait = async (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getProducts = async (): Promise<Product[]> => {
  await wait(300);

  return fetch(PRODUCTS_URL)
    .then((response) => response.json())
    .then((rawProducts: RawProduct[]) => mapRawProductsToProducts(rawProducts));
};

const mapRawProductsToProducts = (rawProducts: RawProduct[]): Product[] => {
  return rawProducts.map((rawProduct) => ({
    id: rawProduct.id,
    title: rawProduct.title,
    price: rawProduct.price,
    category: rawProduct.category,
    image: rawProduct.image,
  }));
};
