import React from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone'
import {readAsDataURL} from 'promise-file-reader';
import {Link} from 'react-router';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSrc : '',
            status: '',
            result: {}
        }
    }

    onImagePick = (file) => {
        console.log(file)
        readAsDataURL(file[0])
            .then(imageData => {
                this.setState({
                    imageSrc: imageData,
                    showCase: false
                });
            })
    }

    doCreateVideo = () => {
        this.setState({
            showCase: true
        });
    }

    render() {

        const {imageSrc, status, showCase, isVideoLayerVisible, currentTime} = this.state;

        return (
            <main>
                <table style={{width: '100%'}}>
                    <tr>
                        <td style={{verticalAlign: 'top'}}>

                            <Dropzone
                                onDrop={this.onImagePick}
                                disabled={status === 'Pending'}
                            >
                                Pick file please
                            </Dropzone>


                            {imageSrc &&
                            <button
                                onClick={this.doCreateVideo}
                                disabled={status === 'Pending'}
                            >
                                Create video
                            </button>
                            }
                        </td>
                        <td style={{verticalAlign: 'top'}}>

                            {(imageSrc && !showCase) &&
                                <img src={imageSrc} alt="" style={{maxWidth: '100%'}}/>
                            }
                            {showCase &&
                                <div className="case">

                                    <video ref={(elem) => { this.videoPlayer = elem; }}>
                                        <source  src="/static/video_patterns/3.mp4" type="video/mp4" />
                                    </video>

                                    <div
                                        className={classNames('layer', {
                                            'is-visible': isVideoLayerVisible
                                        })}
                                        style={{backgroundImage: `url('${imageSrc}')`}}
                                    />

                                    <button onClick={() => {

                                        this.videoPlayer.play();
                                        const interval = {
                                            start: 3,
                                            end: 10
                                        };
                                        const timer = setInterval(() => {

                                            console.dir(this.videoPlayer);

                                            this.setState({
                                                currentTime: this.videoPlayer.currentTime
                                            });

                                            if (this.videoPlayer.currentTime > interval.start && this.videoPlayer.currentTime < interval.end && !isVideoLayerVisible) {
                                                this.setState({
                                                    isVideoLayerVisible: true
                                                });
                                                console.log('show')
                                            } else {
                                                this.setState({
                                                    isVideoLayerVisible: false
                                                });
                                                console.log('hide')
                                            }

                                            // if (this.videoPlayer.currentTime > interval.end && isVideoLayerVisible) {
                                            //     this.setState({
                                            //         isVideoLayerVisible: false
                                            //     });
                                            //     console.log('hide')
                                            // }

                                            if (this.videoPlayer.currentTime >= this.videoPlayer.duration) {
                                                clearInterval(timer);
                                            }

                                        }, 500);
                                    }
                                    }>play</button>
                                    <div className="seek">{currentTime}</div>
                                </div>
                            }

                        </td>
                    </tr>
                </table>
            </main>
        );
    }

}

export default Editor