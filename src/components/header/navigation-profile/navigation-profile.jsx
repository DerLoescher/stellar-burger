import { useState } from "react";

import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "../navigation-item/navigation-item";

const NavigationProfile = () => {
  const [theme] = useState("secondary");

  return (
    <NavigationItem title="Личный кабинет" theme={theme} to='/profile'>
      <ProfileIcon type={theme} />
    </NavigationItem>
  );
};

export default NavigationProfile;
