import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./ingredient-item/ingredient-item";

const BurgerIngredients = (props) => {
  const [types] = useState([
    { name: "Булки", slug: "bun" },
    { name: "Начинки", slug: "main" },
    { name: "Соусы", slug: "sauce" },
  ]);
  const [currentTab, setCurrentTab] = useState(types[0].slug);

  return (
    <div className={`${styles.wrapper} pt-10 pb-10`}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>

      <div className="mb-10" style={{ display: "flex" }}>
        {types.map((type) => (
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
        {types.map((type) => (
          <div className="mb-10" key={type.slug}>
            <p className="text text_type_main-medium mb-6">{type.name}</p>

            <ul className={styles["section-list"]}>
              {props.items
                .filter((item) => item.type === type.slug)
                .map((item) => {
                  return <BurgerIngredientItem key={item._id} {...item} />;
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.array,
};

export default BurgerIngredients;
