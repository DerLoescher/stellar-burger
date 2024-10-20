import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientItem = (props) => {
  return (
    <div className={styles.ingredient}>
      <img src={props.image} alt={props.name} />

      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.price}</p>

        <CurrencyIcon type="primary" />
      </div>

      <p className='className="text text_type_main-small'>{props.name}</p>

      {props.count && (
        <Counter className={styles.counter} count={props.count} size="small" />
      )}
    </div>
  );
};

BurgerIngredientItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.price,
  image: PropTypes.string,
  count: PropTypes.number,
};

export default BurgerIngredientItem;
