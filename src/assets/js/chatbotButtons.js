function chatbotButtonClick() {
    let chatbot = document.getElementById("chatbot");
    let menu = document.getElementById("menu");

    if (chatbot.style.display === "block") {
        chatbot.style.display = "none";
        menu.style.display = "none";
    } else {
        chatbot.style.display = "block";
    }
}

function openMenu() {
    let open = document.getElementById("menu");

    if (open.style.display === "block") {
        open.style.display = "none";
    } else {
        open.style.display = "block";
    }
}

function refresh() {
    // empty the div where the content comes in
    $(".message").empty();
    // block the menu if the menu option is clicked
    let menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function closeChat() {
    refresh();
    chatbotButtonClick();
}

async function loanNumber() {
    const container_body = $(".container_body");
    $.get('assets/views/chatMessages/rightMessage.html', (data) => {
        data = data.replace("Dit is een vraag", "Wat is mijn leennummer");
        $(".message").append(data);
    }, 'html');
    setTimeout(function numberAnswer() {
        $.get('assets/views/chatMessages/leftMessage.html', (data) => {
            data = data.replace("Dit is een antwoord",
                "Het lenersnummer staat op je bibliotheekpas en begint met de cijfers 22000...");
            $(".message").append(data);
            container_body.scrollTop(container_body[0].scrollHeight);
        }, 'html');
    }, 100);
}

function obaOpen() {
    const container_body = $(".container_body");
    $.get('assets/views/chatMessages/rightMessage.html', (data) => {
        data = data.replace("Dit is een vraag", "Is de oba dicht?");
        $(".message").append(data);
    }, 'html');
    setTimeout(function OBAOpenAnswers() {
        $.get('assets/views/chatMessages/leftMessage.html', (data) => {
            data = data.replace("Dit is een antwoord",
                "Ja en nee. Ja, de OBA is alleen open voor de OBA Bestelservice en activiteiten op afspraak. " +
                "Nee, binnen lopen zonder afspraak kan nog niet.");
            $(".message").append(data);
            container_body.scrollTop(container_body[0].scrollHeight);
        }, 'html');
    }, 100);
}

function lossOrDamage() {
    const container_body = $(".container_body");
    $.get('assets/views/chatMessages/rightMessage.html', (data) => {
        data = data.replace("Dit is een vraag", "Wat moet ik doen als er iets is verloren/gestolen?");
        $(".message").append(data);
    }, 'html');
    setTimeout(function lossAnswer() {
        $.get('assets/views/chatMessages/leftMessage.html', (data) => {
            data = data.replace("Dit is een antwoord",
                "Wanneer je een boek of ander geleend materiaal bent kwijtgeraakt of is beschadigd, " +
                "dien je dit te vergoeden aan de OBA. Er wordt uitgegaan van de nieuwwaarde. De boete vervalt. " +
                "Je kunt het materiaal vergoeden door eerst bij de klantenservicebalie in de OBA te melden wat je " +
                "precies bent kwijtgeraakt. Dit kan in elke OBA-vestiging. Je kunt vervolgens bij de betaalautomaat " +
                "in de OBA het bedrag vergoeden. De boete op het materiaal vervalt hierna.");
            $(".message").append(data);
            container_body.scrollTop(container_body[0].scrollHeight);
        }, 'html');
    }, 100);
}

function customerServiceYes() {
    const container_body = $(".container_body");
    $.get('assets/views/chatMessages/rightMessage.html', (data) => {
        data = data.replace("Dit is een vraag", "Ja");
        $(".message").append(data);
    }, 'html');
    setTimeout(function answer() {
        $.get('assets/views/chatMessages/leftMessage.html', (data) => {
            data = data.replace("Dit is een antwoord", "Dit zijn onze contactgegevens:<br> Telefoon: 020-523 0 900,<br>\n" +
                "WhatsApp: 06-5395 9896, <br>\n" +
                "Mail: klantenservice@oba.nl");
            $(".message").append(data);
            container_body.scrollTop(container_body[0].scrollHeight);
        }, 'html');
    }, 100);
}

function customerServiceNo() {
    const container_body = $(".container_body");
    $.get('assets/views/chatMessages/rightMessage.html', (data) => {
        data = data.replace("Dit is een vraag", "Nee");
        $(".message").append(data);
    }, 'html');
    setTimeout(function answer() {
        $.get('assets/views/chatMessages/leftMessage.html', (data) => {
            data = data.replace("Dit is een antwoord", "Waar kan ik je verder mee helpen?");
            $(".message").append(data);
            container_body.scrollTop(container_body[0].scrollHeight);
        }, 'html');
    }, 100);
}

