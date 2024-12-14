import {useState} from "react";
import styles from "./navigation-main-menu.module.css";

import {BurgerIcon, ListIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "../navigation-item/navigation-item.js";

const NavigationMainMenu = () => {
    const [theme] = useState<TIconTypes>("secondary");

    return (
        <nav>
            <ul className={styles.list}>
                <li className={`${styles.item} p-4`}>
                    <NavigationItem title="Конструктор" to='/'>
                        <BurgerIcon type="primary"/>
                    </NavigationItem>
                </li>

                <li className={`${styles.item} p-4`}>
                    <NavigationItem title="Лента заказов" to='/list'>
                        <ListIcon type={theme}/>
                    </NavigationItem>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationMainMenu;
