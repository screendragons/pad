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

        cy.route("POST", "/chatbotOngepast")
            .as("chatbotOngepast");

        //Find the button to open the chatbot and click on it.
        cy.get(".chatbot_button").click();

        //Find the inputfield and type the text: lul
        cy.get(".text_input").type("lul");

        //Find the button to send the message and click on it
        cy.get("#send").click();

        cy.wait(1500);

        //check if the class left exists
        cy.get(".left").should('exist');

        //Find the inputfield and type the text: hoi
        cy.get(".text_input").type("hoi");

        //Find the button to send the message and click on it
        cy.get("#send").click();

        cy.wait(1500);

        //check if the class left exists
        cy.get(".left").should('exist');

        //Find the inputfield and type the text: ja sukkel
        cy.get(".text_input").type("ja sukkel");

        //Find the button to send the message and click on it
        cy.get("#send").click();

        cy.wait(1500);

        //check if the class left exists
        cy.get(".left").should('exist');

        //Find the inputfield and type the text: kut
        cy.get(".text_input").type("kut");

        //Find the button to send the message and click on it
        cy.get("#send").click();

        cy.wait(1500);

        //check if the class left exists
        cy.get(".left").should('exist');
    });
});