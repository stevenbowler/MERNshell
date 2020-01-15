import React from 'react'

class Box extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="box" style={{
                float: "bottom",
                overflow: "hidden",
                height: this.props.height,
                width: this.props.width,
                backgroundColor: this.props.backgroundColor,
                fontSize: this.props.fontSize,
                transitionDuration: "1s",
                position: "absolute"

            }}></div >
        )
    }
}

export default Box;