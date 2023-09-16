import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/page.module.css";
import { forgotPasswordRequest } from "../../utils/burger-api";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleClick = (path: string) => {
    navigate(path, { replace: true });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const reset = (evt: FormEvent) => {
    evt.preventDefault();
    forgotPasswordRequest(email)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("resetPasswordSuccess", res.success.toString());
          navigate("/reset-password", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="page">
        <div className={styles.container}>
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <form className={styles.form} onSubmit={reset}>
            <EmailInput
              onChange={onChange}
              value={email}
              name="Укажите email"
              isIcon={false}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
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
