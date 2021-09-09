// sendMessage();

function chatbotButtonClick() {
    let x = document.getElementById("chatbot");
    let y = document.getElementById("menu");

    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function menuButtonClick() {
    let x = document.getElementById("menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// function sendMessage() {
//     let input = document.getElementsByClassName("text_input");
//     input.addEventListener("keyup", function (event) {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             document.getElementById("send").click();
//         }
//         preventLoadingPage();
//     });
// }
//
// function preventLoadingPage() {
//     $(".form_chat").submit(function() {
//         sendMessage($("#send").get(0));
//         console.log("Chi Yu prevent loading page")
//         return false;
//     });
// }