import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from "./services/store.ts";
import {getUser} from "./services/user/user-actions.ts";
import "./App.css";

import AppHeader from "./components/header/header.tsx";
import BurgerConstructorPage from "./pages/constructor-page/burger-constructor-page.tsx";
import LoginPage from "./pages/login/login-page.tsx";
import RegisterPage from "./pages/register-page/register-page.tsx";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password-page.tsx";
import ResetPasswordPage from "./pages/reset-password/reset-password-page.tsx";
import {OnlyAuth, OnlyUnAuth} from "./components/protected-route/protected-route.tsx";
import ProfilePage from "./pages/profile/profile-page.tsx";
import ProfileContent from "./components/profile/profile-content/profile-content.tsx";
import IngredientPage from "./pages/ingredient-page/ingredient-page.tsx";
import Modal from "./components/base/modal/modal.tsx";
import IngredientDetails from "./components/burger-ingredients/ingredient-details/ingredient-details.tsx";
import {NotFound404} from "./pages/not-found-page/not-found.tsx";

function App() {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(getUser())
    }, []);

    return (
        <>
            <AppHeader/>

            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:id'
                        element={
                            <OnlyAuth component={<Modal onClose={handleModalClose}>
                                <IngredientDetails/>
                            </Modal>}/>
                        }
                    />
                </Routes>
            )}

            <Routes location={background || location}>
                <Route path="*" element={<NotFound404/>}/>

                <Route path='/' element={<BurgerConstructorPage/>}/>

                <Route path='/ingredients/:id' element={<OnlyAuth component={<IngredientPage/>}/>}/>

                <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>}/>}>
                    <Route path='' element={<ProfileContent/>}/>

                    <Route path='/profile/orders' element={<p>История заказов</p>}/>
                </Route>

                <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>

                <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>}/>

                <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>}/>

                <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage/>}/>}/>
            </Routes>
        </>
    );
}

export default App;
