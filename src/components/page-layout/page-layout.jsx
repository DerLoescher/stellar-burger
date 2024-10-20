import PropTypes from "prop-types";
import styles from "./page-layout.module.css";

const PageLayout = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;
