import { Product } from '../../domain/models/Product';
import React, { useEffect, useState } from 'react';
import { CART_UPDATE_EVENT, GetFromCart } from '../../utils/sessionStorageHelper';
import { ErrorType } from '../../domain/models/ErrorType';
import { ProductList } from '../../components/ProductList/ProductList';

export const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCart(GetFromCart());
    setLoading(false);
    addEventListener(CART_UPDATE_EVENT, () => setCart(GetFromCart()));

    return () =>
      removeEventListener(CART_UPDATE_EVENT, () => setCart(GetFromCart()));
  }, []);

  return (
    <div className="card-page page">
      <div className="card-page__title-block title-block">
        <h1 className="cart-page__title title">Cart page</h1>
      </div>
      <ProductList
        products={cart}
        isLoading={isLoading}
        error={ErrorType.EMPTY_CART}
      />
    </div>
  );
};
