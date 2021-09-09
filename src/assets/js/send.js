$(document).ready(function () {
    sendMessage();

    // send question
    function sendMessage() {
        $("#send").click(
            function () {
                const input = $(".text_input").val();
                if (input !== "") {
                    // soort van switch maken om ervoor om te zorgen dat elke zoekresultaat een eigen endpoint heeft
                    // splitten op keywords na de spatie
                    // na "van" komt de naam van de schrijver en daarop filteren
                    console.log(input);
                    $.post("http://localhost:3000/holdings", {message: input}, function (result) {
                        // include the html here
                            $.get('../views/chatMessages/rightMessage.html', function (data) {
                                $(".container_body").append(data)
                            });
                        receiveMessage();
                        // clear the input field
                        // TODO fix empty message
                        clear();
                    });
                } else {
                    console.log("Er is geen info beschikbaar");
                }
            }
        );
    }

    // answer
    function receiveMessage() {
        const receive = $(".text_input").val();
        console.log(receive);
        $.post("http://localhost:3000/holdings", {message: receive}, function (result) {
            let result2 = JSON.parse(result);
            let response;
            console.log(result2)
            // if (receive.includes("openingstijden") && receive.includes("dinsdag")) {
            //     response = `${result2.holdings[0].name} is op dinsdag open van ${result2.holdings[0].openingHours[2].timespans[0].open} tot ${result2.holdings[0].openingHours[2].timespans[0].close}`
            // } else if (receive.includes("openingstijden") && receive.includes("zaterdag")) {
            //     response = `${result2.holdings[0].name} is op zaterdag open van ${result2.holdings[0].openingHours[6].timespans[0].open} tot ${result2.holdings[0].openingHours[6].timespans[0].close}`
            // } else if (receive.includes("openingstijden")) {
            //     response = "Openingstijden van welke dag?";
            // } else {
            //     response = "Ik snap de vraag niet, typ 'm helemaal uit graag";
            // }
            $.post("http://localhost:3000/holdings", {message: input}, function (result) {
                // include the html here
                $.get('../views/chatMessages/leftMessage.html', function (data) {
                    $(".container_body").append(data)
                });
            });
        });
    }

    // clear the input field
    function clear() {
        document.querySelector('.text_input').value = '';
    }

});