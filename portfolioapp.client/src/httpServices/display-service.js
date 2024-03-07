export class DisplayService {
    constructor() {
        this.baseUrl = 'http://portfolioapp-server:8080/Display'
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