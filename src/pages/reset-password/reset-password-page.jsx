import {useEffect, useState} from "react";
import useForm from "../../hooks/use-form.js";
import {Link, useNavigate} from "react-router-dom";
import styles from "./reset-password-page.module.css";
import {RESET_PASS_ENDPOINT} from "../../utils/dictionary.js";
import {fetchWithCheck} from "../../utils/api.js";

import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.jsx";

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
            if (sessionStorage.getItem('forgot') !== 'filled') {
                navigate('/forgot-password', {replace: true});
            }
        }, []
    )

    const [form, setForm] = useForm({token: '', password: ''});

    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetchWithCheck(RESET_PASS_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password: form.password, token: form.password}),
            });

        sessionStorage.setItem('forgot', 'empty');

        navigate('/login')
    }

    const showPassword = () => {
        setPasswordVisible(!passwordVisible)
    }


    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>

                    <Input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={setForm}
                        icon={'ShowIcon'}
                        value={form.password}
                        name={'password'}
                        onIconClick={showPassword}
                    />

                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={setForm}
                        value={form.token}
                        name={'token'}
                    />

                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </form>

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link
                    className={`${styles.link} text_color_accent`} to='/login'>Войти</Link></p>
            </div>
        </PageLayout>
    );
};


export default ResetPasswordPage;
