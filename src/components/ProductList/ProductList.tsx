import ProductCard from '../ProductCard/ProductCard';
import { ErrorType } from '../../domain/models/ErrorType';
import { Product } from '../../domain/models/Product';
import { useMemo, useState } from 'react';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { AnimatePresence, motion } from 'framer-motion';

import './ProductList.scss';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from '../../utils/filterHelper';

type Props = {
  products: Product[];
  isLoading: boolean;
  error: ErrorType;
};

export const ProductList: React.FC<Props> = ({
  products,
  isLoading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page: { selected: number }) => {
    setCurrentPage(page.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(offset, offset + ITEMS_PER_PAGE);

  const renderedProducts = useMemo(() => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (!products.length) {
      return <ErrorPage error={error} />;
    }

    return (
      <div className="products__wrapper">
        <motion.div className="products">
          <AnimatePresence>
            {displayedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </AnimatePresence>
        </motion.div>
        {products.length > ITEMS_PER_PAGE && (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(products.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="pagination__item"
          />
        )}
      </div>
    );
  }, [products, isLoading, error, displayedProducts]);

  return renderedProducts;
};
