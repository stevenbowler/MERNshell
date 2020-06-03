# Clicky One

Full Stack MERN game app with login validation, password encryption and JSON web token protection.  


### Overview

The Clicky Game enables the user to test their short term memory, and if so desired, can be compared against others in the database.  User can login to store and compare best memory scores against others that have played the game.

This project has afforded this programmer the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose).


### User Documentation

First, watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1JP_OVqQBgVvdr6Cqqd9xBg2_fPOLpMeB/view).

Then play Clicky Game by [clicking here](https://secure-citadel-76923.herokuapp.com/).

The game starts by clicking one of the photos, and then successively clicking different photos.  Game ends and final score is calculated when any photo is clicked a second time.

Guests can play game any time; however, by providing a valid email and password the player game results will stored and top 5 scores will be shown to all.

### Program Documentation


Link to the repository [here](https://github.com/stevenbowler/ClickyOne/).

Requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the app.  The `.env` file must contain the app owner's MongoDB URL with embedded username and password.  _*To use the same user database in development, testing and production then, it is critically important that the TOKEN_SECRET shown below be exactly the same string.*_
````
DB_CONNECTION=your_mongodb_url_with_embedded_username_password
TOKEN_SECRET = any_random_string_but_always_use_same_string
````

If you are going to deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necesary to set the two environmental variables with these commands from the Heroku CLI:
````
heroku config:set DB_CONNECTION=your_mongodb_url_with_embedded_username_password
heroku config:set TOKEN_SECRET = any_random_string_but_always_use_same_string
````


## Available Scripts
Program is deployed to [Heroku](https://www.heroku.com).  Program uses [concurrently](https://www.npmjs.com/package/concurrently), so locally runs server on port 5000 and react app on port 3000.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



# Hot-Rest


### Overview

The purpose of this app is to test out use of Heroku server for hosting a table reservation function on web.

Additionally, this project provided team members: Scott Bayreder, Travis Sclorer, Lyyte Faridi and Steven Bowler the opportunity to work on integrating front-end and back-end functions in a single app.

The execution of the app required integration of multiple technologies available thru [Node Package Manager](https://www.npmjs.com/, `NPM`, including: [Moment](https://www.npmjs.com/package/moment), to manage time stamps on transactions; [fs](https://www.npmjs.com/package/fs), to handle storage and retrieval of data from local text files; [nodemailer](https://www.npmjs.com/package/nodemailer), to send email notifications to customers when their table is assigned; [dotenv](https://www.npmjs.com/package/dotenv), to protect email and password information; [Twilio](https://www.npmjs.com/package/twilio) to send text messages to "customers".

### User Documentation

To run `Hot-Rest` the user must follow these steps:

1. Access browser enter [Hot-Rest](https://stark-crag-84677.herokuapp.com/).
2. Click on `View Tables`.  Check to see if there are any table available.
3. Click on `Make Reservation` button.
4. Enter `Name`, `Phone Numer`, `Identifier`, `Email` and click `submit` button.


Example Click on `View Tables` should see something like this:
````
Current Reservations

Table #1
ID: RobertXavier
Name: Robert
Email: test@gmail.com
Phone: 343

Table #2
ID: Super Dabby
Name: steven
Email: steven@yahoo.com
Phone: asd;lkfj

Table #3
ID: k
Name: k
Email: k
Phone: k

Table #4
ID: f
Name: f
Email: f
Phone: f

Table #5
ID:
Name:
Email:
Phone:


Waiting List

Table #1
ID: the waitlist?
Name: will
Email: go on
Phone: this
````

### Code Organization and Documentation

Link to the repository [here](https://github.com/Jsclorer/Hot-Rest/).

For the email notifications to work requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the app.  The `.env` file must contain the app owner's gmail address and password as shown below.  Also, note the owner's gmail account must have `access for less secure apps` enabled.
````
NODEMAILER_GMAIL_ACCOUNT=your_gmail_address
NODEMAILER_GMAIL_PASSWORD=your_gmail_password
````

If you are going to deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necesary to set the two environmental variables with these commands from the Heroku CLI:
````
heroku config:set NODEMAILER_GMAIL_ACCOUNT=your_gmail_address
heroku config:set NODEMAILER_GMAIL_PASSWORD=your_gmail_password
````

For the [Twilio](https://www.twilio.com/) SMS notifications to work requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the app.  The `.env` file must contain the app owner's TWILIO_ADDRESS_SID and TWILIO_AUTH_TOKEN which are provided from the [Twilio](https://www.twilio.com) dev setup.  

````
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
````

If you are going to deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necessary to set the four environmental variables with these commands from the heroku CLI:
````
heroku config:set TWILIO_ACCOUNT_SID=your_twilio_account_sid
heroku config:set TWILIO_AUTH_TOKEN=your_twilio_auth_token
heroku config:set TWILIO_NUMBER=your_twilio_number
heroku config:set PHONE_NUMBER=your_phone_number

````








