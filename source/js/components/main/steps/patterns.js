import React from 'react';
import classNames from 'classnames';
import {DefaultPlayer as Video} from 'react-html5video';

const PATTERNS = [
    {id: 7, image: '/static/img/patterns/pattern-5.jpg', text: 'Любимая работа'},
    {id: 6, image: '/static/img/patterns/pattern-6.jpg', text: 'Не бояться стареть'},
    {id: 5, image: '/static/img/patterns/pattern-7.jpg', text: 'Стать капитаном'},
    {id: 4, image: '/static/img/patterns/pattern-4.jpg', text: 'Стать путешественником'},
    {id: 3, image: '/static/img/patterns/pattern-2.jpg', text: 'Идеальная мать'},
    {id: 2, image: '/static/img/patterns/pattern-3.jpg', text: 'Покупка квартиры'},
    {id: 1, image: '/static/img/patterns/pattern-1.jpg', text: 'Семья и бизнес', active: true}
];

class Patterns extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPatternId: 1,
            patterns: PATTERNS,
            defaultVideoChanged: false
        };

    }

    patternClickHandler = (id) => {

        this.setState((state) => ({
            currentPatternId: this.state.patterns[id].id,
            pattens: state.patterns.map((item, key) => {
                item.active = (key === id);
                return item;
            }),
            defaultVideoChanged: true
        }));

    };

    doneClickHandler = () => {

        this.props.onChange(this.state.currentPatternId);

    };

    setInitVolume = ({target}) => {
        target.volume = 0.25;
    };

    render() {

        const {patterns, currentPatternId, defaultVideoChanged} = this.state;

        const videoProps = {
            autoPlay: true,
            controls: ['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen'],
            onCanPlay: this.setInitVolume
        };

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
                        <Video {...videoProps} autoPlay={defaultVideoChanged}>
                            <source src={'/static/patterns/pattern-1.mp4'} type="video/mp4" />
                        </Video>
                        }

                        {currentPatternId === 2 &&
                        <Video {...videoProps}>
                            <source src={'/static/patterns/pattern-2.mp4'} type="video/mp4" />
                        </Video>
                        }
                        {currentPatternId === 3 &&
                            <Video {...videoProps}>
                                <source src={'/static/patterns/pattern-3.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 4 &&
                            <Video {...videoProps}>
                                <source src={'/static/patterns/pattern-4.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 5 &&
                            <Video {...videoProps}>
                                <source src={'/static/patterns/pattern-5.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 6 &&
                            <Video {...videoProps}>
                                <source src={'/static/patterns/pattern-6.mp4'} type="video/mp4" />
                            </Video>
                        }
                        {currentPatternId === 7 &&
                            <Video {...videoProps}>
                                <source src={'/static/patterns/pattern-7.mp4'} type="video/mp4" />
                            </Video>
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default Patterns;