import React from 'react';

//returns the absolute position and height/width of some element within document
const getElementAbsolutePos = (element) => {
    if (element !== null) {
        var div = document.getElementById(element);
        var res = div.getBoundingClientRect();
    }
    //console.log("Left: " + res.left + ", Top: " + res.top + ", Width: " + res.width + ", Height: " + res.height);
    return res;
}

const parsePX = (pxString) => Number(pxString.slice(pxString, -2, 2));
const fuelThiefWidth = "25px";
const fuelThiefHeight = "25px";

class FuelThief extends React.Component {
    constructor(props) {
        super(props);
        this.topMargin = parseInt(Math.random() * (parsePX(this.props.boxHeight) - 25)) + "px";
        this.leftMargin = parseInt(Math.random() * (parsePX(this.props.boxWidth) - 25)) + "px";
        this.timerOn = false;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.collision()) {
            this.topMargin = parseInt(Math.random() * (parsePX(this.props.boxHeight) - 25)) + "px";
            this.leftMargin = parseInt(Math.random() * (parsePX(this.props.boxWidth) - 25)) + "px";
            //this.forceUpdate();
            this.hit();
        }

        if (!this.props.gameOn && this.timerOn) {
            clearInterval(this.timerID);
            this.timerOn = false;
        }

        if (this.props.gameOn && !this.timerOn) {
            this.timerID = setInterval(
                () => this.setLocation(),
                1000);
            this.timerOn = true;
        }
    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    setLocation = () => {
        if (!this.props.gameOn) return;
        this.leftMargin = this.props.blackBoxLeft; //aim projectile at blackBox by setting to same left margin
        if (parsePX(this.props.blackBoxLeft) >= (parsePX(this.props.boxWidth) / 2) &&
            parsePX(this.props.blackBoxLeft) <= (parsePX(this.props.boxWidth)) + 50)
            this.leftMargin = (parsePX(this.props.blackBoxLeft) + 25) + "px";

        this.topMargin = this.props.blackBoxTop; //aim projectile at blackBox by setting to same top margin
        if (parsePX(this.props.blackBoxTop) >= (parsePX(this.props.boxHeight) / 2) &&
            parsePX(this.props.blackBoxTop) <= (parsePX(this.props.boxHeight)) + 50)
            this.topMargin = (parsePX(this.props.blackBoxTop) + 25) + "px";
        this.forceUpdate();
    }

    collision = () => {

        if (this.touching("fuelThief", "blackBox")) {
            //console.log("touching test OK: ");
            return true;
        }
        else {
            //console.log("not touching or failed touching test");
            return false;
        }

    }

    touching = (element1, element2) => {
        const resElement1 = getElementAbsolutePos(element1);
        const resElement2 = getElementAbsolutePos(element2);
        //console.log("absolute position Element1 projectile left: " + resElement1.left + "top: " + resElement1.top);
        //console.log("absolute position Element2 bB right: " + resElement2.right + "bottom: " + resElement2.bottom);
        if ((resElement2.left <= resElement1.left && resElement1.left <= resElement2.right && resElement2.top <= resElement1.top && resElement1.top <= resElement2.bottom) ||
            (resElement2.left <= resElement1.left && resElement1.left <= resElement2.right && resElement2.top <= resElement1.bottom && resElement1.bottom <= resElement2.bottom) ||
            (resElement2.left <= resElement1.right && resElement1.right <= resElement2.right && resElement2.top <= resElement1.top && resElement1.top <= resElement2.bottom) ||
            (resElement2.left <= resElement1.right && resElement1.right <= resElement2.right && resElement2.top <= resElement1.bottom && resElement1.bottom <= resElement2.bottom)
        )
            return true;
        else return false;
    }

    hit = () => this.props.onBlackBoxHit();



    render() {
        return (
            <div id="fuelThief" style={{
                height: fuelThiefHeight,
                width: fuelThiefWidth,
                backgroundColor: "red",
                color: "black",
                fontSize: "8px",
                transitionDuration: this.props.transition,
                marginLeft: this.leftMargin,
                marginTop: this.topMargin,
                position: "absolute"
            }}><img src='fuelThief2.gif' alt='Fuel Thief' style={{
                height: fuelThiefHeight,
                width: fuelThiefWidth
            }}></img></div>

        );
    }


}
export default FuelThief;
