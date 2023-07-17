import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router";
import AppHeader from "../components/app-header/app-header";
import {
    PasswordInput,
    Input,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./page.module.css";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../services/actions/auth";
import {Navigate} from "react-router-dom";

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState({ password: '', token: '' });

    const getResetPasswordStatus = (store) => store.userData.resetPasswordSuccess;
    const isPasswordChenged = useSelector(getResetPasswordStatus);

    const handleClick = (path) => {
        navigate(path, {replace: true});
    }

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = useCallback(
        evt => {
            evt.preventDefault();
            dispatch(resetPassword(form));
        }, [dispatch, form]
    )

    if (isPasswordChenged) {
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <>
            <div className="page">
                <div className={styles.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={styles.form}>
                        <PasswordInput
                            onChange={onChange}
                            value={form.password}
                            name={'password'}
                            extraClass="mb-6"
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={onChange}
                            value={form.token}
                            name={'token'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <Button
                            htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={savePassword}
                            extraClass="mt-6"
                        >
                            Сохранить
                        </Button>
                    </form>
                    <div className={styles.pageLink}>
                        <p className="text text_type_main-default text_color_inactive pb-4">
                            Вспомнили пароль?
                        </p>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            onClick={() => handleClick('/login')}
                            extraClass={styles.link}
                        >
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}