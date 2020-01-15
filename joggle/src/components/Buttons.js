import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import Keybinding from 'react-keybinding-component';


class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    modalsClosed = () => {
        return (!this.props.isOpenLeaderBoardModal && !this.props.isOpenRegisterModal && !this.props.isOpenNavBar);
    }

    // calls back to App.js whether, called from either buttons (phone) or keys (laptop)
    right = () => { if (this.modalsClosed()) this.props.onRight(); }
    left = () => { if (this.modalsClosed()) this.props.onLeft(); }
    up = () => { if (this.modalsClosed()) this.props.onUp(); }
    down = () => { if (this.modalsClosed()) this.props.onDown(); }

    handleArrowKeys = (keyCode) => {
        const rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40;
        switch (keyCode) {
            case rightArrow: { this.right(); break; }
            case leftArrow: { this.left(); break; }  // left 37
            case upArrow: { this.up(); break; }      // up 38
            case downArrow: { this.down(); break; } // down 40
            default: break;
        }
    }


    render() {
        return (
            <div id="buttons" style={{
                width: "250px",
                position: "absolute",
                marginTop: this.props.marginTop,
                transitionDuration: "1s",
                tableIndex: "0"             // required for Keybinding to work just on the div id=buttons
            }}>
                <Keybinding onKey={(e) => { this.handleArrowKeys(e.keyCode) }} />
                <Button
                    type="button"
                    onClick={this.right}
                >Right</Button>
                <Button
                    type="button"
                    onClick={this.left}
                >Left</Button>
                <Button
                    type="button"
                    onClick={this.up}
                >Up</Button>
                <Button
                    type="button"
                    onClick={this.down}
                >Down</Button>
            </div >
        )

    }
}

export default Buttons;