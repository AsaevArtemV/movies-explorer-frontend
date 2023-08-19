import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import "./App.css";
import auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [listSavedMovies, setListSavedMovies] = useState([]); // Сохранённые фильмы
  const [listMovies, setListMovies] = useState([]); // Фильмы, c beatfilm-movies

  const [isStatusErrorServer, setIsStatusErrorServer] = useState(false);
  const [isStatusOKServer, setIsStatusOKServer] = useState(false);

  const apiMain = new MainApi({
    baseUrl:"https://movies-explorer-api.nomoreparties.co",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const apiMovies = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
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
  }, [loggedIn]);

  useEffect(() => {
    loggedIn &&
      Promise.all([apiMain.getInfoUser(), apiMovies.getAllMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setListMovies(movies);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);

  useEffect(() => {
    loggedIn &&
      apiMain
        .getSavedMovies()
        .then((savedMovies) => {
          setListSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);

  /* ДОБАВИТЬ ФИЛЬМ В СОХРАНЁННЫЕ */
  function handleSaveFilm(film, isSavedFilm, infoSaveFilm) {
    if (isSavedFilm) {
      handleUnsaveFilm(infoSaveFilm);
    } else {
      apiMain
        .saveNewFilm(film)
        .then((film) => {
          setListSavedMovies([film, ...listSavedMovies]);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}.`);
        })
        .finally(() => setIsLoading(false));
    }
  }

  /* УДАЛИТЬ ФИЛЬМ ИЗ СОХРАНЁННЫХ */
  function handleUnsaveFilm(film) {
    setIsLoading(true);

    apiMain
      .unSaveNewFilm(film._id)
      .then((film) => {
        const newSavedMovies = listSavedMovies.filter((f) => (f._id === film._id ? "" : f));
        setListSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ */
  function handleUpdateUserInfo(data) {
    apiMain
      .editUserInfo(data)
      .then((data) => {
        setIsStatusErrorServer(false);
        setIsStatusOKServer(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
        setIsStatusErrorServer(true);
      })
      .finally(() => setIsLoading(false));
  }

  /* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
  const onRegister = (email, name, password) => {
    auth
      .register(email, name, password)
      .then((data) => {
        setIsStatusErrorServer(false);
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        if (data) {
          onLogin(password, email);
          setCurrentUser(data);
          console.log("Регистрация", data);
        }
      })
      .catch((err) => {
        setIsStatusErrorServer(true);
      })
      .finally(() => setIsLoading(false));
  };

  /* АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ */
  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        setIsStatusErrorServer(false);
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        if (data) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          console.log("Вход", data);
          return data;
        }
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setIsStatusErrorServer(true);
      });
  };

  /* ВЫХОД ИЗ АККАУНТА ПОЛЬЗОВАТЕЛЯ */
  const onSignOut = () => {
    setLoggedIn(false);
    navigate("/", { replace: true });

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
          <Header isLogged={loggedIn} />
        ) : null}
        <main>
          {isLoading ? (
            <Preloader />
          ) : (
        <Routes>
          <Route
            path="/signup"
            element={
              <Register 
                onRegister={onRegister}
                isStatusErrorServer={isStatusErrorServer}
                setIsStatusErrorServer={setIsStatusErrorServer}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={onLogin}
                isStatusErrorServer={isStatusErrorServer}
                setIsStatusErrorServer={setIsStatusErrorServer}
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Movies}
                movies={listMovies}
                savedMovies={listSavedMovies}
                onSaveFilm={handleSaveFilm}
                onUnsaveFilm={handleUnsaveFilm}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}
                movies={listSavedMovies}
                onUnsaveFilm={handleUnsaveFilm}
                apiMain={apiMain}
                setListSavedMovies={setListSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUserInfo={handleUpdateUserInfo}
                onSignOut={onSignOut}
                isStatusErrorServer={isStatusErrorServer}
                setIsStatusErrorServer={setIsStatusErrorServer}
                isStatusOKServer={isStatusOKServer}
                setIsStatusOKServer={setIsStatusOKServer}
              />
            }
          />
          <Route
            path="*"
            element={
              <Page404
                loggedIn={loggedIn}
              />
            }
          />
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