import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router";
import AppHeader from "../components/app-header/app-header";
import {
    EmailInput,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import {forgotPassword} from "../services/actions/auth";

import styles from "./page.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getForgotPasswordStatus = (store) => store.userData.forgotPasswordSuccess;
    const isPasswordReset = useSelector(getForgotPasswordStatus);

    const handleClick = (path) => {
        navigate(path, {replace: true});
    }

    const [email, setEmail] = React.useState('');
    const onChange = e => {
        setEmail(e.target.value)
    }

    const reset = useCallback(
        evt => {
            evt.preventDefault();
            dispatch(forgotPassword(email));
        }, [dispatch, email]
    );

    if (isPasswordReset) {
        return (
            <Navigate to="/reset-password" />
        )
    }

    return (
        <>
            <div className="page">
                <div className={styles.container}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <form className={styles.form}>
                        <EmailInput
                            onChange={onChange}
                            value={email}
                            name={'Укажите email'}
                            isIcon={false}
                        />
                        <Button
                            htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={reset}
                            extraClass="mt-6"
                        >
                            Восстановить
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
    );
}