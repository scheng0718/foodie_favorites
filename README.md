# Restaurant Foodie Website

![](./screenshots/main_page.png)

This restaurant website, dubbed "Foodie Favorites," is a comprehensive platform built using Node.js, Express, and MongoDB. The website provides a robust suite of features including account creation, sign-in and sign-out functionalities, third-party login integration with Facebook, Google, and GitHub, as well as comprehensive CRUD (Create, Read, Update, Delete) operations. The application's architecture is founded on a structured routing design and establishes a smooth connection with MongoDB for seamless data storage and retrieval.

## Features

- Sign up
  - User registration through email and password (name field is optional).
  ![](./screenshots/sign_up.png)
  - Warning message for missing required fields during registration.
  ![](./screenshots/sign_up_required.png)
  - Password mismatch warning during registration. 
  ![](./screenshots/sign_up_mismatch.png)
  - Warning message for signing up the same email.
  ![](./screenshots/sign_up_registerd.png)
  - Sign-up message available upon successful sign-up an account. 
  ![](./screenshots/sign_up_success.png)
  
- Sign-in features 
  - Prompts for sign-in before accessing the main pages. 
  ![](./screenshots/sign-in_first.png)
  - Warning messages for attempting to sign in without input.
  ![](./screenshots/sign_in_warning.png)
  - Sign in using an email that does not exist
  ![](./screenshots/sign_in_fails.png)
  - Sign in with wrong password
  ![](./screenshots/sign_in_wrong_password.png)
  - Third-party sign-in support.
  ![](./screenshots/third-party_sign_in.png)

- Sign out
  - Sign-out message available upon successful sign out.
  ![](./screenshots/sign_out.png)

- CRUD functionality
  - Browse all listed restaurants.
  - Create new restaurant listings
  - View detailed information about listed restaurants.
  - Edit or update restaurant information.
  - Delete restaurant listings.
  - Quick access to detailed restaurant pages by clicking on restaurant photos.
  - Advanced database search feature for restaurant listings based on keywords.
  - Support for searches in both English and Chinese.
  - Sorting functionality for restaurants based on alphabetical order, reverse order, category, location, or rating.

## Demo Video
[![Demo Video](http://img.youtube.com/vi/DVJOFbQfvtA/0.jpg)](https://youtu.be/DVJOFbQfvtA)

## Environment Setup

To run the project, make sure you have Node.js installed on your system. Then, follow these steps:

1. Make sure you have Node.js and npm installed on your system.
2. Clone the repository:
```
git clone https://github.com/scheng0718/foodie_favorites.git
```
3. Navigate to the project directory: 
```
cd foodie_favorites
```
4. Install the necessary packages: 
```
npm install
```
5. Obtain the cluster information from MongoDB. 
6. Construct the .env file (use .env.example as a template). The required variables include:
```
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
GITHUB_ID=SKIP
GITHUB_SECRET=SKIP
GITHUB_CALLBACK=http://localhost:3000/auth/github/callback
GOOGLE_ID=SKIP
GOOGLE_SECRET=SKIP
GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback
GOOGLE_MAPS_KEY=SKIP
MONGODB_URI=mongodb+srv://<Your Account Name >:<Your Password>@<Your Cluster>/restaurant_list?retryWrites=true&w=majority
SESSION_SECRET=ThisIsMySecret
PORT=3000
```

- Get FACEBOOK_ID and FACEBOOK_SECRET at https://developers.facebook.com
  ![](./screenshots/facebook_login.png)
  - Click ``My Apps`` 
  - Click ``Create App``
  - Click ``Allow people to log in with their Facebook account``
  - Fill out your ``new app name`` and ``email`` 
  - Click ``Create app`` 
  - Select the ``app`` you just created 
  - Click ``Settings``
  - Click ``Basic``
  - ``App ID`` and ``App secret`` can be used in your .env file. 
  - Click ``Products`` , then ``Configure`` and ``Setting`` 
  - Add your ``Valid OAuth Redirect URIs``
  - Click ``Use cases``, then in Authentication and account creation click ``Edit``
  - Grant the permission for email. Click ``Add``, Will see ``Ready for testing``

- Get GITHUB_ID and GITHUB_SECRET at https://github.com/settings/developers
  ![](./screenshots/github_login.png)
  - Click ``New OAuth App``
  - Fill out ``Application name`` and ``Homepage URL``
  - Use ``http://localhost:3000/auth/github/callback`` as your ``Authorization callback URL``
  - Click ``Register application``
  - Click the app you just created. ``Client ID`` will be used in GITHUB_ID. ``Client secrets`` will be your GITHUB_SECRET.

- Get GOOGLE_ID and GOOGLE_SECRET at https://console.cloud.google.com/apis/credentials
  ![](./screenshots/google_login.png)
  - Click ``OAuth consent screen`` 
  - User Type is ``External`` 
  - Click ``CREATE`` 
  - Click ``+ CREATE CREDENTIALS`` ,then ``OAuth client ID`` 
  - Provide your ``Name`` for OAuth and click ``Save``
  - Use ``http://localhost:3000/auth/google/callback`` as your ``Authorized redirect URIs``
  - ``Client ID`` and ``Client secret`` can be used. 

- Get GOOGLE_MAPS_KEY at [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview?hl=zh-tw) and follow the steps to get API keys.  

7. Import the default user and restaurant seed data into your MongoDB database.
```
npm run seed
```
8. The email and password for testing purpose.
    ||Name|Email|Password|
    |:--|:--|:--|:--|
    |1|user1|user1@example.com|12345678|
    |2|user2|user2@example.com|12345678|
9. Start the server: 
```
npm run start
```
10. Open your web browser and visit: 
```
http://localhost:3000
```
11. To exit the application and stop the server: 
```
ctrl + c
```

## Environment SetUp

- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 16.1.3
- express: 4.17.1
- express-handlebars: 3.0.0
- express-session: 1.17.1
- method-override: 3.0.0
- mongoose: 5.9.13
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-github2: 0.1.12
- passport-google-oauth20: 2.0.0
- passport-local: 1.0.0


## Developer

This project was developed by Evan Cheng.

