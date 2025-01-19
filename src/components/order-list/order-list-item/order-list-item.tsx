import {FC, useMemo} from "react";
import styles from './order-list-item.module.css'
import {useSelector} from "../../../services/store.ts";
import {getIngredientsRecord} from "../../../services/ingredients/ingredients-slice.ts";
import useOrderStatus from "../../../hooks/use-order-status.ts";
import useFormattedDate from "../../../hooks/use-formatted-date.ts";

import BurgerIngredientMiniature from "../../burger-ingredients/ingredient-miniature/ingredient-miniature.tsx";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderListItem extends TFeedItem {
    size: string;
}

const OrderListItem: FC<IOrderListItem> = ({
                                               createdAt, ingredients,
                                               name,
                                               number,
                                               status,
                                               size
                                           }) => {

        const burgerIngredients = useSelector(getIngredientsRecord)

        const price = useMemo<number>(() => {
            return ingredients.reduce((acc, ingredientId) => {
                return acc + burgerIngredients[ingredientId]?.price || 0;
            }, 0)
        }, [ingredients, burgerIngredients])

        const formatedDate = useFormattedDate(createdAt)


        const isBig = useMemo(() => {
            return size === 'big';
        }, [size])

        const formattedStatus = useOrderStatus(status);

        return (
            <div className={`${styles.box} p-6`}>
                <div className={`${styles.row} mb-6`}>
                    <p className="text text_type_digits-medium text_color_primary">#{number}</p>

                    <p className="text text_type_main-default text_color_inactive">{formatedDate}</p>
                </div>

                <div className='mb-6'>
                    <p className="text text_type_main-medium text_color_primary">{name}</p>

                    {isBig &&
                        <p className={`text text_type_main-default mt-2 ${status === 'done' ? 'text_color_success' : 'text_color_primary'}`}>{formattedStatus}</p>}
                </div>

                <div className={`${styles.row} mb-6`}>
                    <div className={styles.ingredients}>
                        {ingredients.map((ingredientId, index) => {
                            const ingredient = burgerIngredients[ingredientId];

                            if (ingredient && index < 6) {
                                return <BurgerIngredientMiniature key={ingredientId + index} image={ingredient.image}
                                                                  name={ingredient.name}
                                                                  count={ingredients.length > 6 && index === 5 ? ingredients.length - index : null}
                                                                  zIndex={ingredients.length - index}/>
                            }
                        })}
                    </div>

                    <div className={styles.price}>
                        <p className="text text_type_digits-default text_color_primary">{price}</p>

                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        );
    }
;


export default OrderListItem;
