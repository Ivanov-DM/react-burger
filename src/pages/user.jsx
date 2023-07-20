import React, {useCallback} from "react";
import styles from "./user.module.css";
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../services/actions/auth";

export const UserPage = () => {
    const dispatch = useDispatch();
    const signOutRequest = useSelector(store => store.userData.signOutRequest);

    const logout = useCallback(
        evt => {
            evt.preventDefault();
            dispatch(signOut())
        }, [dispatch]
    );

    if (signOutRequest) {
        return (
            <>
                <div className="page">
                    <span className="loader"></span>
                </div>
            </>
        )
    }

    return (
        <div className="page">
            <div className={styles.container}>
                <nav>
                    <ul className={styles.nav}>
                        <NavLink
                            className={({isActive}) => `${styles.navItem} text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}
                            to={{ pathname: `/profile` }}
                            end
                        >
                            Профиль
                        </NavLink>
                        <NavLink
                            className={({isActive}) => `${styles.navItem} text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}
                            to={{ pathname: `/profile/orders` }}
                            end
                        >
                            История заказов
                        </NavLink>
                        <li
                            className={`${styles.navItem} text text_type_main-medium text_color_inactive`}
                            onClick={logout}
                        >Выход</li>
                    </ul>
                    <p className={`${styles.caption} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </nav>
                <Outlet/>
            </div>
        </div>
    )
}