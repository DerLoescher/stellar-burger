import styles from "./ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadIngredients} from "../../../services/ingredients/ingredients-actions.js";

const ingredientDetailTypes = [
    {title: "Калории,ккал", slug: "calories"},
    {title: "Белки, г", slug: "proteins"},
    {title: "Жиры, г", slug: "fat"},
    {title: "Углеводы, г", slug: "carbohydrates"},
];

const IngredientDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const ingredient = useSelector(state => state.ingredients.allIngredients.find(ingredient => ingredient._id === id));
    const loading = useSelector(state => state.ingredients.status === "loading");

    if (!ingredient) {
        dispatch(loadIngredients());
    }

    return (ingredient &&
        <div className={styles.wrapper}>
            {loading ?
                (<div>Loading...</div>)
                :
                (<>
                    <img
                        className={styles.image}
                        src={ingredient.image_large}
                        alt={ingredient.name}
                    />

                    <div className={`${styles.description} mt-4`}>
                        <p className='className="text text_type_main-medium'>
                            {ingredient.name}
                        </p>

                        <div className={styles.detail}>
                            {ingredientDetailTypes.map((type) => (
                                <div className={styles["detail-item"]} key={type.slug}>
                                    <p className='className="text text_type_main-small'>
                                        {type.title}
                                    </p>

                                    <p className="text text_type_digits-default">
                                        {ingredient[type.slug]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>)}
        </div>
    );
};

export default IngredientDetails;
