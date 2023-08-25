import Api from './api';

class MainApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  getUserInfo() {
    return super._request(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  editUserInfo(data) {
    return super._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
  }

  getSavedMovies() {
    return this._request(`${this._url}/movies`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  saveFilm(film) {
    return this._request(`${this._url}/movies`, {
      method: 'POST',
      body: JSON.stringify({
        country: film.country,
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: `https://api.nomoreparties.co/${film.image.url}`,
        trailerLink: film.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${film.image.formats.thumbnail.url}`,
        movieId: film.id,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      }),
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteFilm(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

const apiMain = new MainApi({
  baseUrl: 'https://movies-explorer-api.nomoreparties.co',
  headers: {'Content-Type': 'application/json'},
});

export default apiMain;