import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./profile-content.module.css";
import {editUser} from "../../../services/user/user-actions.js";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileInput from "./profile-input/profile-input.jsx";

const ProfileContent = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.user)
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');

    const onReset = () => {
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPassword('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const changedFields = {};

        if (name !== currentUser.name) {
            changedFields.name = name;
        }
        if (email !== currentUser.email) {
            changedFields.email = email;
        }
        if (password) {
            changedFields.password = password;
        }
        if (Object.keys(changedFields).length > 0) dispatch(editUser(changedFields));
    }


    return <form className={styles.form} onSubmit={onSubmit}>
        <ProfileInput type={'text'} placeholder={'Имя'} value={name} setValue={setName}/>

        <ProfileInput type={'email'} placeholder={'Логин'} value={email} setValue={setEmail}/>

        <ProfileInput type={'password'} placeholder={'Пароль'} value={password} setValue={setPassword}/>

        <div>
            <Button htmlType="reset" type="secondary" size="medium" onClick={onReset}>
                Отмена
            </Button>

            <Button htmlType="submit" type="primary" size="medium">
                Сохранить
            </Button>
        </div>
    </form>
}

export default ProfileContent;