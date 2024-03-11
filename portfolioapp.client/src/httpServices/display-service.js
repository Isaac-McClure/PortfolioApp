export class DisplayService {
    constructor() {
        // todo: add url to env variables
        this.baseUrl = 'http://localhost:8080/Display'
    }

    async getByIdAsync(id) {
        const response = await fetch(this.baseUrl + '/GetById/' + id);

        return await response.json();
    }

    async getAllAsync() {
        const response = await fetch(this.baseUrl + '/GetAll');

        return await response.json();
    }
}