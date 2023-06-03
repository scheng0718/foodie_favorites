# Restaurant Foodie Website

This is a restaurant foodie favorite website built using Node.js, Express, and MongoDB. It provides CRUD functionality and follows a structured routing design. The application establishes a connection between Express and MongoDB to enable seamless data storage and retrieval. It includes a seeder file that populates the database with initial data for testing and demonstration purposes. The application effectively utilizes the body-parser middleware to extract form data from POST requests, ensuring smooth data transmission. It adheres to established conventions and makes proper use of the APIs provided by the framework/library.

Additionally, the website features a search functionality that allows users to find restaurants based on keywords. This enhances the user experience by enabling them to quickly locate specific restaurants of interest. The search feature employs efficient algorithms to retrieve relevant results, providing accurate and timely search results to users.

## Features

- CRUD functionality for managing restaurants.
- Establishes a connection between Express and MongoDB.
- Seeder file for loading seed data into the database.
- Users can browse all restaurants.
- Users can add a new restaurant.
- Users can browse detailed information about a restaurant.
- Users can update restaurant information.
- Users can delete a restaurant.
- Clicking on a restaurant photo takes the user directly to the show page.
- Advance database search for restaurants based on keywords.
- Support searching in both English and Chinese.

## Environment Setup

To run the project, make sure you have Node.js installed on your system. Then, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Clone the repository:
```git clone https://github.com/scheng0718/foodie_favorites.git```
3. Navigate to the project directory: 
```cd foodie_favorites```
4. Install the express: 
```npm install express@4.17.1```
5. Install the express-handlebars:
```npm install express-handlebars@3.0.0```
6. Install the mongoose: 
```npm install mongoose@5.9.7```
7. Install dotenv 16.1.3: 
```npm install dotenv -D```
8. Start the server: 
```npm run dev```
9. Open your web browser and visit: 
```http://localhost:3000```
10.Load the seed data into the database: 
```npm run seed```
## Developer

This project was developed by Evan Cheng.

