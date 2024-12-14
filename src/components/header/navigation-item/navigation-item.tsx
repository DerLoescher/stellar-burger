import {NavLink} from "react-router-dom";
import styles from "./navigation-item.module.css";
import {FC, ReactNode} from "react";

interface INavigationItem {
    title: string
    to: string
    children: ReactNode
}

const NavigationItem: FC<INavigationItem> = ({to, title, children}) => {
    return (
        <NavLink to={to} className={styles.item}>
            {({isActive}) => (
                <>
                    {children}

                    <p className={`${isActive ? 'text_color_primary' : 'text_color_inactive'} text text_type_main-small`}>{title}</p>
                </>)}
        </NavLink>
    );
};


export default NavigationItem;
