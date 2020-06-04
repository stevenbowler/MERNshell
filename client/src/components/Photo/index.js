//@ts-check
/**@module */
import React from 'react';
import {
    Media,
    // Button
} from 'reactstrap';
import './Photo.css';
import composers from '../Box/Photos.json';


class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.mediaClicked = [];
    }

    onClickImage = (composerId) => {
        this.props.onChoosePhoto(composerId);
    }

    render() {
        return (
            <div>
                <span
                    id={"photo" + this.props.id}
                    style={{ transitionDuration: "1s" }}>
                    <button
                        id={"button" + this.props.id}
                        className="clickyImage btn btn-secondary"
                        style={{
                            padding: "10px",
                            transitionDuration: "1s",
                            top: this.props.top,
                            left: this.props.left
                            // background: composers[this.props.id].image  // looking for better alternative to border button
                        }}
                        onClick={() => this.onClickImage(this.props.id)}  >
                        <Media
                            id={"image" + this.props.id}
                            className="clickyImage"
                            src={composers[this.props.id].image} />
                    </button>
                </span >
            </div>
        )
    }
}

export default Photo;