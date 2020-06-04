# MERNshell

Full Stack MERN shell with login validation, password encryption and JSON web token protection ready to go.  Copy in ReactJS app into client/src directory, then set props to link up navbar and client/App.js functions to your containers.  


### Overview

The MERNshell enables the coder/team to focus on their app while providing register/login capability complete with input validation, password encryption and private routes protection with JSON Web Tokens.

This project has afforded this programmer the opportunity to gain experience in development of full stack MERN apps including various technologies.  The Packages used include: [@hapi/joi](https://www.npmjs.com/package/@hapi/joi), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [body-parser](https://www.npmjs.com/package/body-parser), [concurrently](https://www.npmjs.com/package/concurrently), [cors](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv), [express](https://www.npmjs.com/package/express), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose).


### User Documentation

1. Watch the video tutorial by clicking [this link](https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing). Then click [this link](https://drive.google.com/file/d/1_4N8HZdfe0iLeP5e1oFAKL5MQbadpiw6/view?usp=sharing).

2. See example MERNshell deployed by [clicking here](https://mernshell.herokuapp.com/).

3. See another example of app fully deployed [clicking here](https://secure-citadel-76923.herokuapp.com/).

4. Open Git Bash follow enter these commands: 
````
$ mkdir clonedir
$ cd clonedir
$ git clone --bare https://github.com/stevenbowler/MERNshell.git
$ cd MERNshell.git
````
5. Go to GitHub and open a new repository.
6. Copy the Clone link from the repository (https://github.com/yourGitHubId/newRepository.git).
7. Return to Git Bash and MERNshell.git directory.
8. Enter the following commands from Git Bash:
````
$ git push --mirror https://github.com/yourGitHubId/newRepository.git
$ cd ..
$ rm -rf MERNshell.git
$ cd ..
$ rm -rf clondir
````
9. While in Git Bash, go to the directory where you want to clone down the newRepositoy.git enter this command:
````
$ git clone https://github.com/yourGitHubId/newRepository.git
````
10. Create a `.env` file in the directory of the new local repository.
11. In `.env` file enter values for:
    1. `DB_CONNECTION` which is your Mongo DB URL string complete with your authorized Mongo account and password.
    2. `TOKEN_SECRET` unique random string that you chose, will be used to generate JSON Web Tokens.
12. `.env` file should look like this:
````
DB_CONNECTION=your_mongodb_url_with_account_password_collection
TOKEN_SECRET=your_unique_random_string
````
13. From Git Bash prompt local directory (master) enter the following:
````
$ npm install
$ cd client
$ npm install
$ cd ..
$ npm run dev
````
14. Check out localhost:3000 should look like [this](https://mernshell.herokuapp.com/).



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






