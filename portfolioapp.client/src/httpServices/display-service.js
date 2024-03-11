export class DisplayService {
    constructor() {
        // todo: add url to env variables
        this.baseUrl = 'https://localhost:5001/Display'
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