document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("refresh-button").addEventListener("click", refreshPage);
});

async function sendMessage() {
    const userWord = document.getElementById('user-message').value;
    const chatBox = document.getElementById('chat-box');

    // Display user message
    chatBox.innerHTML += `<div><strong>User:</strong> ${userWord}</div>`;

    try {
        // Fetch the meaning of the word from WordsAPI
        const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${userWord}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': 'your-api-key', // Replace with your WordsAPI API key
            },
        });

        // Parse the JSON response from WordsAPI
        const data = await response.json();

        // Display the meaning
        const meaning = data.results && data.results.length > 0 ? data.results[0].definition : 'Meaning not found';
        chatBox.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${meaning}</div>`;

        // Clear the input field
        document.getElementById('user-message').value = '';

        // Scroll to the latest message with animation
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error(error);
    }
}

function refreshPage() {
    location.reload(true); // Reloads the page from the server, ignoring the cache
}
