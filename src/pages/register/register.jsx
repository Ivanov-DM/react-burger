import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/page.module.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/actions/auth";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { replace: true });
  };

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const register = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(registerUser(form));
    },
    [dispatch, form]
  );

  return (
    <>
      <div className="page">
        <div className={styles.container}>
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <form className={styles.form} onSubmit={register}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={onChange}
              value={form.name}
              name="name"
              error={false}
              errorText="Ошибка"
              size="default"
              extraClass="mb-6"
            />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name="email"
              isIcon={false}
              extraClass="mb-6"
            />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name="password"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mt-6"
            >
              Зарегистрироваться
            </Button>
          </form>
          <div className={styles.pageLink}>
            <p className="text text_type_main-default text_color_inactive pb-4">
              Уже зарегистрированы?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => handleClick("/login")}
              extraClass={styles.link}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
