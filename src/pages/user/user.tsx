import React, {FormEvent, useCallback} from "react";
import styles from "./user.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/hook";
import { signOut } from "../../services/actions/auth";
import Loader from "../../components/loader/loader";

export const UserPage = () => {
  const dispatch = useDispatch();
  const signOutRequest = useSelector((store) => store.userData.signOutRequest);
  const location = useLocation();
  const captionText: {[key: string]: string} = {
    "/profile": "В этом разделе вы можете изменить свои персональные данные",
    "/profile/orders":
      "В этом разделе вы можете просмотреть свою историю заказов",
  };

  const logout = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
      dispatch(signOut());
    },
    [dispatch]
  );

  if (signOutRequest) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <nav>
          <ul className={styles.nav}>
            <NavLink
              className={({ isActive }) =>
                `${styles.navItem} text text_type_main-medium ${
                  isActive ? "text_color_primary" : "text_color_inactive"
                }`
              }
              to={{ pathname: `/profile` }}
              end
            >
              Профиль
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.navItem} text text_type_main-medium ${
                  isActive ? "text_color_primary" : "text_color_inactive"
                }`
              }
              to={{ pathname: `/profile/orders` }}
              end
            >
              История заказов
            </NavLink>
            <li
              className={`${styles.navItem} text text_type_main-medium text_color_inactive`}
              onClick={logout}
            >
              Выход
            </li>
          </ul>
          <p
            className={`${styles.caption} text text_type_main-default text_color_inactive`}
          >
            {captionText[location.pathname]}
          </p>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
