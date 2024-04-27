import { useContext } from 'react';
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

const MealItem = ({ meal }) => {
  const { image, name, description, price } = meal;
  const cartContext = useContext(CartContext);

  const handleAddMealToCart = () => {
    cartContext.addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)} </p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meail-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart </Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
