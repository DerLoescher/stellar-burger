import { useState } from "react";
import styles from "./navigation-main-menu.module.css";

import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "../navigation-item/navigation-item";

const NavigationMainMenu = () => {
  const [theme] = useState("secondary");

  return (
    <nav>
      <ul className={styles.list}>
        <li className={`${styles.item} p-4`}>
          <NavigationItem title="Конструктор">
            <BurgerIcon type="primary" />
          </NavigationItem>
        </li>

        <li className={`${styles.item} p-4`}>
          <NavigationItem title="Лента заказов" theme={theme}>
            <ListIcon type={theme} />
          </NavigationItem>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMainMenu;
