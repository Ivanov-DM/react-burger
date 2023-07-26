import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import {
    EmailInput,
    PasswordInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./page.module.css";
import {useDispatch} from "react-redux";
import {signIn} from "../services/actions/auth";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState({ email: '', password: '' });

    const handleClick = (path) => {
        navigate(path, {replace: true});
    };

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = useCallback(
        evt => {
            evt.preventDefault();
            dispatch(signIn(form))
        }, [dispatch, form]
    );

    return (
        <>
            <div className="page">
                <div className={styles.container}>
                    <h1 className="text text_type_main-medium mb-6">Вход</h1>
                    <form className={styles.form}>
                        <EmailInput
                            onChange={onChange}
                            value={form.email}
                            name={'email'}
                            isIcon={false}
                            extraClass="mb-6"
                        />
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                        />
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                            onClick={login}
                            extraClass="mt-6">
                            Вход
                        </Button>
                    </form>
                    <div className={styles.pageLink}>
                        <p className="text text_type_main-default text_color_inactive pb-4">
                            Вы - новый пользователь?
                        </p>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={() => handleClick('/register')}
                            extraClass={styles.link}
                        >
                             Зарегистрироваться
                        </Button>
                    </div>
                    <div className={styles.pageLink}>
                        <p className="text text_type_main-default text_color_inactive">
                            Забыли пароль?
                        </p>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={() => handleClick('/forgot-password')}
                            extraClass={styles.link}
                        >
                            Восстановить пароль
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}