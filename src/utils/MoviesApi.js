import Api from "./api";

class MoviesApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  getAllMovies() {
    return this._request(`${this._url}`, {
      headers: this._headers,
    });
  }
}

export default MoviesApi;