import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/store.ts";
import useForm from "../../hooks/use-form.ts";
import styles from "./login-page.module.css";
import {login} from "../../services/user/user-actions.ts";

import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.tsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useForm<Omit<TUserForm, 'name'>>({email: '', password: ''});

    const [passwordVisible, setPasswordVisible] = useState(false)

    const error = useSelector(state => state.user.error)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        await dispatch(login({email: form.email, password: form.password}))

        navigate(-1);
    }


    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className="text text_type_main-medium">Вход</p>

                    <EmailInput
                        onChange={setForm}
                        value={form.email}
                        name={'email'}
                        isIcon={false}
                    />

                    <Input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={'Пароль'}
                        onChange={setForm}
                        icon={'ShowIcon'}
                        value={form.password}
                        name={'password'}
                        onIconClick={() => setPasswordVisible(true)}
                    />

                    <Button htmlType="submit" type="primary" size="medium" disabled={!form.email || !form.password}>
                        Войти
                    </Button>

                </form>

                {error && <p className="text text_type_main-default text_color_error">{error}</p>}

                <p className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь? <Link
                    className={`${styles.link} text_color_accent`} to='/register'>Зарегистрироваться</Link></p>

                <p className="text text_type_main-default text_color_inactive mt-4">Забыли пароль? <Link
                    className={`${styles.link} text_color_accent`} to='/forgot-password'>Восстановить пароль</Link></p>

            </div>
        </PageLayout>
    );
};


export default LoginPage;
