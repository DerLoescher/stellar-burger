import {useParams} from "react-router-dom";
import styles from "./order-details.module.css";
import {useDispatch, useSelector} from "../../../services/store.ts";
import {loadOrderDetail} from "../../../services/order/order-actions.ts";
import {getFeed} from "../../../services/feed/feed-slice.ts";
import {useEffect, useMemo} from "react";
import {getIngredientsRecord} from "../../../services/ingredients/ingredients-slice.ts";
import useOrderStatus from "../../../hooks/use-order-status.ts";
import useFormattedDate from "../../../hooks/use-formatted-date.ts";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientMiniature from "../../burger-ingredients/ingredient-miniature/ingredient-miniature.tsx";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const {number: number} = useParams();

    const orders = useSelector(getFeed);
    const order = useSelector(state => state.order.order);
    const loading = useSelector(state => state.order.status === "loading");

    const burgerIngredients = useSelector(getIngredientsRecord)


    useEffect(() => {
        if (!order && number) {
            dispatch(loadOrderDetail(number));
        }
    }, [])


    const currentOrder = useMemo(() => {
        return orders.find((item) => item.number === Number(number)) || order
    }, [number, order])

    const price = useMemo(() => {
        return currentOrder?.ingredients.reduce((acc, ingredientId) => {
            return acc + burgerIngredients[ingredientId]?.price || 0;
        }, 0) ?? 0
    }, [currentOrder, burgerIngredients])

    const formattedStatus = useOrderStatus(currentOrder?.status);

    const formattedDate = useFormattedDate(currentOrder?.createdAt)

    return <div className={styles.wrapper}>
        {loading || !currentOrder ?
            (<div>Loading...</div>)
            :
            (
                <div>
                    <p className={`${styles.title} text text_type_digits-default text_color_primary mb-10`}>#{currentOrder.number}</p>

                    <p className="text text_type_main-medium text_color_primary mb-3">{currentOrder.name}</p>

                    <p className={`text text_type_main-default mb-15 ${currentOrder.status === 'done' ? 'text_color_success' : 'text_color_primary'}`}>{formattedStatus}</p>

                    <div className={`mb-10`}>
                        <p className="text text_type_main-medium text_color_primary mb-6">Состав:</p>

                        <ul>
                            {currentOrder.ingredients.map((ingredientId) => (
                                <li key={ingredientId} className={`${styles.ingredient} mb-4`}>
                                    <div className={`${styles.ingredient}`}>
                                        <BurgerIngredientMiniature key={ingredientId}
                                                                   image={burgerIngredients[ingredientId].image}
                                                                   name={burgerIngredients[ingredientId].name}/>

                                        <p className="text text_type_main-default text_color_primary ml-4">{burgerIngredients[ingredientId].name}</p>
                                    </div>

                                    <div className={`${styles.ingredient}`}>
                                        <p className="text text_type_digits-default text_color_primary mr-2">{burgerIngredients[ingredientId].price}</p>

                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${styles.ingredient}`}>
                        <p className="text text_type_main-default text_color_inactive">{formattedDate}</p>

                        <div className={`${styles.ingredient}`}>
                            <p className="text text_type_digits-default text_color_primary">{price}</p>

                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            )}
    </div>;
};

export default OrderDetails;
