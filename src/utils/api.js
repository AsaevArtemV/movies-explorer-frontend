class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  //Проверяет на ошибку
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    //Отклонить Promise при ошибке
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
}

export default Api;