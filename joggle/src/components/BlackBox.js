import React, { Component } from 'react';

class BlackBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="blackBox" style={{
                height: "50px",
                width: "50px",
                backgroundColor: "black",
                color: "white",
                fontSize: "10px",
                transitionDuration: "2s",
                marginLeft: this.props.marginLeft,
                position: "absolute",
                marginTop: this.props.marginTop
            }}>Fuel: {this.props.fuel}%  Score: {this.props.score}  Level: {this.props.level}</div>

        )
    }
}

export default BlackBox;