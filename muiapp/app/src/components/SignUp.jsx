// Thanuj & Nandun
// Reference : https://www.youtube.com/watch?v=kvJLiKLOPtk

const countries = [
  { code: 'US', label: 'United States of America' },
  { code: 'CA', label: 'Canada' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  { code: 'IN', label: 'India' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'IT', label: 'Italy' },
  { code: 'ES', label: 'Spain' },
  { code: 'MX', label: 'Mexico' },
  { code: 'BR', label: 'Brazil' },
  { code: 'JP', label: 'Japan' },
  { code: 'CN', label: 'China' },
  { code: 'RU', label: 'Russia' },
  { code: 'KR', label: 'South Korea' },
  { code: 'ZA', label: 'South Africa' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'EG', label: 'Egypt' },
  { code: 'PH', label: 'Philippines' },
  { code: 'SG', label: 'Singapore' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'SE', label: 'Sweden' },
  { code: 'CH', label: 'Switzerland' },
  { code: 'PL', label: 'Poland' },
  { code: 'GR', label: 'Greece' },
  { code: 'TR', label: 'Turkey' },
  { code: 'AE', label: 'United Arab Emirates' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'AR', label: 'Argentina' },
  { code: 'EG', label: 'Egypt' },
  { code: 'KE', label: 'Kenya' },
  { code: 'TH', label: 'Thailand' },
  { code: 'MY', label: 'Malaysia' },
  { code: 'PK', label: 'Pakistan' },
  { code: 'VN', label: 'Vietnam' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'PE', label: 'Peru' },
  { code: 'NZ', label: 'New Zealand' }
];

const timezones = [
  { label: "Africa/Abidjan" },
  { label: "Africa/Accra" },
  { label: "Africa/Addis_Ababa" },
  { label: "Africa/Algiers" },
  { label: "Africa/Asmara" },
  { label: "Africa/Bamako" },
  { label: "Africa/Bangui" },
  { label: "Africa/Banjul" },
  { label: "Africa/Bissau" },
  { label: "Africa/Blantyre" },
  { label: "Africa/Brazzaville" },
  { label: "Africa/Bujumbura" },
  { label: "Africa/Cairo" },
  { label: "Africa/Casablanca" },
  { label: "Africa/Ceuta" },
  { label: "Africa/Conakry" },
  { label: "Africa/Dakar" },
  { label: "Africa/Dar_es_Salaam" },
  { label: "Africa/Douala" },
  { label: "Africa/El_Aaiun" },
  { label: "Africa/Freetown" },
  { label: "Africa/Gaborone" },
  { label: "Africa/Harare" },
  { label: "Africa/Johannesburg" },
  { label: "Africa/Juba" },
  { label: "Africa/Kampala" },
  { label: "Africa/Khartoum" },
  { label: "Africa/Kigali" },
  { label: "Africa/Kinshasa" },
  { label: "Africa/Lagos" },
  { label: "Africa/Libreville" },
  { label: "Africa/Lome" },
  { label: "Africa/Luanda" },
  { label: "Africa/Lubumbashi" },
  { label: "Africa/Lusaka" },
  { label: "Africa/Malabo" },
  { label: "Africa/Maputo" },
  { label: "Africa/Maseru" },
  { label: "Africa/Monrovia" },
  { label: "Africa/Nairobi" },
  { label: "Africa/Ndjamena" },
  { label: "Africa/Niamey" },
  { label: "Africa/Nouakchott" },
  { label: "Africa/Ouagadougou" },
  { label: "Africa/Porto-Novo" },
  { label: "Africa/Sao_Tome" },
  { label: "Africa/Tunis" },
  { label: "Africa/Windhoek" },
  { label: "America/Adak" },
  { label: "America/Anchorage" },
  { label: "America/Anguilla" },
  { label: "America/Antigua" },
  { label: "America/Araguaina" },
  { label: "America/Argentina/Buenos_Aires" },
  { label: "America/Argentina/Catamarca" },
  { label: "America/Argentina/ComodRivadavia" },
  { label: "America/Argentina/Cordoba" },
  { label: "America/Argentina/Jujuy" },
  { label: "America/Argentina/La_Rioja" },
  { label: "America/Argentina/Mendoza" },
  { label: "America/Argentina/Rio_Gallegos" },
  { label: "America/Argentina/Salta" },
  { label: "America/Argentina/San_Juan" },
  { label: "America/Argentina/San_Luis" },
  { label: "America/Argentina/Tucuman" },
  { label: "America/Argentina/Ushuaia" },
  { label: "America/Aruba" },
  { label: "America/Asuncion" },
  { label: "America/Atikokan" },
  { label: "America/Bahia" },
  { label: "America/Bahia_Banderas" },
  { label: "America/Barbados" },
  { label: "America/Belem" },
  { label: "America/Belize" },
  { label: "America/Blanc-Sablon" },
  { label: "America/Boa_Vista" },
  { label: "America/Bogota" },
  { label: "America/Boise" },
  { label: "America/Cambridge_Bay" },
  { label: "America/Campo_Grande" },
  { label: "America/Cancun" },
  { label: "America/Caracas" },
  { label: "America/Cayenne" },
  { label: "America/Cayman" },
  { label: "America/Chicago" },
  { label: "America/Chihuahua" },
  { label: "America/Costa_Rica" },
  { label: "America/Creston" },
  { label: "America/Cuiaba" },
  { label: "America/Curacao" },
  { label: "America/Danmarkshavn" },
  { label: "America/Dawson" },
  { label: "America/Dawson_Creek" },
  { label: "America/Denver" },
  { label: "America/Detroit" },
  { label: "America/Dominica" },
  { label: "America/Edmonton" },
  { label: "America/Eirunepe" },
  { label: "America/El_Salvador" },
  { label: "America/Fortaleza" },
  { label: "America/Glace_Bay" },
  { label: "America/Godthab" },
  { label: "America/Goose_Bay" },
  { label: "America/Grand_Turk" },
  { label: "America/Grenada" },
  { label: "America/Guadeloupe" },
  { label: "America/Guatemala" },
  { label: "America/Guayaquil" },
  { label: "America/Guyana" },
  { label: "America/Houston" },
  { label: "America/Indianapolis" },
  { label: "America/Iqaluit" },
  { label: "America/Jamaica" },
  { label: "America/Juneau" },
  { label: "America/Kentucky/Louisville" },
  { label: "America/Kentucky/Monticello" },
  { label: "America/Kralendijk" },
  { label: "America/La_Paz" },
  { label: "America/Lima" },
  { label: "America/Los_Angeles" },
  { label: "America/Louisville" },
  { label: "America/Maceio" },
  { label: "America/Managua" },
  { label: "America/Manaus" },
  { label: "America/Marigot" },
  { label: "America/Martinique" },
  { label: "America/Mexico_City" },
  { label: "America/Miquelon" },
  { label: "America/Moncton" },
  { label: "America/Montevideo" },
  { label: "America/New_York" },
  { label: "America/Nipigon" },
  { label: "America/Nome" },
  { label: "America/Noronha" },
  { label: "America/North_Dakota/Beulah" },
  { label: "America/North_Dakota/Center" },
  { label: "America/North_Dakota/New_Salem" },
  { label: "America/Panama" },
  { label: "America/Paramaribo" },
  { label: "America/Phoenix" },
  { label: "America/Port-au-Prince" },
  { label: "America/Port_of_Spain" },
  { label: "America/Regina" },
  { label: "America/Rio_Branco" },
  { label: "America/Santarem" },
  { label: "America/Santiago" },
  { label: "America/Santo_Domingo" },
  { label: "America/Sao_Paulo" },
  { label: "America/Scoresbysund" },
  { label: "America/Shiprock" },
  { label: "America/Sitka" },
  { label: "America/St_Barthelemy" },
  { label: "America/St_Johns" },
  { label: "America/St_Kitts" },
  { label: "America/St_Lucia" },
  { label: "America/St_Thomas" },
  { label: "America/St_Vincent" },
  { label: "America/Tegucigalpa" },
  { label: "America/Thule" },
  { label: "America/Thunder_Bay" },
  { label: "America/Tijuana" },
  { label: "America/Toronto" },
  { label: "America/Vancouver" },
  { label: "America/Whitehorse" },
  { label: "America/Winnipeg" },
  { label: "America/Yakutat" },
  { label: "America/Yellowknife" },
  { label: "Antarctica/Palmer" },
  { label: "Antarctica/Rothera" },
  { label: "Asia/Aden" },
  { label: "Asia/Almaty" },
  { label: "Asia/Amman" },
  { label: "Asia/Anadyr" },
  { label: "Asia/Aqtau" },
  { label: "Asia/Aqtobe" },
  { label: "Asia/Ashgabat" },
  { label: "Asia/Baghdad" },
  { label: "Asia/Baku" },
  { label: "Asia/Bangkok" },
  { label: "Asia/Barnaul" },
  { label: "Asia/Beirut" },
  { label: "Asia/Bishkek" },
  { label: "Asia/Brunei" },
  { label: "Asia/Calcutta" },
  { label: "Asia/Chita" },
  { label: "Asia/Choibalsan" },
  { label: "Asia/Colombo" },
  { label: "Asia/Damascus" },
  { label: "Asia/Dhaka" },
  { label: "Asia/Dili" },
  { label: "Asia/Dubai" },
  { label: "Asia/Dushanbe" },
  { label: "Asia/Gaza" },
  { label: "Asia/Harbin" },
  { label: "Asia/Hong_Kong" },
  { label: "Asia/Hovd" },
  { label: "Asia/Irkutsk" },
  { label: "Asia/Jakarta" },
  { label: "Asia/Jayapura" },
  { label: "Asia/Kabul" },
  { label: "Asia/Kamchatka" },
  { label: "Asia/Karachi" },
  { label: "Asia/Kathmandu" },
  { label: "Asia/Kolkata" },
  { label: "Asia/Kuala_Lumpur" },
  { label: "Asia/Kuwait" },
  { label: "Asia/Macau" },
  { label: "Asia/Magadan" },
  { label: "Asia/Makassar" },
  { label: "Asia/Manila" },
  { label: "Asia/Muscat" },
  { label: "Asia/Nicosia" },
  { label: "Asia/Novosibirsk" },
  { label: "Asia/Omsk" },
  { label: "Asia/Oral" },
  { label: "Asia/Phnom_Penh" },
  { label: "Asia/Pontianak" },
  { label: "Asia/Qatar" },
  { label: "Asia/Qyzylorda" },
  { label: "Asia/Riyadh" },
  { label: "Asia/Sakhalin" },
  { label: "Asia/Samarkand" },
  { label: "Asia/Seoul" },
  { label: "Asia/Shanghai" },
  { label: "Asia/Singapore" },
  { label: "Asia/Taipei" },
  { label: "Asia/Tashkent" },
  { label: "Asia/Tbilisi" },
  { label: "Asia/Tehran" },
  { label: "Asia/Tokyo" },
  { label: "Asia/Ulaanbaatar" },
  { label: "Asia/Urumqi" },
  { label: "Asia/Yakutsk" },
  { label: "Asia/Yangon" },
  { label: "Asia/Yekaterinburg" },
  { label: "Asia/Yerevan" },
  { label: "Atlantic/Azores" },
  { label: "Atlantic/Bermuda" },
  { label: "Australia/Adelaide" },
  { label: "Australia/Brisbane" },
  { label: "Australia/Darwin" },
  { label: "Australia/Hobart" },
  { label: "Australia/Lindeman" },
  { label: "Australia/Melbourne" },
  { label: "Australia/Perth" },
  { label: "Australia/Sydney" },
  { label: "Europe/Amsterdam" },
  { label: "Europe/Andorra" },
  { label: "Europe/Athens" },
  { label: "Europe/Belgrade" },
  { label: "Europe/Berlin" },
  { label: "Europe/Bratislava" },
  { label: "Europe/Brussels" },
  { label: "Europe/Bucharest" },
  { label: "Europe/Budapest" },
  { label: "Europe/Chisinau" },
  { label: "Europe/Copenhagen" },
  { label: "Europe/Dublin" },
  { label: "Europe/Helsinki" },
  { label: "Europe/Istanbul" },
  { label: "Europe/Kiev" },
  { label: "Europe/Lisbon" },
  { label: "Europe/Ljubljana" },
  { label: "Europe/London" },
  { label: "Europe/Luxembourg" },
  { label: "Europe/Madrid" },
  { label: "Europe/Malta" },
  { label: "Europe/Monaco" },
  { label: "Europe/Moscow" },
  { label: "Europe/Oslo" },
  { label: "Europe/Paris" },
  { label: "Europe/Prague" },
  { label: "Europe/Riga" },
  { label: "Europe/Rome" },
  { label: "Europe/Samara" },
  { label: "Europe/Stockholm" },
  { label: "Europe/Tallinn" },
  { label: "Europe/Vienna" },
  { label: "Europe/Vilnius" },
  { label: "Europe/Warsaw" },
  { label: "Europe/Zagreb" },
  { label: "Europe/Zurich" }
];

/*
  1. Page Overview:
    - This page will provide a sign-up form where the user can input their full name, email, country, timezone, password, and confirm password.
    - The data from the form will be sent to the backend API to create a new user.
    - After a successful sign-up, the user's session will be stored in `localStorage`, and the user will be redirected to the homepage.
    - In case of errors (e.g., invalid form fields or server errors), error messages should be displayed inline within the form.

  2. Form Structure:
    - The sign-up form should contain the following fields:
      - **Full Name** (text input).
      - **Email** (email input).
      - **Country** (countries list given).
      - **Timezone** (select dropdown with a list of timezones).
      - **Password** (password input).
      - **Confirm Password** (password input for confirmation).

  3. Functional Requirements:
    - **On form submission**:
      - Collect the values of the form fields (full name, email, country, timezone, password, confirm password).
      - Ensure the password and confirm password fields match before submitting the form.
      - Send the form data as a `POST` request to the backend API:
        - **POST** `http://127.0.0.1:8000/api/accounts/register/`
        - Request Body should include:
          {
            "full_name": "John Doe",
            "email": "user@example.com",
            "country": "United States of America",
            "timezone": "America/Los_Angeles",
            "password": "userpassword",
            "confirm_password": "userpassword"
          }

    - **API response**:
      - If the sign-up request is successful:
        - The backend will return user profile data and authentication tokens (access and refresh tokens).
        - This information should be saved in `localStorage` under the key 'session'.
      
    - **After successful sign-up**:
      - Fetch the user's profile information from the backend using the access token.
        - **GET** `http://127.0.0.1:8000/api/accounts/1/`
        - Add the `Authorization` header with the Bearer token: `{ "Authorization": "Bearer <access_token>" }`
      - Store the user profile, access token, and refresh token in `localStorage`.
      - Redirect the user to the homepage (`/`) after storing the session data.

    - **Error handling**:
      - If there are any errors during the sign-up process (e.g., invalid email format, passwords not matching), display appropriate error messages under the relevant form fields.
      - Handle server-side validation errors (e.g., "Email already in use") and show them to the user.
      - Use `setErrors` to manage and display errors on the form.

  4. Form Elements and Their Behavior:
    - **Full Name**: 
      - Input field (required).
      - Show any error messages related to full name.
    - **Email**: 
      - Input field of type `email` (required).
      - Show any error messages related to email.
    - **Country**:
      - dropdown with a list of countries. Each country should have a flag.
      - The user should be able to select a country, and it should populate the field with the country name.
      - Show any error related to the country selection.
    - **Timezone**:
      - dropdown with a list of timezones (timezones given).
      - Show the available timezones, and the user should be able to select one.
    - **Password**: 
      - Input field of type `password` (required).
      - Ensure the password is strong enough according to your password policy.
      - Show any error related to the password field.
    - **Confirm Password**: 
      - Input field of type `password` (required).
      - Ensure the password and confirm password fields match before submitting.
    - **Submit Button**:
      - The button should be labeled "Signup" and will submit the form when clicked.

  5. API Details:
    - **Registration Endpoint** (POST):
      - URL: `http://127.0.0.1:8000/api/accounts/register/`
      - Body (JSON):
        {
          "full_name": "John Doe",
          "email": "user@example.com",
          "country": "United States of America",
          "timezone": "America/Los_Angeles",
          "password": "userpassword",
          "confirm_password": "userpassword"
        }
      - Response:
        - If successful: Contains `access` and `refresh` tokens and user details.


  7. Navigation:
    - After successful sign-up, redirect the user to the homepage (`/`) using `useNavigate()`.
    - Provide a link to the sign-in page below the form for users who already have an account.


*/
