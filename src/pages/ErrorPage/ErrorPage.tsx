import { ErrorType } from '../../domain/models/ErrorType';
import React, { useMemo } from 'react';

type Props = {
  error: ErrorType;
};

import './ErrorPage.scss';

export const ErrorPage: React.FC<Props> = ({ error }) => {
  const getImage = useMemo(() => {
    switch (error) {
    case ErrorType.PAGE_NOT_FOUND:
      return 'not_found';
    case ErrorType.PRODUCT_NOT_FOUND:
      return 'product_not_found';
    case ErrorType.EMPTY_CART:
      return 'empty_cart';
    case ErrorType.REQUEST_ERROR:
      return 'no_data';
    default:
      return 'error';
    }
  }, [error]);

  return (
    <div className="error-page page">
      <div className="error-page__image-block">
        <img
          src={`/img/${getImage}.svg`}
          alt={getImage}
          className="error-page__image"
        />
        <div className="error-page__title-block title-block">
          <h3 className="error-page__title">{error}</h3>
        </div>
      </div>
    </div>
  );
};
