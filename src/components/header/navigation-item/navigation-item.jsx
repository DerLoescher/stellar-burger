import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./navigation-item.module.css";

const NavigationItem = (props) => {
  const textStyle = useMemo(() => {
    return props.theme === "secondary" ? styles.secondary : null;
  }, [props.theme]);

  return (
    <div className={styles.item}>
      {props.children}

      <p className={`${textStyle} text text_type_main-small`}>{props.title}</p>
    </div>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  theme: PropTypes.string,
};

export default NavigationItem;
