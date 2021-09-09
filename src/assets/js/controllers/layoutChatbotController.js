/**
 * the layoutchatbot controller shows the html file
 */
class LayoutChatbotController {
    constructor() {
        // use repository to make a connection
        this.layoutChatbotRepository = new LayoutChatbotRepository();
        // include the HTMl through the contoller
        $.get('./assets/views/layoutChatbot.html')
            // use the setup function to get the view
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        // load the layout-content into memory
        this.layoutView = $(htmlData);
        // empty the layout class if it isn't and append the layoutView
        $(".layout").empty().append(this.layoutView);

        // find the class of the red button to open the chat
        this.layoutView.find(".chat_send_message").on("click", (event) => this.onAddEvent(event));
        // find the class of the submit button of the send button
        this.layoutView.find(".form_chat").on("submit", (event) => this.onAddEvent(event));
    }

    error() {
        // add to the class layout if the layout is failed to load
        $(".layout").html("Failed to load layout!");
    }

    async onAddEvent(event) {
        event.preventDefault();

        // get the value of the input from the chat
        let input = this.layoutView.find(".text_input").val();
        // await this.layoutChatbotRepository.sendMessage(input);
        await this.sendMessage(input);

    }

    async fetchResponse(input) {
        const exampleResponse = this.layoutView.find(".keyword")
        try {
            const Response = await this.layoutChatbotRepository.get(input);
            exampleResponse.text(JSON.stringify(Response, null, 4));
        } catch (e) {
            exampleResponse.text(e);
        }
    }

    //question
    async sendMessage(input) {
        // if the input is not empty then
        if (input.trim() !== "") {
            // get the right message
            $.get('assets/views/chatMessages/rightMessage.html', (data) => {
                // get the input and replace it with the default value
                data = data.replace("Dit is een vraag", input);
                // append the data to the class message
                $(".message").append(data);
                // call the receive message to get a repsonse
                this.receiveMessage();
                // clear the input after sending
                this.clear();
            }, 'html');
        }
    }

    // answer
    async receiveMessage() {
        const chatMessage = $(".text_input").val().toLowerCase();
        const container_body = $(".container_body");

        const inappropriateResult = await this.layoutChatbotRepository.send({message: chatMessage}, `chatbotOngepast`);
        const searchResult = await this.layoutChatbotRepository.send({message: chatMessage}, `chatbotSearch`);
        const holdingResult = await this.layoutChatbotRepository.send({message: chatMessage}, `chatbotHoldings`);

        let hasError = false;
        let endpointSearch = false;
        let endpointHolding = false;

        function scrolling() {
            container_body.scrollTop(container_body[0].scrollHeight);
        }

        function answer(data, response) {
            return data.replace("Dit is een antwoord", response);
        }

        inappropriateResult.forEach(function (arrayItem) {
            const word = arrayItem["word"];
            if (chatMessage.includes(word)) {
                hasError = true;
            }
        });
        if (hasError === true) {
            $.get('assets/views/chatMessages/leftMessage.html', (data) => {
                data = data.replace("Dit is een antwoord", "Dat is niet aardig om te zeggen!");
                $(".message").append(data);
                scrolling();
            }, 'html');
            return;
        } else {
            searchResult.forEach(function (arrayItem) {
                // create constant value word, with the arrayItem word
                const word = arrayItem["word"];
                // checks if word is in the chatMessage
                if (chatMessage.includes(word)) {
                    // if the chatMessage includes the word, change endpointSearch to true
                    endpointSearch = true;
                }
            });

            holdingResult.forEach(function (arrayItem) {
                const word = arrayItem["word"];
                if (chatMessage.includes(word)) {
                    endpointHolding = true;
                }
            });
        }

        if (endpointHolding === true) {
            // if we put this in the live environment change to: /api/holdings without localhost
            $.post("http://localhost:3000/holdings", {message: chatMessage}, (result) => {
                let resultHoldings = JSON.parse(result);
                let response = "";
                let index = -1;
                let weekNames = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag",
                    "Zaterdag"];
                if (chatMessage.includes("openingstijd")) {
                    response = "Openingstijden van welke vestiging?";
                } else {
                    response = "Sorry ik begrijp de vraag niet, kan je de vraag anders stellen?";
                }
                resultHoldings.holdings.forEach(function (naam) {
                    let word = naam["name"];
                    let wordLowerArray = word.toLocaleString().toLowerCase();
                    index++;
                    if (chatMessage.includes(wordLowerArray)) {
                        response = "";
                        for (let key in resultHoldings.holdings) {
                            if (key < 20) {
                                if (resultHoldings.holdings[index].openingHours[key] !== undefined) {
                                    if (resultHoldings.holdings[index].openingHours[key].timespans[0] !== undefined) {
                                        response += `${weekNames[key]} open van ${resultHoldings.holdings[index].openingHours[key].timespans[0].open} tot ${resultHoldings.holdings[index].openingHours[key].timespans[0].close}<br>`
                                    }
                                }
                            }
                        }
                    }
                });
                $.get('assets/views/chatMessages/leftMessage.html', (data) => {
                    data = answer(data, response)
                    $(".message").append(data);
                    scrolling();
                }, 'html');
            });
        } else if (endpointSearch === true) {
            $.post("http://localhost:3000/search", {message: chatMessage}, (result) => {
                    let resultSearch;
                    try {
                        resultSearch = JSON.parse(result);
                    } catch {
                        resultSearch = result;
                        result = JSON.stringify(result);
                    }

                    let response = "";

                    if (result.includes(chatMessage)) {
                        response += `Boeken van ${chatMessage} zijn: <br>`
                        for (let key in resultSearch.results) {
                            response += `<a class="image_books" href="${resultSearch.results[key].detailLink}" target="_blank"><img src="${resultSearch.results[key].coverimages[1]}" title="${resultSearch.results[key].frabl.key1}" alt="${resultSearch.results[key].isbn}"></a><br>`
                        }
                    } else {
                        response = "Sorry ik begrijp de vraag niet, kan je de vraag anders stellen?"
                    }

                    // here is the response when you type something in
                    $.get('assets/views/chatMessages/leftMessage.html', async (data) => {
                        data = answer(data, response);
                        $(".message").append(data);

                        setTimeout(() => {
                            const scrollHeight = container_body[0].scrollHeight;
                            container_body.animate({scrollTop: scrollHeight}, 40000)

                            container_body.click(function () {
                                container_body.stop();
                            })
                        }, 500);
                    }, 'html');
                }
            );
        } else {
            let response = "Ik heb je niet helemaal begrepen. Wil je het aan de klantenservice vragen? Kies een antwoord.";
            if (chatMessage.includes("ja") || chatMessage.includes("nee")) {
                response = "Waar kan ik je mee helpen?"
                $.get('assets/views/chatMessages/leftMessage.html', (data) => {
                    data = answer(data, response)
                    $(".message").append(data);
                    scrolling();
                }, 'html');
            } else {
                $.get('assets/views/chatMessages/serviceMessage.html', (data) => {
                    data = answer(data, response)
                    $(".message").append(data);
                    scrolling();
                }, 'html');
            }
        }
    }

    clear() {
        document.querySelector('.text_input').value = '';
    }
}