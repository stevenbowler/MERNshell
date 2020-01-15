import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';
import { cleanup } from '@testing-library/react';

//const { passwordValidation, emailValidation, nameValidation } = require('../validation/validationNameEmailPassword');


class LeaderBoardModal extends Component {
    constructor(props) {
        super(props);
        this.bestScoreName = "Not logged-in";
        this.bestScore = 0;
        this.bestLevel = 0;
        this.secondBestScoreName = "Not logged-in";
        this.secondBestScore = 0;
        this.secondBestLevel = 0;
        this.thirdBestScoreName = "Not logged-in";
        this.thirdBestScore = 0;
        this.thirdBestLevel = 0;
        this.forthBestScoreName = "Not logged-in";
        this.forthBestScore = 0;
        this.forthBestLevel = 0;
        this.fifthBestScoreName = "Not logged-in";
        this.fifthBestScore = 0;
        this.fifthBestLevel = 0;
        this.userBestScoreName = "no best score yet for you";
        this.userBestScore = 0;
        this.userBestLevel = 0;
        this.previousScore = 1;
        this.previousLevel = 1;
    }

    //this.bestScore = 440;

    componentDidMount() {

    }

    componentDidUpdate() {
        //console.log("previous score: ", this.previousScore, "   this score: ", this.props.score, "  this level: ", this.props.level);
        if (this.props.loggedIn &&
            this.previousScore !== this.props.score) {
            if (this.props.score !== 0 && this.props.level !== 0) this.postThisScore();
            this.getLeadersData();
            this.getUserPersonalBest();
            this.previousScore = this.props.score;
            this.previousLevel = this.props.level;
        }
    }

    getUserPersonalBest = function () {
        var temp = "";
        const loggedIn = this.props.loggedIn;
        const setLeaderBoardUserBest = () => {
            this.userBestScore = temp.data[0].score;
            this.userBestLevel = temp.data[0].level;
        }
        const logout = () => this.logout();
        var path = '/api/games/best?email=' + this.props.email;
        //console.log("path:  ", path);
        axios
            .get(
                path,
                {
                    headers: { 'auth-token': this.props.token },

                })
            .then(function (response) {
                //console.log("getUserPersonalBest axios post:  " + response);
                temp = response;
                //console.log("this.userName axios loaded OK: " + temp.data[0].score);
                setLeaderBoardUserBest();


                //console.log("this.userName axios loaded OK: " + temp2);


            })
            .catch(function (error) {
                console.log("Steve Output, could not getUserStats from LeaderBoardModal.js: " + error.message);
                if (loggedIn) logout();
                //cleanUp();
                // this.userBestScore = 0;
                // this.userBestLevel = 0;

            })
            // .finally(function () {
            // }

            // )
            ;
        // console.log("holder: " + holder);
        // return holder;
    }

    getLeadersData = () => {
        //console.log("App.js handleBestUpdate input name: " + data.name + "email: " + data.email + "password: " + data.password);
        var leaderArray = "";
        const loggedIn = this.props.loggedIn;
        const logout = () => this.logout();
        const setLeaderBoard = () => {
            //console.log("leaderArray.data[0].score: " + leaderArray.data[0].score);
            this.bestScoreName = leaderArray.data[0].name;
            this.bestScore = leaderArray.data[0].score;
            this.bestLevel = leaderArray.data[0].level;
            this.secondBestScoreName = leaderArray.data[1].name;
            this.secondBestScore = leaderArray.data[1].score;
            this.secondBestLevel = leaderArray.data[1].level;
            this.thirdBestScoreName = leaderArray.data[2].name;
            this.thirdBestScore = leaderArray.data[2].score;
            this.thirdBestLevel = leaderArray.data[2].level;
            this.forthBestScoreName = leaderArray.data[3].name;
            this.forthBestScore = leaderArray.data[3].score;
            this.forthBestLevel = leaderArray.data[3].level;
            this.fifthBestScoreName = leaderArray.data[4].name;
            this.fifthBestScore = leaderArray.data[4].score;
            this.fifthBestLevel = leaderArray.data[4].level;
            //console.log(" this.bestLevelName: " + this.bestLevelName);
        }
        axios
            .get(
                '/api/games/leaders',
                {
                    headers: { "auth-token": this.props.token },

                })
            .then(function (response) {
                //console.log(response);
                leaderArray = response;
                setLeaderBoard();
            })
            .catch(function (error) {
                //console.log("Steve Output, could not getGamesLeaders from LeaderBoardModal.js: " + error.message);
                if (loggedIn) logout();

            });
        // .finally(function () {
        // });
    }


    postThisScore = () => {
        //console.log("LeaderBoardModal.js postThisScore this.props.token: " + this.props.token + " data email: " + this.props.email);
        const loggedIn = this.props.loggedIn;
        const logout = () => {
            //console.log("should log you out now");
            this.logout();
        }
        axios({
            method: 'post',
            url: '/api/games/postscore',
            headers: { 'auth-token': this.props.token },
            data: {
                name: this.props.userName,
                email: this.props.email,
                score: this.props.score,
                level: this.props.level
            }
        })
            .then(function (response) {
                console.log("api/games/postscore response:  " + response);

            })
            .catch(function (error) {
                // console.log("leaderBoardModal postThisScore, could not post score from App.js: " + error.message);
                // console.log("leaderBoardModal postThisScore, could not post error.status: " + error.status);
                // console.log("should log out now");
                if (loggedIn) logout();

            });

    }




    cancel = () => {
        this.props.onCancel();
    }

    logout = () => this.props.onLogout();

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpenLeaderBoardModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Joggle All Time Best</ModalHeader>
                    <ModalBody>
                        <Form >
                            <FormGroup>
                                <Label for="BestScore" sm={20}>Top 5 All Time Best Jogglers:</Label>
                                <Col sm={100}>

                                    <FormText>
                                        <strong>{"1.  "}</strong>{this.props.loggedIn ? this.bestScoreName : "not logged in"}{": =>   Score: "}
                                        <strong>{this.props.loggedIn ? this.bestScore : "Log In"}</strong>{": =>   Level: "}{this.props.loggedIn ? this.bestLevel : "Log In"}{<br></br>}
                                        {"2.  "}{this.props.loggedIn ? this.secondBestScoreName : "not logged in"}{": =>   Score: "}
                                        {this.props.loggedIn ? this.secondBestScore : "Log In"}{": =>   Level: "}{this.props.loggedIn ? this.secondBestLevel : "Log In"}{<br></br>}
                                        {"3.  "}{this.props.loggedIn ? this.thirdBestScoreName : "not logged in"}{": =>   Score: "}
                                        {this.props.loggedIn ? this.thirdBestScore : "Log In"}{": =>   Level: "}{this.props.loggedIn ? this.thirdBestLevel : "Log In"}{<br></br>}
                                        {"4.  "}{this.props.loggedIn ? this.forthBestScoreName : "not logged in"}{": =>   Score: "}
                                        {this.props.loggedIn ? this.forthBestScore : "Log In"}{": =>   Level: "}{this.props.loggedIn ? this.forthBestLevel : "Log In"}{<br></br>}
                                        {"5.  "}{this.props.loggedIn ? this.fifthBestScoreName : "not logged in"}{": =>   Score: "}
                                        {this.props.loggedIn ? this.fifthBestScore : "Log In"}{": =>   Level: "}{this.props.loggedIn ? this.fifthBestLevel : "Log In"}{<br></br>}
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="yourBestScore" sm={20}>Your Best: </Label>
                                <Col sm={100}>

                                    <FormText>
                                        {"Name:  "}{this.props.loggedIn ? this.props.userName : "Not Logged In"}
                                        {"  Score:   "}<strong>{this.props.loggedIn ? this.userBestScore : "Log In"}</strong>
                                        {"  Level:   "}<strong>{this.props.loggedIn ? this.userBestLevel : "Log In"}</strong>
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="yourScore" sm={20}>This Game: </Label>
                                <Col sm={100}>

                                    <FormText>
                                        {this.props.loggedIn ? this.props.userName : "Not Logged In"}
                                        {"  Your Score:  "}<strong>{this.props.score}</strong>
                                        {"  Your Level:   "}<strong>{this.props.level}</strong>
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }

}
export default LeaderBoardModal;