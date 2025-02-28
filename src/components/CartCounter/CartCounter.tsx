import './CartCounter.scss';

type Props = {
    counter: number;
}

export const CartCounter: React.FC<Props> = ({ counter }) => {
  return <div className="cart-counter">{counter}</div>;
};
