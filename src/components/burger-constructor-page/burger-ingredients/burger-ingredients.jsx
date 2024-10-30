import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./ingredient-item/ingredient-item";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../../base/modal/modal";

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
        <Modal title={"Детали ингредиента"} onClose={closeIngredientModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
