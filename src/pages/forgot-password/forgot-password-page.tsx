import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./forgot-password-page.module.css";
import {fetchWithCheck} from "../../utils/api.ts";
import {FORGOT_PASS_ENDPOINT} from "../../utils/dictionary.js";

import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.tsx";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>('')

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        await fetchWithCheck(FORGOT_PASS_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

        sessionStorage.setItem('forgot', 'filled');

        navigate('/reset-password')
    }


    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>

                    <EmailInput
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />

                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </form>

                <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль? <Link
                    className={`${styles.link} text_color_accent`} to='/login'>Войти</Link></p>

            </div>
        </PageLayout>
    );
};


export default ForgotPasswordPage;
