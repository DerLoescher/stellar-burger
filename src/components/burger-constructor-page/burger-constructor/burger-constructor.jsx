import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-modal/order-details";

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
        <OrderDetails
          orderNumber={orderNumber}
          onClose={() => setOrderNumber(null)}
        />
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;
