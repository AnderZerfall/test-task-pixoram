import { getProducts } from '../../api/productsApi';
import { Product } from '../../domain/models/Product';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import './ProductsPage.scss';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { ErrorType } from '../../domain/models/ErrorType';
import { ProductList } from '../../components/ProductList/ProductList';
import { CategoryContext } from '../../context/CategoryContext';
import { filterProductsByCategory } from '../../utils/filterHelper';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState(ErrorType.PRODUCT_NOT_FOUND);
  const { selectedCategory } = useContext(CategoryContext);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setErrorType(ErrorType.REQUEST_ERROR))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(
    () => filterProductsByCategory(products, selectedCategory),
    [products, selectedCategory]
  );

  return (
    <div className="product-page page">
      <div className="product-page__title-block title-block">
        <h1 className="product-page__title title">Products page</h1>
      </div>
      <div className="product-page__filters">
        <CategoryFilter />
      </div>
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        error={errorType}
      />
    </div>
  );
};
