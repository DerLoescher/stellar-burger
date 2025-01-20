import {useState} from "react";

import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "../navigation-item/navigation-item.tsx";

const NavigationProfile = () => {
    const [theme] = useState<TIconTypes>("secondary");

    return (
        <NavigationItem title="Личный кабинет" to='/profile'>
            <ProfileIcon type={theme}/>
        </NavigationItem>
    );
};

export default NavigationProfile;
