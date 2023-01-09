# Know It All

This app was created as the final project on our Northcoders Bootcamp experience.

The team members include: Felipe Cardini, Daniel James, Zakaria Farah and Alex Cupit.

The hosted app can be viewed at [Know It All.](https://knowitallquiz.netlify.app/)

The repo for the backend can be [found here.](https://github.com/zakaria552/tbc-BE)

## Description

Know It All is an addictive daily quizzing app! Each day, five new questions are generated from an external API and stored in a seperate database created for this app, to ensure consistency for all quiz users and prevent duplicate questions being asked within the same one month time period.

Users aren't required to make an account to take part in the quiz each day, where upon completion they can see their score (based on the time taken to complete the quiz, and the number of correct answers given). Users will also be given a daily streak, regardless of whether or not an account is created.

### Account Features

Users who do create an account are able to add their score to the global leaderboard, create custom leaderboards and invite friends and also view their stats and unlock achievements within their profile.

Eah day a user completes the quiz, their score will be added to any leaderboard they are a part of and they can see how they compare to other members of each leaderboard.

## Routes

Here are some routes to use on this site:

[/#how-to-play](http://localhost:5173/#how-to-play) - instructions for new users on how to play

[/play](https://knowitallquiz.netlify.app/play) - starts the quiz and upon completion, will show your results from that day's quiz

[/leaderboards](https://knowitallquiz.netlify.app/leaderboards) - shows the global leaderboard which is updated upon quiz completion to show the top 10 scores from the day and reset each day

[/leaderboards/QuizMasters](https://knowitallquiz.netlify.app/leaderboards/QuizMasters) - an example of a custom leaderboard that has been set up by a user and if logged in, ability to join this leaderboard

[/login](https://knowitallquiz.netlify.app/login) - ability to log in as an authorised user or create a new account

[/profile](https://knowitallquiz.netlify.app/profile) - shows current logged in user, giving access to stats, custom leaderboard creation and achievements that can be unlocked.

## Tech Stack

We wanted to challenge ourselves with this build by incorporating technologies that we had not learnt as part of the bootcamp.

### Backend

- MongoDB
- Mongoose
- Express.js
- Jest/Supertest
- Node.js

### Frontend

- Svelte
- TypeScript
- FireBase
- Tailwind
- DaisyUI

## Local Usage

This app can be run locally by cloning this repo:

git clone https://github.com/alexcupit/fe-nc-news.git
Before installing dependencies `npm install` and and running `npm run dev` to open the local app in the browser.

This app was made using node v18.10.0
