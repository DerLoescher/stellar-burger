import styles from "./order-details.module.css";
import doneImage from "../../../assets/images/done.png";
import {FC} from "react";

interface IOrderDetails {
    orderNumber: number;
}

const OrderDetails: FC<IOrderDetails> = (props) => {
    return (
        <div className={styles.wrapper}>
            <p className="text text_type_digits-large mb-8 mt-4">
                {props.orderNumber}
            </p>

            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

            <img className="mb-15" src={doneImage} alt="Готово"/>

            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>

            <p className="text text_type_main-default text_color_inactive pb-15">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;
