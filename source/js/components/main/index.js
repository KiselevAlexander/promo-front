import React from 'react';
import {request} from 'managers/request';
import {API_BASE_URL} from 'consts';
import Patterns from './steps/patterns';
import ImagePicker from './steps/imagePicker';
import Progress from './steps/progess';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            image: '',
            status: '',
            result: {},
            percent: null,
            sessionLinkID: null,
            pattern: 1
        };
    }

    componentDidMount() {
        this.getProggressStatus();
    }

    doCreateVideo = () => {

        this.setState({
            status: 'Pending'
        });

        const {pattern} = this.state;

        const getSessionParams = {
            name: 'User',
            image: this.state.image
        };

        request.post(API_BASE_URL + '/createsession', getSessionParams)
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                localStorage.setItem('vid', data.session);

                this.setState({
                    status: 'Generating video: ' + data.session
                });

                return data.session;

            })
            .then((session) => request.put(API_BASE_URL + '/start', {session, pattern}))
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                this.getProggressStatus(data.session);

            })
            .catch((error) => {

                console.error(error);

                this.setState({
                    status: 'Error crating video'
                });

            });

    };

    getProggressStatus = (session) => {

        request.post(API_BASE_URL + '/getstatus', {session})
            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                this.setState((state) => ({
                    percent: data.perc
                }));

                switch (data.status) {
                    case 2:
                        setTimeout(() => {
                            this.getProggressStatus(session);
                        }, 500);
                        break;
                    case 3:

                        this.setState({
                            sessionLinkID: session
                        });

                        break;
                    default:
                        alert('Error');
                        break;
                }

            })
            .catch((error) => {

                this.setState({
                    status: 'Error crating video'
                });

            });
    };

    onImageSelect = (image) => {
        // TODO: сделать шаг обработки изображения

        console.log(image);

        this.setState({
            step: 2,
            image
        }, () => {
            this.doCreateVideo();
        });

    };

    stepBackClickHandler = () => {
        this.setState((state, props) => ({
            step: state.step - 1
        }));
    };

    render() {

        const {step, percent, sessionLinkID} = this.state;

        return (
            <main>
                {step === 0 &&
                    <Patterns
                        onChange={(patternID) => {
                            this.setState({
                                step: 1,
                                pattern: patternID
                            });
                        }}
                    />
                }

                {step === 1 &&
                    <ImagePicker
                        onSelect={this.onImageSelect}
                        onStepBackClick={this.stepBackClickHandler}
                    />
                }

                {step === 2 &&
                    <Progress
                        percent={percent}
                        session={sessionLinkID}
                    />
                }
            </main>
        );
    }
}

export default Main;