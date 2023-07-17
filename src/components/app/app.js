import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import {
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    NotFound404,
    OrdersPage, UserPage
} from "../../pages";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {useNavigate} from "react-router";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    }

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />}/>
                <Route path="ingredients/:ingredientsId" element={<IngredientDetails />} />
                <Route path="/profile" element={<OnlyAuth component={<UserPage />}/>}>
                    <Route index element={<OnlyAuth component={<ProfilePage />}/>}/>
                    <Route path="orders" element={<OnlyAuth component={<OrdersPage />}/>}/>
                </Route>
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />}/>
                <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />}/>
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />}/>}/>
                <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />}/>}/>
                <Route path="*" element={<NotFound404 />}/>
            </Routes>
            {background && (
                <Routes>
                    <Route path="ingredients/:ingredientId" element={
                        <Modal onClose={handleModalClose}>
                            <IngredientDetails />
                        </Modal>
                    }
                    />
                </Routes>
            )}
        </>
    );
}
