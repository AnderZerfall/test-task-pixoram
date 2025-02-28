import { Categories } from '../domain/models/Categories';
import { Product } from '../domain/models/Product';

export const filterProductsByCategory = (
  products: Product[],
  category: Categories
) => {
  const currentCategory = category.toLowerCase();

  if (currentCategory === Categories.ALL.toLowerCase()) {
    return products;
  }

  return products.filter(
    (product: Product) => product.category.toLowerCase() === currentCategory
  );
};

export const ITEMS_PER_PAGE = 16;
