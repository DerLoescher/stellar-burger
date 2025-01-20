import {FC} from "react";
import styles from "./ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "../../../services/store.ts";

const ingredientDetailTypes: { title: string; slug: TNutritionKeys }[] = [
    {title: "Калории,ккал", slug: "calories"},
    {title: "Белки, г", slug: "proteins"},
    {title: "Жиры, г", slug: "fat"},
    {title: "Углеводы, г", slug: "carbohydrates"},
];

interface IIngredientDetails {
    title?: string;
}

const IngredientDetails: FC<IIngredientDetails> = ({title}) => {
    const {id} = useParams();

    const ingredient = useSelector(state => state.ingredients.allIngredients.find(ingredient => ingredient._id === id));
    const loading = useSelector(state => state.ingredients.status === "loading");

    return (ingredient &&
        <div className={styles.wrapper}>
            {loading ?
                (<div>Loading...</div>)
                :
                (<>
                    {title && (<p className='className="text text_type_main-large'>{title}</p>)}

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
