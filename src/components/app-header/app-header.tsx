import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { getClasses } from "../../utils/utils";

type TIconTypes = "primary" | "secondary";

export default function AppHeader() {
  const location = useLocation();

  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.header_content}>
        <nav className={`${appHeaderStyles.header_nav} pt-4 pb-4`}>
          <NavLink
            className={`${appHeaderStyles.header_link} p-4`}
            to={{ pathname: `/` }}
          >
            <>
              <BurgerIcon
                type={
                  getClasses({
                    primary: location.pathname === "/",
                    secondary: location.pathname !== "/",
                  }) as TIconTypes
                }
              />
              <p
                className={getClasses({
                  "text_type_main-default": true,
                  "ml-2": true,
                  text_color_primary: location.pathname === "/",
                  text_color_inactive: location.pathname !== "/",
                })}
              >
                Конструктор
              </p>
            </>
          </NavLink>

          <NavLink
            className={`${appHeaderStyles.header_link} p-4`}
            to={{ pathname: `/feed` }}
          >
            <>
              <ListIcon
                type={
                  getClasses({
                    primary: location.pathname === "/feed",
                    secondary: location.pathname !== "/feed",
                  }) as TIconTypes
                }
              />
              <p
                className={getClasses({
                  "text_type_main-default": true,
                  "ml-2": true,
                  text_color_primary: location.pathname === "/feed",
                  text_color_inactive: location.pathname !== "/feed",
                })}
              >
                Лента заказов
              </p>
            </>
          </NavLink>
        </nav>

        <Logo />

        <NavLink
          className={`${appHeaderStyles.header_link} p-4`}
          to={{ pathname: `/profile` }}
        >
          <>
            <ProfileIcon
              type={
                getClasses({
                  primary: location.pathname === "/profile",
                  secondary: location.pathname !== "/profile",
                }) as TIconTypes
              }
            />
            <p
              className={getClasses({
                "text_type_main-default": true,
                "ml-2": true,
                text_color_primary: location.pathname === "/profile",
                text_color_inactive: location.pathname !== "/profile",
              })}
            >
              Личный кабинет
            </p>
          </>
        </NavLink>
      </div>
    </header>
  );
}
