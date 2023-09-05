class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Статус ошибки: ${response.status}`);
    });
  }

  register(name, email, password) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`
      }),
    });
  }

  authorize(email, password) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      }),
    });
  }

  checkToken = (token) => {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  };
}

const auth = new Auth({
  baseUrl: "https://movies-explorer-api.nomoreparties.co",
});

export default auth;