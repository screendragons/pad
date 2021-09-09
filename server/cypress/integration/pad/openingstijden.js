//Context: Chatbot
describe("openingstijden", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080");
    });

    //Test: Validate send message
    it("Valid send message", function() {
        //Find the field for the text input
        cy.get(".text_input").should("exist");

        //Find send button, check if it exists.
        cy.get("#send").should("exist");
    });

    //Test: Successful send message
    it("Successful send message", function () {
        //Start a fake server
        cy.server();

        cy.route("POST", "/holdings")
            .as("holdings");

        //Find the button to send and click it.
        cy.get(".chatbot_button").click();

        //Find the field for the username and type the text "test".
        cy.get(".text_input").type("openingstijden");

        //Find the button to login and click it.
        cy.get("#send").click();

        //Find the field for the username and type the text "test".
        cy.get(".text_input").type("vestiging oba bijlmerplein");

        //Find the button to login and click it.
        cy.get("#send").click();

        cy.wait(500);

        // checks if the class left exists
        cy.get(".left").should('exist');
    });
    it("Buttons check", function () {
        //Start a fake server
        cy.server();

        //Find the button to send and click it.
        cy.get(".chatbot_button").click();

        //Find the main-button to send and click it.
        cy.get(".chat_general_questions").click({ multiple: true });

        cy.wait(500);
    });

});