// Naveen
// Reference : https://www.youtube.com/watch?v=sRzbFa8gYFI
/*
  1. Page Overview:
    - The page will display a sign-in form with two fields: Email and Password.
    - Upon submitting the form, the entered email and password should be sent to the backend API for authentication.
    - On successful login, the user's session will be stored in `localStorage` and the user will be redirected to the homepage.
    - In case of login failure, an error message will be shown.

  2. Form Structure:
    - The sign-in form should contain the following elements:
      - An **email input field** (type: email, placeholder: "Enter your email").
      - A **password input field** (type: password, placeholder: "Enter your password").
      - A **submit button** (e.g., "Sign In") to trigger form submission.
      - A **link to the sign-up page** ("Don't have an account? Sign Up").
    
  3. Functional Requirements:
    - **On form submission**:
      - Capture the values of the email and password input fields.
      - Send these credentials (email and password) as a POST request to the backend API endpoint:
        - **POST** `http://127.0.0.1:8000/api/accounts/login/`
          - The body of the request should contain the email and password, e.g.:
            {
              "email": "user@example.com",
              "password": "userpassword"
            }
      
    - **API response**:
      - On successful authentication, the backend will respond with an access token and a refresh token.
      - Additionally, the backend will return the user's profile information (e.g., name, email, profile image).
      
    - **After login**:
      - If the login is successful:
        - Fetch the user's profile information using the access token (if it's returned in the login response).
        - Save the session data (user profile, access token, refresh token) in `localStorage` so the session persists.
        - Redirect the user to the homepage (`/`).
      
    - **Error handling**:
      - If login fails (e.g., invalid credentials), an error message should be displayed to the user.
      - Handle errors like "invalid username/password" or network issues by displaying an appropriate alert or message.
    
  4. User Interface:
    - The form should have clear labels and placeholders for the input fields (email and password).
    - The submit button should be styled and display "Sign In".
    - A link to the sign-up page should be displayed below the form with the text "Don't have an account? Sign Up".
    
  5. API Details:
    - **Login Endpoint** (POST): 
      - URL: `http://127.0.0.1:8000/api/accounts/login/`
      - Body (JSON):
        {
          "email": "user@example.com",
          "password": "userpassword"
        }
      - Response:
        - If successful: Contains `access` and `refresh` tokens, and user details (email, full name, profile image).
        - If failed: Contains an error message.
      
  9. Sign-Up Link:
    - Provide a clickable link that redirects the user to the sign-up page if they don't have an account.


*/
