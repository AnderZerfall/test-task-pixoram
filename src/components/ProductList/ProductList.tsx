import ProductCard from '../ProductCard/ProductCard';
import { ErrorType } from '../../domain/models/ErrorType';
import { Product } from '../../domain/models/Product';
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { AnimatePresence, motion } from 'framer-motion';

import './ProductList.scss';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from '../../utils/filterHelper';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setPageCount(Math.ceil(products.length / ITEMS_PER_PAGE));
  }, [products]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (page) {
      if (+page >= pageCount) {
        setCurrentPage(+page - 1);
      } else {
        setCurrentPage(+page);
      }
    }
  }, [searchParams, pageCount]);

  const handlePageChange = useCallback(
    (selectedItem: { selected: number }) => {
      const newParams = getSearchWith(searchParams,
        { page: selectedItem.selected.toString(),});

      setSearchParams(newParams);
    },
    [setSearchParams, searchParams]
  );

  const displayProducts = useMemo(() => {
    const offset = currentPage * ITEMS_PER_PAGE;

    return products.slice(offset, offset + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const renderedProducts = useMemo(() => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (!displayProducts.length) {
      return <ErrorPage error={error} />;
    }

    return (
      <div className="products__wrapper">
        <motion.div className="products">
          <AnimatePresence mode='popLayout'>
            {displayProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </AnimatePresence>
        </motion.div>
        {products.length > ITEMS_PER_PAGE && (
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
            nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            disabledClassName="disabled"
            activeClassName="active"
            pageClassName="pagination__item"
          />
        )}
      </div>
    );
  }, [
    pageCount,
    isLoading,
    error,
    displayProducts,
    handlePageChange,
    currentPage,
    products,
  ]);

  return renderedProducts;
};
