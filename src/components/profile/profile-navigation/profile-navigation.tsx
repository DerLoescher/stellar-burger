import {NavLink} from "react-router-dom";
import styles from "./profile-navigation.module.css"
import {useDispatch} from "../../../services/store.ts";
import {logout} from "../../../services/user/user-actions.ts";

const ProfileNavigation = () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    }

    return <div className={styles.wrapper}>
        <NavLink to="/profile" end>
            {({isActive}) => <p
                className={`${isActive ? 'text_color_primary' : 'text_color_inactive'} text text_type_main-medium pt-4 pb-4`}>Профиль</p>}
        </NavLink>

        <NavLink to="/profile/orders">
            {({isActive}) => <p
                className={`${isActive ? 'text_color_primary' : 'text_color_inactive'} text text_type_main-medium pt-4 pb-4`}>История
                заказов</p>}
        </NavLink>

        <button onClick={logOut}>
            <p className="text text_color_inactive text_type_main-medium pt-4 pb-4">Выход</p>
        </button>

        <p className="text text_color_inactive text_type_main-default mt-20">
            В этом разделе вы можете
            изменить свои персональные данные
        </p>

    </div>
}

export default ProfileNavigation;