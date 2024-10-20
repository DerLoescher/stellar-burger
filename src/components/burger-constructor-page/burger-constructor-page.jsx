import items from "../../utils/data.js";
import styles from "./burger-constructor-page.module.css";

import PageLayout from "../page-layout/page-layout";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";

const BurgerConstructorPage = () => {
  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <BurgerIngredients items={items} />

        <BurgerConstructor items={items} />
      </div>
    </PageLayout>
  );
};

export default BurgerConstructorPage;
