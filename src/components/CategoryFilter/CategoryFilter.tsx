import React, {
  useCallback,
  useContext,
  useMemo
} from 'react';
import { Categories } from '../../domain/models/Categories';
import { CategoryContext } from '../../context/CategoryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import './CategoryFilter.scss';

export const CategoryFilter = () => {
  const { setSelectedCategory } = useContext(CategoryContext);

  const generateOptions = useMemo(
    () =>
      Object.values(Categories).map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      )),
    []
  );

  const handleSelection = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value) {
        setSelectedCategory(event.target.value as Categories);
        event.target.blur();
      }
    },
    [setSelectedCategory]
  );

  return (
    <div className="category-filter">
      <div className="category-filter__container">
        <select
          className="category-filter__select"
          name="category"
          id="category"
          onChange={handleSelection}
        >
          {generateOptions}
        </select>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="category-filter__icon"
        />
      </div>
    </div>
  );
};
