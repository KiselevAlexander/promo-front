import React from 'react';
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
                    poster={`/images/${videoID}.jpg`}
                    onCanPlayThrough={() => {
                        // Do stuff
                    }}
                >
                    <source src={`/video/${videoID}.mp4`} type="video/mp4" />
                </Video>
            </div>
        );
    }
}

export default Player;