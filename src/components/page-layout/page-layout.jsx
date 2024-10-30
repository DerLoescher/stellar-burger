import PropTypes from "prop-types";
import styles from "./page-layout.module.css";

const PageLayout = (props) => {
  return <main className={styles.layout}>{props.children}</main>;
};

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;
