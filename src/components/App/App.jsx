/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import Footer from "../Footer/Footer";
import auth from "../../utils/auth";
import apiMain from "../../utils/MainApi";
import apiMovies from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { SOMETHING_WENT_WRONG } from "../../constants/message";

function App() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние входа в систему

  const [currentUser, setCurrentUser] = useState({}); //Состояние текущего пользователя

  const [listMovies, setListMovies] = useState([]); // Фильмы, c beatfilm-movies
  const [listSavedMovies, setListSavedMovies] = useState([]); // Сохранённые фильмы
  

  const [serverError, setServerError] = useState(false); //Состояние ошибки сервера
  const [isStatusOKServer, setIsStatusOKServer] = useState(false); //Состояние сервера в 200

  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
          navigate(pathname);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
          onSignOut();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      Promise.all([
        apiMain.getUserInfo(), 
        apiMovies.getInitialMovies()
      ])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setListMovies(movies);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      apiMain
        .getSavedMovies()
        .then((savedMovies) => {
          setListSavedMovies(savedMovies.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
  }, [isLoggedIn]);

  // Регистрация
  const onRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        setServerError(false);
        if (!data) {
          throw new Error(SOMETHING_WENT_WRONG);
        }
        if (data) {
          onLogin(email, password);
          setCurrentUser(data);
        }
      })
      .catch(() => {
        setServerError(true);
      })
      .finally(() => setIsLoading(false));
  };

  // Авторизация
  const onLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        setServerError(false);
        if (!data) {
          throw new Error(SOMETHING_WENT_WRONG);
        }
        if (data) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.jwt);
        }
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch(() => {
        setServerError(true);
      });
  };

  // Сохранить фильм
  function handleSaveFilm(film, isSavedFilm, infoSaveFilm) {
    if (isSavedFilm) {
      handleDeleteFilm(infoSaveFilm);
    } else {
      apiMain
        .saveFilm(film)
        .then((film, e) => {
          setListSavedMovies([film, ...listSavedMovies]);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
    }
  }

  // Удалить из сохраненных фильм
  function handleDeleteFilm(film) {
    apiMain
      .deleteFilm(film._id)
      .then((film) => {
        const newSavedMovies = listSavedMovies.filter((f) => (f._id === film._id ? "" : f));
        setListSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
  }

  // Изменить данные пользователя
  function handleEditUserInfo(data) {
    apiMain
      .editUserInfo(data)
      .then((data) => {
        setServerError(false);
        setIsStatusOKServer(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
        setServerError(true);
      })
      .finally(() => setIsLoading(false));
  }

  // Выход из профиля
  const onSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("queryForSearch");
    localStorage.removeItem("stateCheckBox");
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header isLogged={isLoggedIn} />
        ) : null}
        <main>
          {isLoading ? (
            <Preloader />
          ) : (
        <Routes>
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
              <Register
                onRegister={onRegister}
                serverError={serverError}
                setServerError={setServerError}
              />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
              <Login
                onLogin={onLogin}
                serverError={serverError}
                setServerError={setServerError}
              />
              )
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Movies}
                movies={listMovies}
                savedMovies={listSavedMovies}
                onSaveFilm={handleSaveFilm}
                onUnsaveFilm={handleDeleteFilm}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
                movies={listSavedMovies}
                onUnsaveFilm={handleDeleteFilm}
                apiMain={apiMain}
                setListSavedMovies={setListSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Profile}
                onUpdateUserInfo={handleEditUserInfo}
                onSignOut={onSignOut}
                serverError={serverError}
                setServerError={setServerError}
                isStatusOKServer={isStatusOKServer}
                setIsStatusOKServer={setIsStatusOKServer}
              />
            }
          />
          <Route path="*" element={<Page404 isLoggedIn={isLoggedIn} /> } />
        </Routes>
        )}
      </main>
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ? (
        <Footer />
      ) : null}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;