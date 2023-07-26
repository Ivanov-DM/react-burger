import React, {useCallback, useState} from "react";
import styles from "./profile.module.css";
import {
    Button,
    Input,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../services/actions/auth";
import Loader from "../components/loader/loader";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const getUserData = (store) => store.userData.user;
    const user = useSelector(getUserData);
    const [isVisible, setIsVisible] = useState(false);
    const initialFormState = {email: user.email, password: '', name: user.name};
    const [form, setValue] = useState(initialFormState);

    const updateUserRequest = useSelector((store) => store.userData.updateUserRequest);

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
        if (e.target.name === 'name' && e.target.value === user.name) {
            if (form.email === user.email && !form.password) {
                setIsVisible(false)
            }
        } else if (e.target.name === 'email' && e.target.value === user.email) {
            if (form.name === user.name && !form.password) {
                setIsVisible(false)
            }
        } else if (e.target.name === 'password' && !e.target.value) {
            if (form.email === user.email && form.name === user.name) {
                setIsVisible(false)
            }
        } else {
            setIsVisible(true)
        }
    };

    const resetForm = () => {
        setValue(initialFormState);
        setIsVisible(false);
    }

    const updateUserData = useCallback(
        evt => {
            evt.preventDefault();
            dispatch(updateUser(getUpdatedValue(form, user)))
        }, [dispatch, form]
    );

    const getUpdatedValue = (obj1, obj2) => {
        const res = {};
        Object.keys(obj1).forEach(key => {
            if (key === 'password') {
                if (obj1[key] !== '') {
                    res[key] = obj1[key]
                } else {
                    return
                }
            }
            if (obj1[key] !== obj2[key]) {
                res[key] = obj1[key]
            }
        })
        return res
    }

    return (
        updateUserRequest
            ? <Loader/>
            : (<form className={styles.form}>
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
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    icon="EditIcon"
                    value={form.email}
                    name={'email'}
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
                <div className={`${styles.buttonContainer} ${isVisible ? styles.buttonContainer_visible : ''}`}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        extraClass={styles.cancelButton}
                        onClick={resetForm}
                    >
                        Отменить
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={updateUserData}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>)
    );
}