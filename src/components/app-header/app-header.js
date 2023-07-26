import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header_content}>
        <nav className={`${appHeaderStyles.header_nav} pt-4 pb-4`}>
          <NavLink
            className={`${appHeaderStyles.header_link} p-4`}
            to={{ pathname: `/` }}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={`text_type_main-default ml-2 ${
                    isActive ? "text_color_primary" : "text_color_inactive"
                  }`}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink
            className={`${appHeaderStyles.header_link} p-4`}
            to={{ pathname: `/orders` }}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={`text_type_main-default ml-2 ${
                    isActive ? "text_color_primary" : "text_color_inactive"
                  }`}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>

        <Logo />

        <NavLink
          className={`${appHeaderStyles.header_link} p-4`}
          to={{ pathname: `/profile` }}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p
                className={`text_type_main-default ml-2 ${
                  isActive ? "text_color_primary" : "text_color_inactive"
                }`}
              >
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
}
