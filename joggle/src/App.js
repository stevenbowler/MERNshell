import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import Box from './components/Box';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import LoginRegisterModals from './components/LoginRegisterModals';
import LeaderBoardModal from './components/LeaderBoardModal';


//
//  To do Jan. 10, 2020: User Authorization updates required
//        handleLogin if login not authorized leaves loginModal fields green on retry (Done Jan. 10)
//              LoginModal handleSubmit w preventDefault corrects but lose user message "not logged in" on Navbar
//        pass back body of messages from routes/users.js currently just 400 status, message would help user
//        only accepts .com and .net extensions due to TLD limitations in @hapi/joi string.email
//        server.js at bottom for environment should be app.use and app.get instead of appluse and applget?
//          


// const parsePX = (pxString) => Number(pxString.slice(pxString, -2, 2)); // parse out "px" return integer
const parseS = (sString) => Number(sString.slice(sString, -1, 1));     // parse out "s" return integer
const boxFactor = "50px";           //Box Width Height Growth Factor
// const maxLevelTimer = 6;           //seconds per level
const maxLevel = 20;                // handleEndGame after finishing this level
const originalFuelThiefTransition = "15s";
document.body.style = 'background: black;';
// Or with CSS
// document.body.classList.add('background-red');


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
      height: "60%",                // Box height
      width: "100%",                 // Box width
      backgroundColor: "black",   // "#bf5700" Box color, from brand.utexas.edu
      grow: "true",                 // currently disabled grow shrink
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

  }

  componentWillUnmount() {
  }

  // called from lifecycle methods
  gameUpdate = () => {
    console.log("gameUpdate gameOn: ");

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
    // const loginObject = // removed due to wasn't used (yet)
    axios
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

  }


  handleChangeColor = () => this.setState({ backgroundColor: "blue" });
  handleGrow = () => this.changeSize();
  handleShrink = () => this.changeSize();

  // grow or shrink the Box with + or - factor value
  changeSize = () => {
    console.log("changeSize doesn't do anything anymore");
  }


  // if fuelThief Hits BlackBox, currently managed in fuelThief, and handled below in handleBlackBoxHit
  handleTouch = () => {

  }



  render() {
    return (
      <div className="App">
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
        </Container>
      </div>
    );
  }
}

export default App;
