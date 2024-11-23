import {useMemo} from "react";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";

import {Counter, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";

const BurgerIngredientItem = (props) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id: props._id},
    });


    const constructorIngredients = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector(state => state.burgerConstructor.currentBun)
    const location = useLocation();

    const count = useMemo(() => {

        if (props.type === 'bun') {
            return currentBun?._id === props._id ? 1 : 0
        } else {
            return constructorIngredients?.filter(ingredient => ingredient._id === props._id).length
        }
    })
    return (
        <Link
            key={props._id}
            to={`/ingredients/${props._id}`}
            state={{background: location}}
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

BurgerIngredientItem.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

export default BurgerIngredientItem;
