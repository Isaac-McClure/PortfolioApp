export class DisplayService {
    constructor() {
        this.baseUrl = 'https://localhost:7197/Display'
    }

    async get_async() {
        const response = await fetch(this.baseUrl);
        console.log('response');
        console.log(response);

        return await response.json();
    }
}