# MERNshell

Full Stack MERN shell with login validation, password encryption and JSON web token protection ready to go.  Copy in ReactJS app into client/src directory, then set props to link up navbar and client/App.js functions to your containers.  


### Overview

The MERNshell enables the coder/team to focus on their app while providing register/login capability complete with input validation, password encryption and private routes protection with JSON Web Tokens.

This project has afforded this programmer the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose).


### User Documentation

First, watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1JP_OVqQBgVvdr6Cqqd9xBg2_fPOLpMeB/view).

Then see example MERNshell deployed by [clicking here](https://mernshell.herokuapp.com/).

See another example of app fully deployed [clicking here](https://secure-citadel-76923.herokuapp.com/).



### Program Documentation

See [program documentation](https://stevenbowler.github.io/MERNshell/docs/index.html) in JSDOC format.

Link to the repository [here](https://github.com/stevenbowler/MERNshell/).

Requires [dotenv](https://www.npmjs.com/package/dotenv) to be installed and a `.env` file must be stored in the root directory for the app.  The `.env` file must contain the app owner's MongoDB URL with embedded username and password.  _*To use the same user database in development, testing and production then, it is critically important that the TOKEN_SECRET shown below be exactly the same string.*_
````
DB_CONNECTION=your_mongodb_url_with_embedded_username_password
TOKEN_SECRET = any_random_string_but_always_use_same_string
````

To deploy to Heroku then following `git push heroku master` command, and before accessing the app page, will be necesary to set the two environmental variables with these commands from the Heroku CLI:
````
heroku config:set --app=mernshell DB_CONNECTION=your_mongodb_url_with_embedded_username_password
heroku config:set --app=mernshell TOKEN_SECRET=any_random_string_but_always_use_same_string
````


## Available Scripts
[Connect Repo with Heroku Video](https://youtu.be/GgNcs9zlFSA?list=PLOFmg4xbN_TPrB6w4rThsFanVxJI_SfER)

Program is deployed to [Heroku](https://www.heroku.com).  Program uses [concurrently](https://www.npmjs.com/package/concurrently), so locally runs server on port 5000 and react app on port 3000.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).






