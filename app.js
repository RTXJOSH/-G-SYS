function loadClient() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyAJh8sgbhyGJfdAISYuLiBLovRcgSaag1U' // Replace this with your actual API key
    }).then(function() {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }, function(error) {
        console.error("Error loading GAPI client for API", error);
    });
}

function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    authenticateUser(username, password);
}

function authenticateUser(username, password) {
    gapi.client.request({
        'path': `https://sheets.googleapis.com/v4/spreadsheets/1Gy_4JT9oHFxBxP8qhSkFV_vzKnGy9cMWCgzRAz_v1W8/values/A2:B100` // Replace this with your Spreadsheet ID
    }).then(function(response) {
        let users = response.result.values;
        let authenticated = users.some(row => row[0] === username && row[1] === password);
        if (authenticated) {
            console.log("Login successful");
            window.location.href = 'gcash.html'; // Redirect to dashboard page on success
        } else {
            console.log("Login failed");
            alert("Invalid credentials.");
        }
    }, function(reason) {
        console.error('Error: ' + reason.result.error.message);
    });
}

window.onload = loadClient;