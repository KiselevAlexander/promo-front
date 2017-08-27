import React from 'react';
import { DefaultPlayer as Video } from 'react-html5video';

class Patterns extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPatternId: 1
        };

    }

    patternClickHandler = (id) => {

        this.setState({
            currentPatternId: id
        });

    };

    doneClickHandler = () => {

        this.props.onChange(this.state.currentPatternId);

    };

    render() {

        const {currentPatternId} = this.state;

        console.log(currentPatternId)

        return (
            <div className="patterns">
                ptterns
                <ul className="list">
                    <li><button onClick={() => { this.patternClickHandler(1); }}>Pattern 1</button></li>
                    <li><button onClick={() => { this.patternClickHandler(2); }}>Pattern 2</button></li>
                    <li><button onClick={() => { this.patternClickHandler(3); }}>Pattern 3</button></li>
                </ul>

                <button onClick={this.doneClickHandler}>Продолжить</button>

                {currentPatternId === 1 &&
                    <Video
                        autoPlay={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        // poster={`/public/images/${currentPatternId}.jpg`}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}
                    >
                        <source src={`/patterns/pattern-1.mp4`} type="video/mp4"/>
                    </Video>
                }

                {currentPatternId === 2 &&
                    <Video
                        autoPlay={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        // poster={`/public/images/${currentPatternId}.jpg`}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}
                    >
                        <source src={`/patterns/pattern-2.mp4`} type="video/mp4"/>
                    </Video>
                }
                {currentPatternId === 3 &&
                    <Video
                        autoPlay={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        // poster={`/public/images/${currentPatternId}.jpg`}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}
                    >
                        <source src={`/patterns/pattern-3.mp4`} type="video/mp4"/>
                    </Video>
                }

            </div>
        );
    }
}

export default Patterns;