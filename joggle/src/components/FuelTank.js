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
const fuelTankWidth = "25px";
const fuelTankHeight = "25px";

class FuelTank extends React.Component {
    constructor(props) {
        super(props);
        this.topMargin = parseInt(Math.random() * (parsePX(this.props.boxHeight) - 25)) + "px";
        this.leftMargin = parseInt(Math.random() * (parsePX(this.props.boxWidth) - 25)) + "px";
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.collision(),
            1000);
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    collision = () => {
        if (this.touching("fuelTank", "blackBox")) {
            //console.log("Fuel Tank touching test OK: ");
            this.fuelTankHit();
            this.topMargin = parseInt(Math.random() * (parsePX(this.props.boxHeight) - 25)) + "px";
            this.leftMargin = parseInt(Math.random() * (parsePX(this.props.boxWidth) - 25)) + "px";
        }
        else {
            //console.log("Fuel Tank not touching or failed touching test");
        }
    }

    touching = (element1, element2) => {
        const resElement1 = getElementAbsolutePos(element1);
        const resElement2 = getElementAbsolutePos(element2);
        //console.log("absolute position Element1 fuelTank left: " + resElement1.left + "top: " + resElement1.top);
        //console.log("absolute position Element2 bB right: " + resElement2.right + "bottom: " + resElement2.bottom);
        if ((resElement2.left <= resElement1.left && resElement1.left <= resElement2.right && resElement2.top <= resElement1.top && resElement1.top <= resElement2.bottom) ||
            (resElement2.left <= resElement1.left && resElement1.left <= resElement2.right && resElement2.top <= resElement1.bottom && resElement1.bottom <= resElement2.bottom) ||
            (resElement2.left <= resElement1.right && resElement1.right <= resElement2.right && resElement2.top <= resElement1.top && resElement1.top <= resElement2.bottom) ||
            (resElement2.left <= resElement1.right && resElement1.right <= resElement2.right && resElement2.top <= resElement1.bottom && resElement1.bottom <= resElement2.bottom)
        )
            return true;
        else return false;
    }

    fuelTankHit = () => this.props.onFuelTankHit();


    render() {
        return (
            <div id="fuelTank" style={{
                height: fuelTankHeight,
                width: fuelTankWidth,
                backgroundColor: "green",
                color: "white",
                fontSize: "8px",
                marginLeft: this.leftMargin,
                marginTop: this.topMargin,
                position: "absolute"
            }}><img src='favicon.ico' alt='Fuel Tank' style={{
                height: fuelTankHeight,
                width: fuelTankWidth
            }}></img></div>

        );
    }


}
export default FuelTank;