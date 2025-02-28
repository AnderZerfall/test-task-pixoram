import classNames from 'classnames';

export const getActivePage = ({
  isActive,
  className = 'nav__link',
}: {
  isActive: boolean;
  className?: string;
}) => {
  return classNames(className, { 'is-active': isActive });
};
