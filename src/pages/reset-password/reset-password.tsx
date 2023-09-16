import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/page.module.css";
import { Navigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/burger-api";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [form, setValue] = useState({ password: "", token: "" });

  const handleClick = (path: string) => {
    navigate(path, { replace: true });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const resetPassword = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
      resetPasswordRequest(form).then((res) => {
        if (res.success) {
          localStorage.removeItem("resetPasswordSuccess");
          navigate("/login", { replace: true });
        }
      });
    },
    [form]
  );

  if (!localStorage.getItem("resetPasswordSuccess")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="page">
        <div className={styles.container}>
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <form className={styles.form} onSubmit={resetPassword}>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name="password"
              extraClass="mb-6"
            />
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={onChange}
              value={form.token}
              name="token"
              error={false}
              errorText="Ошибка"
              size="default"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
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
