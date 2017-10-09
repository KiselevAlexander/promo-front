import React from 'react';
import classNames from 'classnames';
import {DefaultPlayer as Video} from 'react-html5video';

const PATTERNS = [
    {id: 1, image: '/static/img/patterns/pattern-1.jpg', text: 'Some description\nof video pattern'},
    {id: 2, image: '/static/img/patterns/pattern-2.jpg', text: 'Some description\nof video pattern'},
    {id: 3, image: '/static/img/patterns/pattern-3.jpg', text: 'Some description\nof video pattern'},
    {id: 4, image: '/static/img/patterns/pattern-4.jpg', text: 'Some description\nof video pattern'},
    {id: 5, image: '/static/img/patterns/pattern-5.jpg', text: 'Some description\nof video pattern'},
    {id: 1, image: '/static/img/patterns/pattern-6.jpg', text: 'Some description\nof video pattern'},
    {id: 2, image: '/static/img/patterns/pattern-7.jpg', text: 'Some description\nof video pattern'}
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
                                data-text={item.text}
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
                        >
                            <source src={'/patterns/pattern-1.mp4'} type="video/mp4" />
                        </Video>
                        }

                        {currentPatternId === 2 &&
                        <Video
                            autoPlay={true}
                            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        >
                            <source src={'/patterns/pattern-2.mp4'} type="video/mp4" />
                        </Video>
                        }
                        {currentPatternId === 3 &&
                            <Video
                                autoPlay={true}
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            >
                                <source src={'/patterns/pattern-3.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 4 &&
                            <Video
                                autoPlay={true}
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            >
                                <source src={'/patterns/pattern-4.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 5 &&
                            <Video
                                autoPlay={true}
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            >
                                <source src={'/patterns/pattern-5.mp4'} type="video/mp4" />
                            </Video>
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default Patterns;