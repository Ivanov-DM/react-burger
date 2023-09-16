import { useSelector } from "../../services/types/hook";
import { Navigate, useLocation } from "react-router-dom";
import {RootState} from "../../services/types";

interface IProtectedProps {
  onlyUnAuth?: boolean;
  component: JSX.Element
}

const Protected = ({ onlyUnAuth = false, component }: IProtectedProps) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.userData.isAuthChecked);
  const getUserData = (store: RootState) => store.userData.user;
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <>
        <div className="page">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IProtectedProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
