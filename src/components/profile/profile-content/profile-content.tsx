import styles from "./profile-content.module.css";
import {useDispatch, useSelector} from "../../../services/store.ts";
import useForm from "../../../hooks/use-form.ts";
import {editUser} from "../../../services/user/user-actions.ts";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileInput from "./profile-input/profile-input.tsx";
import {FormEventHandler} from "react";

const ProfileContent = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.user);

    const [form, setForm] = useForm<TUserForm>({
        name: currentUser?.name,
        email: currentUser?.email,
        password: ''
    });

    const onReset = () => {
        setForm({name: currentUser?.name, email: currentUser?.email, password: ''});
    }

    const onSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
        e.preventDefault();
        const changedFields: TUserForm = {};

        if (form.name !== currentUser?.name) {
            changedFields.name = form.name;
        }
        if (form.email !== currentUser?.email) {
            changedFields.email = form.email;
        }
        if (form.password) {
            changedFields.password = form.password;
        }
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