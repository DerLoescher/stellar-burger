import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./ingredient-item/ingredient-item";
import IngredientDetails from "./ingredient-details/ingredient-details";

const ingredientTypes = [
  { name: "Булки", slug: "bun" },
  { name: "Начинки", slug: "main" },
  { name: "Соусы", slug: "sauce" },
];

const BurgerIngredients = (props) => {
  const [currentIngredient, setCurrentIngredient] = useState();

  const [currentTab, setCurrentTab] = useState(ingredientTypes[0].slug);

  const openIngredientModal = (ingredient) => {
    setCurrentIngredient(ingredient);
  };
  const closeIngredientModal = () => {
    setCurrentIngredient(null);
  };

  return (
    <div className={`${styles.wrapper} pt-10 pb-10`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>

      <div className={`${styles.tabs} mb-10`}>
        {ingredientTypes.map((type) => (
          <Tab
            key={type.slug}
            value={type.slug}
            active={currentTab === type.slug}
            onClick={setCurrentTab}>
            {type.name}
          </Tab>
        ))}
      </div>

      <div className={styles.scrollable}>
        {ingredientTypes.map((type) => (
          <div className="mb-10" key={type.slug}>
            <p className="text text_type_main-medium mb-6">{type.name}</p>

            <ul className={styles["section-list"]}>
              {props.items
                .filter((item) => item.type === type.slug)
                .map((item) => {
                  return (
                    <BurgerIngredientItem
                      key={item._id}
                      {...item}
                      onClick={() => openIngredientModal(item)}
                    />
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      {currentIngredient && (
        <IngredientDetails
          ingredient={currentIngredient}
          onClose={closeIngredientModal}
        />
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
