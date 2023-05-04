import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header_content}>
        <nav className={`${appHeaderStyles.header_nav} pt-4 pb-4`}>
          {/*eslint-disable-next-line*/}
          <a className={`${appHeaderStyles.header_link} p-4`} href="#">
            <BurgerIcon type="primary" />
            <p className="text_type_main-default text_color_primary ml-2">
              Конструктор
            </p>
          </a>
          {/*eslint-disable-next-line*/}
          <a className={`${appHeaderStyles.header_link} p-4`} href="#">
            <ListIcon type="secondary" />
            <p className="text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </a>
        </nav>
        <Logo />
        {/*eslint-disable-next-line*/}
        <a className={`${appHeaderStyles.header_link} p-4`} href="#">
          <ProfileIcon type="secondary" />
          <p className="text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
}
