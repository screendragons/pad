//Context: Chatbot
describe("chatbot", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080");
    });

    //Test: Validate send message
    it("Valid send message", function () {
        //Find the field for the text input
        cy.get(".text_input").should("exist");

        //Find send button, check if it exists.
        cy.get("#send").should("exist");
    });

    //Test: Successful send message
    it("Successful send message", function () {
        //Start a fake server
        cy.server();

        let resultSearch = {
            "results": [{
                "frabl": {
                    "key1": "spijt", "key2": "carry slee"
                },
                "coverimages": ["url", "https://v112.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/396411614&token=c1322402"]
            }]
        };

        cy.route("POST", "/search", JSON.stringify(resultSearch))
            .as("search");

        //Find the button to send and click it.
        cy.get(".chatbot_button").click();

        //Find the field for the username and type the text "carry slee".
        cy.get(".text_input").type("carry slee");

        //Find the button to login and click it.
        cy.get("#send").click();

        //Wait for the @search-stub to be called by the click-event.
        cy.wait("@search");

        debugger;

        cy.wait(500);

        // checks if the class left exists
        cy.get(".left").should('exist');

        // searches for the img tag
        cy.get(".left").find("img").should('have.attr', 'src',
            'https://v112.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/396411614&token=c1322402'
        );

    });

    //Test: Failed send message
    it("Failed send message", function () {
        //Start a fake server
        cy.server();

        //Add a stub with the URL /chatbot as a POST
        //Respond with a JSON-object when requested and set the status-code tot 401.
        //Give the stub the alias: @chatbot
        cy.route({
            method: "POST",
            url: "/search",
            response: {
                reason: "ERROR"
            },
            status: 401
        }).as("search");

        //Find the button to send and click it.
        cy.get(".chatbot_button").click();

        //Find the field for the text input and type the text "paul van loon".
        cy.get(".text_input").type("       ");

        //Find the button to send and click it.
        cy.get("#send").click();

        // Checks if message right not exists
        cy.get(".message-right").should("not.exist");
    });
});