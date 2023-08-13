import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile" ? (
        <Header />
      ) : null}
      <main>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;