import {useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./constructor-footer.module.css";
import {clearOrder} from "../../../../services/order/order-slice.js";
import {createOrder} from "../../../../services/order/order-actions.js";


import {Button, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../base/modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";


const BurgerConstructorFooter = () => {
    const dispatch = useDispatch();

    const constructorIngredients = useSelector((state) => state.burgerConstructor.burgerIngredients);
    const currentBun = useSelector((state) => state.burgerConstructor.currentBun);
    const orderNumber = useSelector((state) => state.order.createdOrder);

    const totalPrice = useMemo(() => {
        return (
            constructorIngredients.reduce((result, item) => {
                return (result += item.price);
            }, 0) + (currentBun?.price || 0) * 2
        );
    }, [constructorIngredients, currentBun]);

    const placeOrder = () => {
        if (constructorIngredients.length > 0 || currentBun) {
            const constructorIngredientsIds = constructorIngredients.map(ingredient => ingredient._id);
            if (currentBun) {
                constructorIngredientsIds.push(currentBun._id);
            }
            dispatch(createOrder(constructorIngredientsIds));
        }
    };
    const handleClearOrder = () => {
        dispatch(clearOrder());
    };


    return (
        <div>
            <div className={`${styles.footer} mt-10`}>
                <div className={styles.total}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>

                    <CurrencyIcon type="primary"/>
                </div>

                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={placeOrder}>
                    Оформить заказ
                </Button>
            </div>

            {orderNumber && (
                <Modal onClose={handleClearOrder}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            )}
        </div>
    );
};


export default BurgerConstructorFooter;
