<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WORDBOT</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        header {
            background-color: #000000;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            font-size: 24px;
        }

        #chat-container {
            max-width: 600px;
            margin: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        #chat-box {
            flex-grow: 1;
            overflow-y: scroll;
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }

        #user-input {
            display: flex;
            flex-wrap: wrap; /* Wrap the buttons to a new line on small screens */
            padding: 10px;
            background-color: #f0f0f0;
        }

        #user-message {
            flex-grow: 1;
            margin-bottom: 10px; /* Add some spacing between the input and buttons */
            padding: 8px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
        }

        #send-button, #refresh-button {
            background-color: #000000;
            color: #ffffff;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px; /* Add margin between the buttons */
        }

        /* Styles for bot responses */
        .bot-message {
            background-color: #e1f5fe;
            padding: 10px;
            margin: 10px 0;
            border-radius: 8px;
            font-size: 16px;
        }

        /* Animation for chat-box scrolling */
        @keyframes scrollAnimation {
            from {
                scroll-behavior: smooth;
                scroll-snap-type: y mandatory;
            }
            to {
                scroll-snap-type: none;
            }
        }

        /* Media Query for screens smaller than 600px */
        @media (max-width: 600px) {
            #user-input {
                flex-direction: column; /* Stack buttons vertically */
                align-items: stretch; /* Stretch buttons to full width */
            }

            #send-button, #refresh-button {
                margin-right: 0; /* Remove margin between buttons on small screens */
                margin-top: 10px; /* Add margin on top of buttons on small screens */
            }
        }
    </style>
</head>
<body>

    <header>
        WORDBOT
    </header>

    <div id="chat-container">
        <div id="chat-box"></div>
        <div id="user-input">
            <input type="text" id="user-message" placeholder="Type your word...">
            <button id="send-button" onclick="sendMessage()">Send</button>
            <button id="refresh-button" onclick="refreshPage()">Refresh</button>
        </div>
    </div>

    <script>
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
                        'X-RapidAPI-Key': '480d90224dmshfad511b6749d169p1bea33jsnbb9403be027a', // Replace with your WordsAPI API key
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
    </script>

</body>
</html>
