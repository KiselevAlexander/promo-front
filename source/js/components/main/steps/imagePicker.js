import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import {readAsDataURL} from 'promise-file-reader';
import AvatarEditor from 'react-avatar-editor';
import Nouislider from 'react-nouislider';

var AvatarCropper = require("react-avatar-cropper");

import {Layer, Rect, Stage, Group, Text, Image} from 'react-konva';

class ImagePicker extends React.Component {

    static defaultProps = {
        onStepBackClick: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPatternId: 1,
            width: 100,
            height: 100,
            scale: 100,
            rotate: 0,

            text: 'Some text',
            image: null,
            iX: 0,
            iY: 0
        };

        this.timer = 0;

    }

    componentDidMount() {

        window.addEventListener('resize', this.resizeHandler);

        const imageCroper = $('.imageCroper');

        console.log(imageCroper.width());

        this.setState({
            width: imageCroper.width(),
            height: 1080 / (1920 / imageCroper.width())
        });


    }

    resizeHandler = () => {

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            console.log('resize');

            this.setState({
                width: $('.imageCroper').width() * 2,
                canvasHeight: 1080 / (1920 / $('.imageCroper').width()) * 2
            });

        }, 150);

    };

    patternClickHandler = (id) => {
        this.setState({
            currentPatternId: id
        });
    };


    onImagePick = (file) => {
        readAsDataURL(file[0])
            .then((imageData) => {

                const image = new window.Image();
                image.src = imageData;
                image.onload = () => {

                    const imageCroper = $('.imageCroper');

                    this.setState({
                        image,
                        imageSrc: imageData,
                        width: imageCroper.width() * 2,
                        height: image.height / (image.width / imageCroper.width()) * 2,
                        canvasHeight: 1080 / (1920 / $('.imageCroper').width()) * 2,
                        iX: 0,
                        iY: 0,
                        scale: 100
                    });


                };

            })
            .catch((err) => {
                console.error(err);
                alert('Ошибка чтения изображения. Попробуйте еще раз');
            });
    };

    nextStep = () => {

        const canvas = $('canvas')[0];

        const dataURL = canvas.toDataURL('image/jpeg');

        //const w = window.open(dataURL);

        this.props.onSelect(dataURL);

        // const canvas = this.editor.getImage();

        // console.log(canvas.toDataURL('image/jpeg'));
        // window.open(canvas.toDataURL('image/jpeg'), '_blank');

    };

    scaleChangeHandler = (e) => {
        console.log(e);

        this.setState((state) => ({
            scale: e[0],
            iX: 0,
            iY: 0
        }));

        console.log(this.image);
    };

    rotateLeft = () => {

        const rotate = this.state.rotate - 90;

        this.setState((state) => ({
            rotate: (Math.abs(rotate) === 360) ? 0 : rotate,
            width: state.height,
            height: state.width
        }));

    };

    rotateRight = () => {

        const rotate = this.state.rotate + 90;

        this.setState((state) => ({
            rotate: (Math.abs(rotate) === 360) ? 0 : rotate,
            iX: 0,
            iY: 0
        }));

    };

    setEditorRef = (editor) => { this.editor = editor };

    textChangeHandler = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    render() {

        const {image, imageSrc, status, width, height, canvasHeight, scale, rotate, text, iX, iY} = this.state;

        const iW = (image) ? image.width : 0;
        const iH = (image) ? image.height : 0;

        const _this = this;


        const calcHeight = width

        return (
            <div className="grid-2 tablet-1 phablet-1 phone-1 float">

                <div className="col">
                    <h3 className="mt-30">ЗАГРУЗИТЕ ВАШЕ ФОТО</h3>
                    <Dropzone
                        className="btn"
                        onDrop={this.onImagePick}
                        disabled={status === 'Pending'}
                    >
                        Загрузить фото
                    </Dropzone>

                    {status &&
                    <div>Status: {status}</div>
                    }
                </div>
                <div className="col right">
                    <div className="imageHolder">
                        {!image &&
                            <img src="/static/img/pic011.jpg" alt="" className="bordered" />
                        }
                        <div className={classNames('imageCroper', {'is-visible': (image)})}>
                            <div className="canvas" style={{height: canvasHeight / 2}}>

                                <Stage
                                    width={width}
                                    height={canvasHeight}
                                >
                                    <Layer
                                        reg={this.setEditorRef}
                                    >
                                        <Image
                                            ref={(elem) => { this.image = elem; }}
                                            image={image}
                                            scale={{x: scale * 0.01, y: scale * 0.01}}
                                            width={(iH < iW && iW < width) ? iW / (iH / height) : width}
                                            height={(iH > iW && iH > height) ? iH / (iW / width) : height}
                                            x={iX}
                                            y={iY}
                                            draggable
                                            dragBoundFunc={function(pos) {

                                                const cS = scale * 0.01;


                                                let _x = pos.x;
                                                let _y = pos.y;

                                                if (canvasHeight - (this.getHeight() * cS) < pos.y) {
                                                    _y = (pos.y < 0) ? pos.y : 0;
                                                } else {
                                                    _y = canvasHeight - (this.getHeight() * cS);
                                                }

                                                if (width - (this.getWidth() * cS) < pos.x) {
                                                    _x = (pos.x < 0) ? pos.x : 0;
                                                } else {
                                                    _x = width - (this.getWidth() * cS);
                                                }

                                                _this.setState({
                                                    iX: _x,
                                                    iY: _y
                                                });

                                                return {
                                                    x: _x,
                                                    y: _y
                                                };
                                            }}
                                        />

                                        <Text
                                            y={(canvasHeight / 100) * 80}
                                            x={50}
                                            fontSize="36"
                                            fill="#fff"
                                            text={text}
                                        />

                                    </Layer>
                                </Stage>
                            </div>

                            <Nouislider
                                range={{min: 100, max: 200}}
                                start={[scale]}
                                onChange={this.scaleChangeHandler}
                            />
                            {/*<button className="left" onClick={this.rotateLeft}>left</button>
                             <button className="right" onClick={this.rotateRight}>right</button>*/}
                        </div>
                    </div>



                </div>

                {image &&
                <div className="col imageSettings">

                    <h3 className="mt-30">НАПИШИТЕ ВАШУ МЕЧТУ</h3>
                    <input
                        type="text"
                        placeholder="Image text"
                        onChange={this.textChangeHandler}
                        value={text}
                    />
                    <button
                        className="btn"
                        onClick={this.props.onStepBackClick}
                    >Вернуться</button>
                    <button
                        className="btn ml-15"
                        onClick={this.nextStep}
                        disabled={status === 'Pending'}
                    >
                        Продолжить
                    </button>

                </div>
                }
            </div>
        );
    }
}

export default ImagePicker;