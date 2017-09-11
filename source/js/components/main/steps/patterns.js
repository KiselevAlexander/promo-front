import React from 'react';
import { DefaultPlayer as Video } from 'react-html5video';

class Patterns extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPatternId: 0
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

        return (
            <div className="patterns grid-2 tablet-2 phablet-1 phone-1">
                <div className="col">
                    <ul className="list">
                        <li><button className="btn" onClick={() => { this.patternClickHandler(1); }}>Pattern 1</button></li>
                        <li><button className="btn" onClick={() => { this.patternClickHandler(2); }}>Pattern 2</button></li>
                        <li><button className="btn" onClick={() => { this.patternClickHandler(3); }}>Pattern 3</button></li>
                    </ul>

                    <button
                        className="btn"
                        onClick={this.doneClickHandler}
                        disabled={(currentPatternId === 0)}
                    >
                        {(currentPatternId === 0) ? 'Выберите стиль видео' : 'Продолжить'}
                    </button>
                </div>

                <div className="col videoHolder">
                    {currentPatternId === 0 &&
                        <img src="/static/img/pic011.jpg" alt="" />
                    }
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

            </div>
        );
    }
}

export default Patterns;