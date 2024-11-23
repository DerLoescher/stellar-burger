import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import styles from "./navigation-item.module.css";

const NavigationItem = (props) => {
    return (
        <NavLink to={props.to} className={styles.item}>
            {({isActive}) => (
                <>
                    {props.children}

                    <p className={`${isActive ? 'text_color_primary' : 'text_color_inactive'} text text_type_main-small`}>{props.title}</p>
                </>)}
        </NavLink>
    );
};

NavigationItem.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string.isRequired,
    theme: PropTypes.string,
    to: PropTypes.string.isRequired,
};

export default NavigationItem;
