import React from 'react';
import classNames from 'classnames';
import {DefaultPlayer as Video} from 'react-html5video';

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
            currentPatternId: 0,
            patterns: PATTERNS
        };

    }

    patternClickHandler = (id) => {

        this.setState((state) => ({
            currentPatternId: this.state.patterns[id].id,
            pattens: state.patterns.map((item, key) => {
                item.active = (key === id);
                return item;
            })
        }));

    };

    doneClickHandler = () => {

        this.props.onChange(this.state.currentPatternId);

    };

    render() {

        const {patterns, currentPatternId} = this.state;

        return (
            <div className="patterns grid-2 tablet-2 phablet-1 phone-1 flex">
                <div className="col left-side relative">
                    <ul className="list relative">
                        {patterns.map((item, key) => (
                            <li
                                key={key}
                                className={classNames(`circle circle${key + 2}`, {active: item.active})}
                                style={{backgroundImage: `url('${item.image}')`}}
                                onClick={() => { this.patternClickHandler(key); }}
                            >
                            </li>
                        ))}
                        <li
                            className="circle circle9 phablet-hide"
                        />
                        <li
                            className="circle circle10 phablet-hide"
                        />
                        <li
                            className="circle circle11 phablet-hide"
                        />
                        <li
                            className="circle circle12 phablet-hide"
                        />
                    </ul>

                    <button
                        className="btn action"
                        onClick={this.doneClickHandler}
                        disabled={(currentPatternId === 0)}
                    >
                        {(currentPatternId === 0) ? 'Выберите стиль видео' : 'Продолжить'}
                    </button>

                </div>

                <div className="col right-side flex-middle-content">
                    <div className="videoHolder">
                        {currentPatternId === 0 &&
                            <img src="/static/img/pic011.jpg" alt="" />
                        }
                        {currentPatternId === 1 &&
                            <Video
                                autoPlay={true}
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
                                autoPlay={true}
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
                                autoPlay={true}
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

            </div>
        );
    }
}

export default Patterns;