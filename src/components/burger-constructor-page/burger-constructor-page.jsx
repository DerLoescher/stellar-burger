import styles from "./burger-constructor-page.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";

import PageLayout from "../page-layout/page-layout";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";

const BurgerConstructorPage = (props) => {
  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <BurgerIngredients items={props.data} />

        <BurgerConstructor items={props.data} />
      </div>
    </PageLayout>
  );
};

BurgerConstructorPage.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructorPage;
