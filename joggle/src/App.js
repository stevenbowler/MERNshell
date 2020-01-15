import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import Box from './components/Box';
import { Container } from 'reactstrap';
import Buttons from './components/Buttons';
import AppNavbar from './components/AppNavbar';
import LoginRegisterModals from './components/LoginRegisterModals';
import LeaderBoardModal from './components/LeaderBoardModal';
import BlackBox from './components/BlackBox';
import FuelThief from './components/FuelThief';
import FuelTank from './components/FuelTank';
//ar { handleGamesScores, getUserPersonalBest } = require('./functions/handleGamesData');
//import { handleGamesPostGetScores, getUserPersonalBest } from './functions/handleGamesData';



// To do Dec. 28, 2019:  Game updates required
//        change NavBar Start and EndGame buttons to Login and Register (DONE Jan. 7)
//        add login and register (DONE Jan. 7)
//        add handling best ever score and personal best score from MongoDB
//        display the hamburger? (DONE Jan. 7.  added image)
//        halt timers if not gameOn
//        if fuel remaining at endOfGame then add to score
//        if grow or shrink box then adjust scoring
//        conditional rendering on blackBox for different levels, states
//        update colors on container and "blue" button on NavBar to do something better
//        on reset game locates fuelThief on top of blackBox, takes fuel before game start, start at less than 100%
//        clean up unused files and images
//        study and maybe enlarge center buttons on screen for phone ergonomics?
//        handleRight/Left/Up/Down do they need forceUpdate callback?
//        document
//
//  To do Jan. 10, 2020: User Authorization updates required
//        handleLogin if login not authorized leaves loginModal fields green on retry (Done Jan. 10)
//              LoginModal handleSubmit w preventDefault corrects but lose user message "not logged in" on Navbar
//        pass back body of messages from routes/users.js currently just 400 status, message would help user
//        only accepts .com and .net extensions due to TLD limitations in @hapi/joi string.email
//        server.js at bottom for environment should be app.use and app.get instead of appluse and applget?
//          


const parsePX = (pxString) => Number(pxString.slice(pxString, -2, 2)); // parse out "px" return integer
const parseS = (sString) => Number(sString.slice(sString, -1, 1));     // parse out "s" return integer
const boxFactor = "50px";           //Box Width Height Growth Factor
const blackBoxMoveFactor = "50px";  //Black Box Move Factor
const maxLevelTimer = 6;           //seconds per level
const maxLevel = 20;                // handleEndGame after finishing this level
const originalFuelThiefTransition = "15s";
const levelTransitionFactor = 0.85;    // reduce transitionDuration for each new level
const blackBoxHitFuelReduction = 12;  // fuel units reduced when fuelThief hits blackBox
const fuelTankHitFuelIncrease = 8;    // fuel units increased when blackBox hits fuelTank


class App extends React.Component {
  constructor(props) {
    super(props);
    this.fuel = 100;
    this.level = 1;
    this.score = 0;
    this.levelTimer = 0;
    this.fuelThiefTransition = originalFuelThiefTransition;
    this.levelTransitionFactor = (parseS(this.fuelThiefTransition) - 3) / maxLevel;
    this.loggedIn = false;
    this.token = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.timerOn = false;
    this.gamesData = {
      userBestScore: 0,
      userBestLevel: 0,
      bestScore: 0,
      bestScoreName: 0,
      bestLevel: 0,
      bestLevelName: 0
    };
    this.state = {
      height: "350px",
      width: "350px",
      backgroundColor: "#bf5700",   // from brand.utexas.edu
      grow: "true",
      blackBoxMarginLeft: "0px",
      blackBoxMarginTop: "0px",
      isOpenNavBar: false,
      isOpenLoginModal: false,
      isOpenRegisterModal: false,
      isOpenLeaderBoardModal: false,
      name: "Guest...Log In",
      gameOn: false,
      loggedIn: false,
      finalScore: 0,
      finalLevel: 0

    };
  }


  // LIFECYCLE METHODS and related support functions

  componentDidMount() {
  }

  componentDidUpdate() {
    if (!this.state.gameOn && this.timerOn) {
      clearInterval(this.timerID);
      this.timerOn = false;
    }

    if (this.state.gameOn && !this.timerOn) {
      this.timerID = setInterval(
        () => this.gameUpdate(),
        1000);
      this.timerOn = true;
    }

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // called from lifecycle methods
  gameUpdate = () => {
    console.log("gameUpdate gameOn: " + this.state.gameOn);
    if (this.state.gameOn) {
      console.log("levelTimer before: " + this.levelTimer);
      ++this.levelTimer;
      console.log("levelTimer after: " + this.levelTimer);
      if (this.levelTimer >= maxLevelTimer) this.newLevel();
      if (this.level > maxLevel) this.handleEndGame();
      this.score = this.score + this.level;
    }
  }

  // called from lifecycle methods gameUpdate, set parameters for new game level.
  newLevel = () => {
    this.fuelThiefTransition =
      (parseS(this.fuelThiefTransition) * levelTransitionFactor).toString() + "s";
    ++this.level;
    this.levelTimer = 0;
  }


  // STATE HANDLERS and related support functions FROM COMPONENTS

  // handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
  handleToggleNavbar = () => {
    this.setState({ isOpenNavBar: !this.state.isOpenNavBar });
    if (this.state.isOpenNavBar) this.setState({ gameOn: false });
  }

  // handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
  handleToggleLeaderBoardModal = () => {
    this.setState({ isOpenRegisterModal: false });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: !this.state.isOpenLeaderBoardModal });
  }


  // handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
  handleToggleLoginRegisterModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: false });
  }


  // handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
  handleToggleLoginModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLeaderBoardModal: false });
    this.setState({ isOpenLoginModal: !this.state.isOpenLoginModal });
  }


  // called from Buttons to handle BlackBox position changes
  handleRight = () => this.setState({ blackBoxMarginLeft: this.newMargin(this.state.blackBoxMarginLeft, blackBoxMoveFactor, "right") }, this.forceUpdate());
  handleLeft = () => this.setState({ blackBoxMarginLeft: this.newMargin(this.state.blackBoxMarginLeft, "-" + blackBoxMoveFactor, "left") }, this.forceUpdate());
  handleUp = () => this.setState({ blackBoxMarginTop: this.newMargin(this.state.blackBoxMarginTop, "-" + blackBoxMoveFactor, "up") }, this.forceUpdate());
  handleDown = () => this.setState({ blackBoxMarginTop: this.newMargin(this.state.blackBoxMarginTop, blackBoxMoveFactor, "down") }, this.forceUpdate());

  // this sets new margins Left or Top for BlackBox, only called from handle Right, Left, Up, Down to setState of margins
  newMargin = (currentPosition, factor, direction) => {
    const newPosition = parsePX(currentPosition) + parsePX(factor);
    switch (direction) {
      case "right": if (newPosition >= parsePX(this.state.width)) return currentPosition; break;
      case "left": if (newPosition <= 0) return "0px"; break;
      case "up": if (newPosition <= 0) return "0px"; break;
      case "down": if (newPosition >= parsePX(this.state.height)) return currentPosition; break;
      default: break;
    }
    if (!this.state.isOpenNavBar && !this.state.gameOn) this.setState({ gameOn: true });
    return (parsePX(currentPosition) + parsePX(factor)).toString() + "px";
  }

  // called from LoginRegisterModals component to handle registration request attribute changes
  handleRegister = (data) => {
    console.log("App.js handleRegister input name: " + data.name + "email: " + data.email + "password: " + data.password);
    axios
      .post(
        '/api/users/register',
        {
          name: data.name,
          email: data.email,
          password: data.password
        })
      .then(function (response) {
        console.log(response);
        //this.handleLogin(loginData);    // should be able to log automatically in once registered OK
      })
      .catch(function (error) {
        console.log(" Could not register from App.js: " + error.message);
      })
      .finally(function () {
        // this.handleLogin({
        //   email: data.email,
        //   password: data.password
        // });
      });
  }


  handleLogin = (data) => {
    var tokenHandleLogin = "";
    var nameHandleLogin = "";
    var loginError = "";
    var errorResponse = "";
    const finishLogin = () => {
      if (loginError) {
        this.setState({ name: "wrong email or pswd" }); // will display error message on Navbar
        console.log(this.name);
        this.handleToggleLoginModal();
        return;
      }
      this.token = tokenHandleLogin;
      console.log("handleLogin this.token = tokenHandleLogin" + this.token);
      this.email = data.email;
      this.password = data.password;
      this.setState({ name: nameHandleLogin }); // will display name on Navbar
      this.handleToggleLoginModal();
      this.setState({ loggedIn: true });
      //console.log(" token .finally outside of Axios: " + tokenHandleLogin + " this.token: " + this.token);
    }
    const loginObject = axios
      .post(
        '/api/users/login',
        {
          email: data.email,
          password: data.password
        })
      .then(function (response) {
        tokenHandleLogin = response.data.token;
        nameHandleLogin = response.data.user.name;
        console.log("app.js handleLogin tokenHandleLogin: " + tokenHandleLogin);
      })
      .catch(function (error) {
        //console.log("Steve Output, could not login from App.js: " + error);
        loginError = error;
        errorResponse = error.response;
        console.log("Steve Output, could not login from App.js: " + loginError);
        console.log("handleLogin catch errorResponse :" + errorResponse);
      })
      .finally(function () {
        finishLogin();
      });
  }


  handleLogout = () => {
    this.token = "";
    this.email = "";
    this.password = "";
    this.setState({ name: "Logged out" });
    this.setState({ loggedIn: false });
    this.setState({ finalScore: 0 });
    this.setState({ finalLevel: 0 });
  }


  handleEndGame = () => {
    this.setState({ finalScore: this.score + this.fuel });
    this.setState({ finalLevel: this.level });
    console.log("just before handleGamesPostThisScore, token: " + this.token + "email: " + this.email);
    console.log("Final Score: " + this.state.finalScore + "Final Level: " + this.state.finalLevel);
    //console.log("gamesData.bestScore: " + gamesData + "  gamesData.userBestScore: " + gamesData);
    this.handleToggleLeaderBoardModal();
    // reset all variables for new game
    this.setState({ blackBoxMarginLeft: "0px" });
    this.setState({ blackBoxMarginTop: "0px" }, () => this.setState({ gameOn: false }));
    this.level = 1;
    this.score = 0;
    this.levelTimer = 0;
    this.fuel = 100;
    this.fuelThiefTransition = originalFuelThiefTransition;
    this.forceUpdate();
  }


  handleChangeColor = () => this.setState({ backgroundColor: "blue" });
  handleGrow = () => this.setState({ grow: "true" }, () => this.changeSize());
  handleShrink = () => this.setState({ grow: "false" }, () => this.changeSize());

  // grow or shrink the Box with + or - factor value
  changeSize = () => {
    let boxWidth, newBoxWidth, factor;
    factor = boxFactor;
    if (this.state.grow === "false") factor = "-" + factor;
    boxWidth = this.state.width;
    newBoxWidth = (parsePX(boxWidth) + parsePX(factor)).toString() + "px";
    this.setState({
      height: newBoxWidth,
      width: newBoxWidth
    }, () => this.moveBlackBox());
  }

  // if shrink ing Box then check that BlackBox still inside Box, move blackBox up and left if required
  moveBlackBox = () => {
    if (parsePX(this.state.blackBoxMarginLeft) >= parsePX(this.state.width)) this.handleLeft();
    if (parsePX(this.state.blackBoxMarginTop) >= parsePX(this.state.height)) this.handleUp();
  }

  // if fuelThief Hits BlackBox, currently managed in fuelThief, and handled below in handleBlackBoxHit
  handleTouch = () => {

  }

  // Called back from FuelThief once fuelThief location reset for next round
  handleBlackBoxHit = () => {
    this.fuel = this.fuel - blackBoxHitFuelReduction; //const blackBoxHitFuelReduction = 11;
    if (this.fuel <= 0) this.handleEndGame();
  }

  handleFuelTankHit = () => {
    this.fuel = this.fuel + fuelTankHitFuelIncrease; //const fuelTankHitFuelIncrease = 9;
  }


  render() {
    return (
      <div className="App" >
        <AppNavbar
          name={this.state.name}
          loggedIn={this.state.loggedIn}
          isOpen={this.state.isOpenNavBar}
          onRegister={this.handleToggleLoginRegisterModal}
          onLogin={this.handleToggleLoginModal}
          onLogout={this.handleLogout}
          onLeaderBoard={this.handleToggleLeaderBoardModal}
          onEndGame={this.handleEndGame}
          onToggle={this.handleToggleNavbar}
          onGrow={this.handleGrow}
          onShrink={this.handleShrink}
          onChangeColor={this.handleChangeColor}
        />
        <LoginRegisterModals
          isOpenLoginModal={this.state.isOpenLoginModal}
          isOpenRegisterModal={this.state.isOpenRegisterModal}
          onCancel={this.handleToggleLoginRegisterModal}
          onRegister={this.handleRegister}
          onLogin={this.handleLogin}
          name={this.name}
          email={this.email}
          password={this.password}
        />
        <LeaderBoardModal
          loggedIn={this.state.loggedIn}
          onLogout={this.handleLogout}
          isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
          onCancel={this.handleToggleLeaderBoardModal}
          token={this.token}
          email={this.email}
          userName={this.state.name}
          score={this.state.finalScore}
          level={this.state.finalLevel}
        />
        <Container>
          <Box
            delta={boxFactor}
            height={this.state.height}
            width={this.state.width}
            backgroundColor={this.state.backgroundColor}
            fontSize={this.state.fontSize}
          />
          <BlackBox
            marginLeft={this.state.blackBoxMarginLeft}
            marginTop={this.state.blackBoxMarginTop}
            fuel={this.fuel}
            score={this.score}
            level={this.level}
          />
          <Buttons
            marginTop={this.state.height}
            onRight={this.handleRight}
            onLeft={this.handleLeft}
            onUp={this.handleUp}
            onDown={this.handleDown}
            isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
            isOpenRegisterModal={this.state.isOpenRegisterModal}
            isOpenNavBar={this.state.isOpenNavBar}
          />
          <FuelThief
            boxHeight={this.state.height}
            boxWidth={this.state.width}
            blackBoxLeft={this.state.blackBoxMarginLeft}
            blackBoxTop={this.state.blackBoxMarginTop}
            gameOn={this.state.gameOn}
            onBlackBoxHit={this.handleBlackBoxHit}
            transition={this.fuelThiefTransition}
          />
          <FuelTank
            boxHeight={this.state.height}
            boxWidth={this.state.width}
            blackBoxLeft={this.state.blackBoxMarginLeft}
            blackBoxTop={this.state.blackBoxMarginTop}
            gameOn={this.state.gameOn}
            onFuelTankHit={this.handleFuelTankHit}
          />
        </Container>
      </div>
    );
  }
}

export default App;
