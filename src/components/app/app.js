import React from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  OrdersPage,
  UserPage,
  FeedPage,
  OrderInfoPage,
} from "../../pages";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { checkUserAuth } from "../../services/actions/auth";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes
        location={
          location.pathname.includes("ingredients") ? background : location
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route
          path="/feed/:id"
          element={
            background ? (
              <OrderInfoPage inModal={false} />
            ) : (
              <Modal
                header={`#${location.pathname.replace(/\D/g, "")}`}
                boxStyles="pt-10 pr-10 pb-15 pl-10"
                onClose={handleModalClose}
              >
                <OrderInfoPage inModal={true} />
              </Modal>
            )
          }
        />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails inModal={false} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<UserPage />} />}>
          <Route index element={<OnlyAuth component={<ProfilePage />} />} />
          <Route
            path="orders"
            element={<OnlyAuth component={<OrdersPage />} />}
          />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            background ? (
              <OrderInfoPage inModal={false} />
            ) : (
              <Modal
                header={location.pathname.replace(/\D/g, "")}
                boxStyles="pt-10 pr-10 pb-15 pl-10"
                onClose={handleModalClose}
              >
                <OnlyAuth component={<OrderInfoPage inModal={true} />} />
              </Modal>
            )
          }
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                header="Детали ингредиента"
                boxStyles="pt-10 pr-10 pb-15 pl-10"
                onClose={handleModalClose}
              >
                <IngredientDetails inModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
