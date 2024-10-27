import styles from "./burger-constructor-page.module.css";
import PropTypes from "prop-types";

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
  data: PropTypes.arrayOf(
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

export default BurgerConstructorPage;
