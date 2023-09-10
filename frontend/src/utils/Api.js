class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getUserInfo() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            })
            .then(this._checkResponse)
    }

    getInitalCards() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
            .then(this._checkResponse)
    }

    editUserInfo(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._checkResponse)
    }

    addNewCard(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
            .then(this._checkResponse)
    }

    editUserAvatar(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(this._checkResponse)
    }

    putLike(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
            .then(this._checkResponse)
    }

}

export const api = new Api({
    baseUrl: 'https://api.websitemesto.students.nomoredomainsicu.ru',
});