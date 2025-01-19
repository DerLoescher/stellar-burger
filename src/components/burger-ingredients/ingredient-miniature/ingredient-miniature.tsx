import {FC} from "react";
import styles from "./ingredient-miniature.module.css";

interface IBurgerIngredientMiniature {
    image: string
    name: string
    count?: number | null
    zIndex?: number
}

const BurgerIngredientMiniature: FC<IBurgerIngredientMiniature> = ({image, name, count, zIndex}) => {
    return (
        <div className={styles.wrapper} style={{zIndex}}>
            <img className={styles.image} src={image} alt={name}/>

            {count && <p className={`${styles.count} text text_type_digits-default text_color_primary`}>+{count > 99 ? 99 : count}</p>}
        </div>

    );
};


export default BurgerIngredientMiniature;
