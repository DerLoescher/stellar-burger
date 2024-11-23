import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from "./login-page.module.css";
import {login} from "../../services/user/user-actions.js";

import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.jsx";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(login({email, password}))

        navigate(-1);
    }


    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className="text text_type_main-medium">Вход</p>

                    <EmailInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />

                    <Input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        icon={'ShowIcon'}
                        value={password}
                        name={'password'}
                        onIconClick={() => setPasswordVisible(true)}
                    />

                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                </form>

                <p className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь? <Link
                    className={`${styles.link} text_color_accent`} to='/register'>Зарегистрироваться</Link></p>

                <p className="text text_type_main-default text_color_inactive mt-4">Забыли пароль? <Link
                    className={`${styles.link} text_color_accent`} to='/forgot-password'>Восстановить пароль</Link></p>

            </div>
        </PageLayout>
    );
};


export default LoginPage;
