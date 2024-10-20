import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = (props) => {
  const totalPrice = useMemo(() => {
    return props.items.reduce((result, item) => {
      return (result += item.price);
    }, 0);
  }, [props.items]);

  return (
    <div className={`${styles["constructor-block"]}`}>
      <div className={styles["constructor-list"]}>
        {props.items.map((element, index) => (
          <ConstructorElement
            key={element._id}
            className="mb-4"
            type={element.type === "bun" && (index === 0 ? "top" : "bottom")}
            isLocked={element.type === "bun"}
            text={element.name}
            price={element.price}
            thumbnail={element.image}
          />
        ))}
      </div>

      <div className={`${styles.footer} mt-10`}>
        <div className={styles.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>

          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.array,
};

export default BurgerConstructor;
