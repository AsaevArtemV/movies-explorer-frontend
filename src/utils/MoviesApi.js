import Api from "./api";

class MoviesApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  getInitialMovies() {
    return this._request(`${this._url}`, {
      headers: this._headers,
    });
  }
}

const apiMovies = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {"Content-Type": "application/json"},
  });

export default apiMovies;