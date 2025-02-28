import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { Product } from '../../domain/models/Product';
import './ProductCard.scss';
import {
  GetFromCart,
  RemoveFromCart,
  SaveToCart,
} from '../../utils/sessionStorageHelper';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = GetFromCart();

    setIsInCart(cart.some((item) => item.id === product.id));
  }, [product]);

  const handleCartButtonClick = useCallback(() => {
    switch (isInCart) {
    case true:
      RemoveFromCart(product);
      setIsInCart(false);
      break;
    case false:
      SaveToCart(product);
      setIsInCart(true);
      break;
    }
  }, [product, isInCart]);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      layout
      layoutId={`product_${product.id}`}
      exit={{
        opacity: 0,
        scale: 0.3,
        y: -150
      }}
      transition={{ duration: 0.3}}
    >
      <div className="product-card__content">
        <img
          src={product.image}
          alt={`product_image_${product.title}`}
          className="product-card__image"
        />
        <div className="product-card__info">
          <div className="product-card__title">{product.title}</div>
          <div className="product-card__category">{product.category}</div>
        </div>
      </div>
      <div className="product-card__buy-info">
        <div className="product-card__price">${product.price.toFixed(2)}</div>

        <button
          className={classNames('product-card__button button button--primary',
            {'button--checked': isInCart, })}
          onClick={handleCartButtonClick}
        >
          <img
            src={isInCart ? '/icons/cart_added.svg' : '/icons/cart_add.svg'}
            alt="cart_icon"
            className="button__icon"
          />
        </button>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
