import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from "./register-page.module.css";
import {register} from "../../services/user/user-actions.js";

import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PageLayout from "../../components/page-layout/page-layout.jsx";

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(register({name, email, password}))

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
                        onChange={e => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
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
                        Зарегистрироваться
                    </Button>
                </form>

                <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы? <Link
                    className={`${styles.link} text_color_accent`} to='/login'>Войти</Link></p>

            </div>
        </PageLayout>
    );
};


export default RegisterPage;
