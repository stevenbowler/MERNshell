import React from 'react';
import {
    // Media,
    // Button
} from 'reactstrap';
import './Box.css';
import composers from './Photos.json';
import Photo from '../Photo';

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.scoreFactor = 10;
        this.clickedOnComposers = [];
        this.justClickedComposerName = "";
        this.lastGameScore = 0;
        this.bestGameScore = 0;
        this.photoSequenceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];    // array of integers for photo sequence, tets reshuffled
        this.composerArray = composers.map(composer =>
            <Photo
                key={composer.id}                           //key same as composerId = composer.id
                composerId={composer.id}
                id={this.photoSequenceArray[composer.id]}
                onChoosePhoto={this.handleChoosePhoto} />
        );

        this.state = {
            gameScore: 0
        };
    }



    // assign unique random numbers from 0 to 11 in the array to rearrange position of photos
    photoSequenceArrayShuffle = () => {
        console.log("photoSequence");
        // generate the new sequence of photo display
        this.photoSequenceArray = [];
        while (this.photoSequenceArray.length < 12) {           // cycle random numbers 0 to 11 until array full
            var holder = Math.floor(Math.random() * 12);
            if (this.photoSequenceArray.indexOf(holder) === -1) {
                this.photoSequenceArray.push(holder);
                // console.log(this.photoSequenceArray);
            }
        }
        // generate starting photo positions (then reassign top and left based on new sequence)
        this.photoTopLeftArray = [];
        for (var i = 0; i < composers.length; i++) {
            var photoDiv = document.getElementById("photo" + composers[i].id);
            var photoObject = {
                top: photoDiv.getAttribute("margin-top"),
                left: photoDiv.getAttribute("margin-left"),
            }
            this.photoTopLeftArray.push(photoObject);
        }
        console.log("this.photoTopLeftArray: ", this.photoTopLeftArray);

        console.log("Box photo sequenceShuffle Array: ", this.photoSequenceArray);
        this.composerArray = composers.map(composer =>
            // <Photo key={this.photoSequenceArray[composer.id]} {...composer} onChoosePhoto={this.handleChoosePhoto} />
            <Photo
                key={composer.id}                           //key same as composerId = composer.id
                composerId={composer.id}
                id={this.photoSequenceArray[composer.id]}
                onChoosePhoto={this.handleChoosePhoto} />
        );
        this.forceUpdate();
    }


    // check if the element is in the array, (couldn't get .indexOf to work)
    // called from handleChoosePhoto
    checkIss = (issFullArray, issToCheck) => {
        for (var i = 0; i < issFullArray.length; i++) {
            if (issFullArray[i] === issToCheck) {
                return true;
            }
        }
        return false;
    }



    // Called from onChoosePhoto prop from Box with the just clicked composer number, for comparison
    handleChoosePhoto = (justClickedComposerId) => {
        if (!this.checkIss(this.clickedOnComposers, justClickedComposerId)) {  //if justClicked not in clickedOn array then keep playing
            this.clickedOnComposers.push(justClickedComposerId);
            this.photoSequenceArrayShuffle();
            this.justClickedComposerName = composers[justClickedComposerId].name;
            this.setState({ gameScore: this.state.gameScore + this.scoreFactor });
        } else {
            this.lastGameScore = this.state.gameScore;
            if (this.lastGameScore >= this.bestGameScore) this.bestGameScore = this.lastGameScore;
            this.setState({ gameScore: 0 });
            this.clickedOnComposers = [];
        }
    }


    render() {
        return (
            <div id="box" style={{
                float: "none",
                maxWidth: "900px",
                overflow: "hidden",
                margin: "0 auto",
                // height: this.props.height,
                // width: this.props.width,
                backgroundColor: this.props.backgroundColor,
                fontSize: this.props.fontSize,
                transitionDuration: "1s",
                position: "relative"
            }}><p><strong className="composerName">{this.justClickedComposerName && this.state.gameScore ? "Just Clicked: " : ""}{this.justClickedComposerName && this.state.gameScore ? this.justClickedComposerName : ""}</strong>
                    <strong className="currentScore">{this.state.gameScore ? " Current Score: " : " Click image to start "}{this.state.gameScore ? this.state.gameScore : ""}</strong>
                    <strong className="lastGameScore">{this.lastGameScore ? " Last Score: " : ""}{this.lastGameScore ? this.lastGameScore : ""}</strong>
                    <strong className="bestGameScore">{this.bestGameScore ? " Best Score: " : ""}{this.bestGameScore ? this.bestGameScore : ""}</strong>
                </p>
                {this.composerArray}
            </div >
        )
    }
}

export default Box;