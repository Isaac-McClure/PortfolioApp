export class DisplayService {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL + '/Display'
    }

    async getByIdAsync(id) {
        const response = await fetch(this.baseUrl + '/GetById/' + id);

        return await response.json();
    }

    async getAllAsync() {
        const response = await fetch(this.baseUrl + '/GetAll');

        return await response.json();
    }

    async update(display) {
        const response = await fetch(this.baseUrl + '/Update', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(display)
        });

        return await response;
    }

    async create(display) {
        const response = await fetch(this.baseUrl + '/Create', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(display)
        });

        return await response;
    }

    async delete(displayId) {
        const response = await fetch(this.baseUrl + '/Delete', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(displayId)
        });

        return await response;
    }
}