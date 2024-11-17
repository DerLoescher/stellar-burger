import {useMemo} from "react";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";

import {Counter, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientItem = (props) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id: props._id},
    });


    const constructorIngredients = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector(state => state.burgerConstructor.currentBun)

    const count = useMemo(() => {
        if (props.type === 'bun') {
            return currentBun?._id === props._id ? 1 : 0
        } else {
            return constructorIngredients?.filter(ingredient => ingredient._id === props._id).length
        }
    })
    return (
        <div className={styles.ingredient} ref={dragRef} onClick={props.onClick}>
            <img src={props.image} alt={props.name}/>

            <div className={styles.price}>
                <p className="text text_type_digits-default">{props.price}</p>

                <CurrencyIcon type="primary"/>
            </div>

            <p className='className="text text_type_main-small'>{props.name}</p>

            {count > 0 && (
                <Counter className={styles.counter} count={count} size="small"/>
            )}
        </div>
    );
};

BurgerIngredientItem.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default BurgerIngredientItem;
