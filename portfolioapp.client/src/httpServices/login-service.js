export class LoginService {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL + '/Login'
    }

    async login(loginData) {
        const response = await fetch(this.baseUrl + '/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        return await response;
    }

    async logout() {
        const response = await fetch(this.baseUrl + '/logout', {
            method: "POST",
            credentials: "same-origin"
        });

        return await response;
    }

    async isAdmin() {
        const response = await fetch(this.baseUrl + '/isAdmin', {
            method: "GET",
            credentials: "include"
        });

        if (await response.ok) {
            return true;
        } else {
            return false;
        }
    }

    async register(registerData) {
        const response = await fetch(this.baseUrl + '/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });

        return await response;
    }
}