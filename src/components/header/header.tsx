import styles from "./header.module.css";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationMainMenu from "./navigation-main-menu/navigation-main-menu.tsx";
import NavigationProfile from "./navigation-profile/navigation-profile.tsx";

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
