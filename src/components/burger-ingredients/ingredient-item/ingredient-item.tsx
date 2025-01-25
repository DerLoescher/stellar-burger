import {FC, useMemo} from "react";
import {useSelector} from "../../../services/store.ts";
import {useDrag} from "react-dnd";
import styles from "./ingredient-item.module.css";

import {Counter, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";

interface IBurgerIngredientItem extends TIngredient {
}

const BurgerIngredientItem: FC<IBurgerIngredientItem> = (props) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id: props._id},
    });

    const constructorIngredients: TIngredient[] = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector(state => state.burgerConstructor.currentBun)
    const location = useLocation();

    const count = useMemo(() => {

        if (props.type === 'bun') {
            return currentBun?._id === props._id ? 1 : 0
        } else {
            return constructorIngredients?.filter(ingredient => ingredient._id === props._id).length
        }
    }, [props.type, props._id])

    return (
        <Link
            key={props._id}
            to={`/ingredients/${props._id}`}
            state={{background: location}}
            data-testId="ingredient-item"
        >
            <div className={styles.ingredient} ref={dragRef}>
                <img src={props.image} alt={props.name}/>

                <div className={styles.price}>
                    <p className="text text_type_digits-default text_color_primary">{props.price}</p>

                    <CurrencyIcon type="primary"/>
                </div>

                <p className='className="text text_type_main-small text_color_primary'>{props.name}</p>

                {count > 0 && (
                    <Counter className={styles.counter} count={count} size="small"/>
                )}
            </div>
        </Link>
    );
};


export default BurgerIngredientItem;
