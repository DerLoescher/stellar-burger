import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

import Modal from "../../../base/modal/modal";

const ingredientDetailTypes = [
  { title: "Калории,ккал", slug: "calories" },
  { title: "Белки, г", slug: "proteins" },
  { title: "Жиры, г", slug: "fat" },
  { title: "Углеводы, г", slug: "carbohydrates" },
];

const IngredientDetails = (props) => {
  return (
    <Modal title={"Детали ингредиента"} onClose={props.onClose}>
      <>
        <img
          className={styles.image}
          src={props.ingredient.image_large}
          alt={props.ingredient.name}
        />

        <div className={`${styles.description} mt-4`}>
          <p className='className="text text_type_main-medium'>
            {props.ingredient.name}
          </p>

          <div className={styles.detail}>
            {ingredientDetailTypes.map((type) => (
              <div className={styles["detail-item"]} key={type.slug}>
                <p className='className="text text_type_main-small'>
                  {type.title}
                </p>

                <p className="text text_type_digits-default">
                  {props.ingredient[type.slug]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
