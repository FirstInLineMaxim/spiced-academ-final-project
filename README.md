# Purãngaw
A hair care platform created in 6 days as a final project in [Spiced Academy](https://github.com/spicedacademy) Bootcamp. **Purãngaw**, which means beauty in the Tupi-Guarani language, was developed to help
the users to create a hair care routine that fits in their hair needs.
While creating a profile, the user specifies its hair type, style, and condition to discover its hair needs.
## Table of contents
* [What I used?](##What-I-used?)
* [Setup]()
* [What I have?](##What-I-have?)
* [Showroom](##Showroom)
* [What is next?](##What-is-next?)
* [Inspiration](##Inspiration)


## What I used?
* HTML, SCSS, Node.js / Express, PostgreSQL, React, React Hooks, Redux. Socket.io;
* OpenWeatherMap API, AWS - S3
* Csurf, Cookie Session, Bcrypt

## Setup
Clone this repo to your desktop and run ```npm install``` to install all the dependencies.

## What I have?
All the features:
* Landing page
* Registration / Login
  * Reset password
* Answer a survey to specify the hair type, style and condition
  * Save the results of the survey in the user profile
  * An new survey can be repeated and saved whenever the user wishes
* Complete the profile
  * Add bio
  * Upload avatar (Multer, AWS - S3)
* To-do list for the treatment schedule according to the suvey's results
* Today's weather forecast
* Short hair care and hair style recommendations according to the weather's forecast
* Recommendations page for completed hair care recommendations according the survey's results
* Chatroom - real-time public chat with anyone registered
  * Delete your own messages
* Delete profile
  * Delete all messages on chatroom
  * Delete all uploaded pictures on AWS - S3 bucket
* Added dummy users and dummy messages into the database for display purposes

## Showroom
### Landing page / Login
![](/client/public/landing-page_login.gif)

### Survey
![](/client/public/survey.gif)

### Profile
![](/client/public/profile.gif)

### To-do list
![](/client/public/todo.gif)

### Weather's forecast
![](/client/public/weather.gif)

### Recommendations
![](/client/public/recomend.gif)

### Chatroom
![](/client/public/chatroom.gif)

### Logout
![](/client/public/logout.gif)

## What is next?
Next functionalities I want to add:
- [ ] Mobile responsiveness
- [ ] Notification about new messages on chatroom in header
- [ ] Add a reminders feature to the to-do list

## Inspiration
* This app is inspired by [Meu Cronogram Capilar](https://mcc.code.art.br/).
* Images by Calvin Lupiya and Matheus Ferrero from [Unsplash](https://unsplash.com/)
* Illustrations by Pablo Stanley and Pau Barbaro from [Blush](https://blush.design/)
