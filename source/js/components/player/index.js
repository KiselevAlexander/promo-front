import React from 'react';
import {STATIC_URL} from 'consts';
import {DefaultPlayer as Video} from 'react-html5video';

class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        const {videoID} = this.props.params;

        return (
            <div id="player">
                <Video
                    autoPlay={false}
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster={`${STATIC_URL}/images/${videoID}.jpg`}
                    onCanPlayThrough={() => {
                        // Do stuff
                    }}
                >
                    <source src={`${STATIC_URL}/video/${videoID}.mp4`} type="video/mp4" />
                </Video>
            </div>
        );
    }
}

export default Player;