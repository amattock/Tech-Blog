const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) { // if all fields are filled out
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user', { // fetch() is a browser API
            method: 'POST', // POST request
            body: JSON.stringify({ username, email, password }), // body of the request
            headers: { 'Content-Type': 'application/json' }, // tells the server we're sending JSON data
        });

    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector
('#signup-form')
.addEventListener('submit', signupFormHandler); // event listener for the signup form



