import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types";
import styles from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-modal/order-details";
import Modal from "../../base/modal/modal";

const BurgerConstructor = (props) => {
  const [orderNumber, setOrderNumber] = useState(null);

  const currentBun = useMemo(() => {
    return props.items.find((item) => item.type === "bun");
  }, [props.items]);
  const chosenIngredients = useMemo(() => {
    return props.items.filter((item) => item.type !== "bun");
  }, [props.items]);

  const totalPrice = useMemo(() => {
    return (
      chosenIngredients.reduce((result, item) => {
        return (result += item.price);
      }, 0) +
      (currentBun?.price ?? 0) * 2
    );
  }, [currentBun?.price, chosenIngredients]);

  const placeOrder = () => {
    setOrderNumber("034536");
  };

  return (
    <div className={`${styles["constructor-block"]}`}>
      {props.items.length > 0 && (
        <>
          <ConstructorElement
            className="mb-4"
            type="top"
            isLocked={true}
            text={`${currentBun.name} (верх)`}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />

          <div className={styles["constructor-list"]}>
            {chosenIngredients.map((element) => (
              <div className={styles["constructor-item"]} key={element._id}>
                <DragIcon type="primary" />

                <ConstructorElement
                  className="mb-4"
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            ))}
          </div>

          <ConstructorElement
            className="mb-4"
            type="bottom"
            isLocked={true}
            text={`${currentBun.name} (низ)`}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />
        </>
      )}

      <div className={`${styles.footer} mt-10`}>
        <div className={styles.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>

          <CurrencyIcon type="primary" />
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
        <Modal onClose={() => setOrderNumber(null)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
