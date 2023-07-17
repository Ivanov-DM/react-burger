import React, {useState} from "react";
import styles from "./profile.module.css";
import {
    Button,
    Input,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

export const ProfilePage = () => {
    const getUserData = (store) => store.userData.user;
    const user = useSelector(getUserData);
    const [form, setValue] = useState({login: user.email, password: '', name: user.name});
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };


    return (
        <form className={styles.form}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                icon="EditIcon"
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={onChange}
                icon="EditIcon"
                value={form.login}
                name={'login'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                icon="EditIcon"
                extraClass="mb-6"
            />
            <div className={styles.buttonContainer}>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    extraClass={styles.cancelButton}
                >
                    Отменить
                </Button>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass={styles.link}
                >
                    Сохранить
                </Button>
            </div>
        </form>
    )
}