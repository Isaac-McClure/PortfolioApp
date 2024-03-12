export class LoginService {
    constructor() {
        // todo: add url to env variables
        this.baseUrl = 'https://localhost:5001/Login'
    }

    async login(loginData) {
        const response = await fetch(this.baseUrl + '/login', {
            method: "POST",
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
            credentials: "same-origin"
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