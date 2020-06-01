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
            <div id={"photo" + this.props.id} style={{ transitionDuration: "1s" }}>
                <button
                    className="clickyImage btn btn-secondary"
                    onClick={() => this.onClickImage(this.props.id)}  >
                    <Media
                        id={"image" + this.props.id}
                        className="clickyImage"
                        src={composers[this.props.id].image} />
                </button>
            </div >
        )
    }
}

export default Photo;