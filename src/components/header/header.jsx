import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationMainMenu from "./navigation-main-menu/navigation-main-menu";
import styles from "./header.module.css";
import NavigationProfile from "./navigation-profile/navigation-profile";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavigationMainMenu />

        <Logo className={styles.logo} />

        <NavigationProfile />
      </div>
    </header>
  );
}

export default AppHeader;
