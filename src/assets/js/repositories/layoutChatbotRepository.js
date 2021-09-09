class LayoutChatbotRepository {
    constructor() {
        this.route = "";
        this.networkManager = new NetworkManager();
    }

    async get(input) {
        return await this.networkManager
            .doRequest(this.route, {id: input});
    }

    async send(input, page) {
        return await this.networkManager
            .doRequest(`${this.route}/` + page, {"input": input}, "POST");
    }
}
