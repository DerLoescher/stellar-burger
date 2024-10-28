import { ingredientPropTypes } from "../../../../utils/types";
import styles from "./ingredient-details.module.css";

const ingredientDetailTypes = [
  { title: "Калории,ккал", slug: "calories" },
  { title: "Белки, г", slug: "proteins" },
  { title: "Жиры, г", slug: "fat" },
  { title: "Углеводы, г", slug: "carbohydrates" },
];

const IngredientDetails = (props) => {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

export default IngredientDetails;
