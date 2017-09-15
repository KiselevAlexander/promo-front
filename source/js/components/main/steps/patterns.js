import React from 'react';
import { DefaultPlayer as Video } from 'react-html5video';

const PATTERNS = [
    {id: 1, image: '/static/img/photo001.jpg'},
    {id: 2, image: '/static/img/photo001.jpg'},
    {id: 3, image: '/static/img/photo001.jpg'},
    {id: 1, image: '/static/img/photo001.jpg'},
    {id: 2, image: '/static/img/photo001.jpg'},
    {id: 3, image: '/static/img/photo001.jpg'},
    {id: 1, image: '/static/img/photo001.jpg'}
];

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
                        {PATTERNS.map((item, key) => (
                            <li
                                key={key}
                                className={`circle circle${key + 2}`}
                                style={{backgroundImage: `url('${item.image}')`}}
                                onClick={() => { this.patternClickHandler(item.id); }}
                            >
                            </li>
                        ))}
                        <li
                            className="circle circle9"
                        />
                        <li
                            className="circle circle10"
                        />
                        <li
                            className="circle circle11"
                        />
                        <li
                            className="circle circle12"
                        />
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