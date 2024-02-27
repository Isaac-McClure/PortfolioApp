export class DisplayService {
    constructor() {
        this.baseUrl = 'https://localhost:7197/Display'
    }

    async getByIdAsync(id) {
        const response = await fetch(this.baseUrl + '/GetById/' + id);
        console.log('getByIdAsync response');
        console.log(response);

        return await response.json();
    }

    async getAllAsync() {
        const response = await fetch(this.baseUrl + '/GetAll');
        console.log('getAllAsync response');
        console.log(response);

        return await response.json();
    }
}