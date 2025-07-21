import classnames from 'classnames';
import styles from './CategoryList.module.scss';

export interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryList = ({
  categories,
  activeCategory = 'All',
  onCategoryChange = () => {},
}: CategoryListProps) => {
  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <button
          className={classnames({
            [styles.isActive]: activeCategory === category,
          })}
          key={category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
