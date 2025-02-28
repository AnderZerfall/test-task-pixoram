import { Categories } from '../domain/models/Categories';
import {
  createContext,
  ReactNode,
  useState
} from 'react';

type CategoryContextType = {
  selectedCategory: Categories;
  setSelectedCategory: (category: Categories) => void;
};

export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const CategoryContextProvider = (
  { children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    Categories.ALL
  );

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
