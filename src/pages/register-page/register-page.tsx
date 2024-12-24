import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useForm from "../../hooks/use-form.ts";
import styles from "./register-page.module.css";
import {register} from "../../services/user/user-actions.js";

import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.tsx";

type TForm = { name?: string, email?: string, password?: string }

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useForm<TForm>({name: '', email: '', password: ''});

    const [passwordVisible, setPasswordVisible] = useState(false)

    // @ts-ignore
    const error = useSelector(state => state.user.error)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // @ts-ignore
        dispatch(register({name: form.name, email: form.email, password: form.password}))

        navigate('/');
    }


    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className="text text_type_main-medium">Регистрация</p>

                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={setForm}
                        value={form.name}
                        name={'name'}
                        size={'default'}
                    />

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

                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </form>

                {error && <p className="text text_type_main-default text_color_error">{error}</p>}

                <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы? <Link
                    className={`${styles.link} text_color_accent`} to='/login'>Войти</Link></p>

            </div>
        </PageLayout>
    );
};


export default RegisterPage;
