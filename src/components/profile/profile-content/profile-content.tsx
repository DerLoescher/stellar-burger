import {useDispatch, useSelector} from "react-redux";

import styles from "./profile-content.module.css";
import useForm from "../../../hooks/use-form.ts";
import {editUser} from "../../../services/user/user-actions.js";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileInput from "./profile-input/profile-input.js";
import {FormEventHandler} from "react";

type TForm = { name?: string, email?: string, password?: string }

const ProfileContent = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const currentUser: { name: string, email: string } = useSelector(state => state.user.user);

    const [form, setForm] = useForm<TForm>({
        name: currentUser.name,
        email: currentUser.email,
        password: ''
    });

    const onReset = () => {
        setForm({name: currentUser.name, email: currentUser.email, password: ''});
    }

    const onSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
        e.preventDefault();
        const changedFields: TForm = {};

        if (form.name !== currentUser.name) {
            changedFields.name = form.name;
        }
        if (form.email !== currentUser.email) {
            changedFields.email = form.email;
        }
        if (form.password) {
            changedFields.password = form.password;
        }
        // @ts-ignore
        if (Object.keys(changedFields).length > 0) dispatch(editUser(changedFields));
    }


    return <form className={styles.form} onSubmit={onSubmit}>
        <ProfileInput type={'text'} name='name' placeholder={'Имя'} value={form.name} setValue={setForm}/>

        <ProfileInput type={'email'} name='email' placeholder={'Логин'} value={form.email} setValue={setForm}/>

        <ProfileInput type={'password'} name='password' placeholder={'Пароль'} value={form.password}
                      setValue={setForm}/>

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