import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import {readAsDataURL} from 'promise-file-reader';
import Slider from 'rc-slider';
import AvatarEditor from 'react-avatar-editor';
import wordwrap from 'word-wrapper';

const getDevicePixelRatio = function () {
    let ratio = 1;
    // To account for zoom, change to use deviceXDPI instead of systemXDPI
    if (
        window.screen.systemXDPI !== undefined
        && window.screen.logicalXDPI !== undefined
        && window.screen.systemXDPI > window.screen.logicalXDPI
    ) {
        // Only allow for values > 1
        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
    }
    else if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
};

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
            scale: 1,
            rotate: 0,
            text: '',
            error: ''
        };

        this.timer = 0;
        this.fontSize = 36;
        this.lastTouchY = 0;
    }

    componentDidMount() {


        const imageCroper = $('.imageCroper');

        setTimeout(() => {
            this.setState({
                width: imageCroper.width() * 2,
                height: (1080 / (1920 / imageCroper.width())) * 2
            });
        }, 100);

        $('body').css({
            height: '100vh',
            width: '100vw',
            overflow: 'auto'
        });

        window.addEventListener('resize', this.resizeHandler);
        document.addEventListener('touchmove', this.touchmoveHandler, {passive: false});


        this.baseImage = new Image();
        this.baseImage.src = '/static/img/text_overlay.png';

    }

    touchmoveHandler = (e) => {

        if (e.target.nodeName === 'CANVAS') {

            e.preventDefault();
            return;
        }

    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
        document.removeEventListener('touchmove', this.touchmoveHandler, {passive: false});
    }

    resizeHandler = () => {

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            const imageCroper = $('.canvas');

            const {rotate} = this.state;

            const cWidth = (Math.abs(rotate) === 0 || Math.abs(rotate) === 180)
                ? imageCroper.width() * 2
                : (1080 / (1920 / imageCroper.width())) * 2;
            const cHeight = (Math.abs(rotate) === 0 || Math.abs(rotate) === 180)
                ? (1080 / (1920 / imageCroper.width())) * 2
                : imageCroper.width() * 2;

            this.setState({
                width: cWidth,
                height: cHeight
            }, this.addText);

        }, 50);

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

                    this.setState({
                        imageSrc: imageData,
                        scale: 1
                    }, () => {

                        setTimeout(() => {
                            this.addText();
                        }, 10);

                    });


                };

            })
            .catch((err) => {
                console.error(err);
                alert('Ошибка чтения изображения. Попробуйте еще раз');
            });
    };

    nextStep = () => {
        const {text} = this.state;

        if (!text) {
            this.setState({
                error: 'Пожалуйста укажите текст'
            }, () => {

                setTimeout(() => {
                    this.addText();
                }, 10);

            });

            return;
        }

        const canvas = $('canvas')[0];
        const dataURL = canvas.toDataURL('image/jpeg');

        this.props.onSelect(dataURL);
        // window.open(dataURL, '_blank');

    };

    scaleChangeHandler = (e) => {
        this.setState((state) => ({
            scale: e * 0.01
        }), this.setStateAddText);

    };

    rotateRight = () => {

        const rotate = this.state.rotate + 90;

        this.setState((state) => ({
            rotate: (Math.abs(rotate) === 360) ? 0 : rotate,
            width: state.height,
            height: state.width
        }), this.setStateAddText);

    };

    setEditorRef = (editor) => { this.editor = editor; };

    textChangeHandler = (event) => {

        const {value} = event.target;

        if (value.length < 70) {
            this.setState({
                text: value,
                error: ''
            }, this.addText);
        }

    };

    getLines = (context, text, maxWidth) => {
        const lines = text.split('\n');
        const fittingLines = [];
        for (let i = 0; i < lines.length; i++) {
            if (context.measureText(lines[i]).width <= maxWidth) {
                fittingLines.push(lines[i]);
            } else {
                let tmp = lines[i];
                while (context.measureText(tmp).width > maxWidth) {
                    tmp = tmp.slice(0, tmp.length - 1);
                }
                if (tmp.length >= 1) {
                    const regex = new RegExp('.{1,' + tmp.length + '}', 'g');
                    const thisLineSplitted = lines[i].match(regex);
                    for (let j = 0; j < thisLineSplitted.length; j++) {
                        fittingLines.push(thisLineSplitted[j]);
                    }
                }
            }
        }
        return fittingLines;
    };

    setStateAddText = () => {

        setTimeout(() => {
            this.addText();
        }, 10);

    };

    addText = () => {

        const {text, rotate, height, width} = this.state;
        const {canvas} = this.editor;

        const context = canvas.getContext('2d');

        let cWidth = (Math.abs(rotate) === 0 || Math.abs(rotate) === 180) ? width : height;
        let cHeight = (Math.abs(rotate) === 0 || Math.abs(rotate) === 180) ? height : width;

        const isMobile = ($(window).width() < 1024);


        const cnvSize = {
            w: cWidth * getDevicePixelRatio(),
            h: cHeight * getDevicePixelRatio()
        };



        context.drawImage(this.baseImage, 0, 0, cnvSize.w, cnvSize.h);

        const cText = (!text) ? 'Текст\nвашей\nмечты' : text;
        const fz = (isMobile) ? this.fontSize * (getDevicePixelRatio() / 1.4) : this.fontSize * getDevicePixelRatio();

        context.font = `bold ${fz}px Verdana`;
        context.fillStyle = 'white';

        const y = cnvSize.h / 100 * 60;

        const x = cnvSize.w / 100 * 70;

        const lineheight = fz * 1.2;

        // const lines = this.getLines(context, cText, (cnvSize.w / 100 * 29.7));
        //
        // for (let i = 0; i < lines.length; i++) {
        //     context.fillText(lines[i], x, ((y + (i * lineheight)) - ((lines.length * lineheight) / 2)));
        // }

        const font = `bold ${fz}px Verdana`

        const measure = createMetrics(context, font);

        function createMetrics(context, font) {
            context.font = font;
            const charWidth = context.measureText('M').width;

            return function measure(text, start, end, width) {

                const availableGlyphs = Math.floor(width / charWidth);
                const totalGlyphs = Math.floor((end - start) * charWidth);
                const glyphs = Math.min(end - start, availableGlyphs, totalGlyphs);
                return {
                    start,
                    end: start + glyphs
                };
            };
        }

        let lines = wordwrap(cText, {measure, width: (cnvSize.w - x) + 100 });
        lines = lines.split('\n');

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], x, ((y + (i * lineheight)) - ((lines.length * lineheight) / 2)));
        }
    };


    render() {

        const {imageSrc, status, width, height, scale, rotate, text, error} = this.state;

        const canvasWrapperHeight = ((Math.abs(rotate) === 0 || Math.abs(rotate) === 180) ? height : width) / 2;

        return (
            <div className="grid-2 tablet-1 phablet-1 phone-1 float pb-20">

                <div className="col">
                    <h3 className="mt-30">ЗАГРУЗИТЕ ВАШЕ ФОТО</h3>
                    <Dropzone
                        className="btn js-dropzone"
                        onDrop={this.onImagePick}
                        disabled={status === 'Pending'}
                        accept="image/*"
                    >
                        {(!imageSrc) ? 'Загрузить фото' : 'Загрузить другое фото'}
                    </Dropzone>

                    {status &&
                    <div>Status: {status}</div>
                    }
                </div>
                <div className="col right">
                    <div className="imageHolder">
                        {!imageSrc &&
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    $('.js-dropzone').click();
                                }}
                            >
                                <img src="/static/img/image_picker.jpg" alt="" className="bordered" />
                            </div>
                        }
                        <div className={classNames('imageCroper', {'is-visible': (imageSrc)})}>
                            <div className="canvas" style={{height: canvasWrapperHeight}} onTouchMove={(e) => {e.preventDefault(); e.stopPropagation();}}>
                                <AvatarEditor
                                    ref={this.setEditorRef}
                                    image={imageSrc}
                                    width={width}
                                    height={height}
                                    border={0}
                                    scale={scale}
                                    rotate={rotate}
                                    onMouseUp={this.addText}
                                    onPositionChange={() => {
                                        this.addText();
                                    }}
                                />
                                <button className="rotateRight" onClick={this.rotateRight} />
                            </div>

                            <div className="scale mt-20">
                                <label htmlFor="scale">Размер изображения:</label>
                                <Slider
                                    id="scale"
                                    min={100}
                                    max={200}
                                    onChange={this.scaleChangeHandler}
                                    value={scale * 100}
                                />
                            </div>

                        </div>
                    </div>

                </div>

                {imageSrc &&
                    <div className="col imageSettings">

                        <h3 className="mt-30">НАПИШИТЕ ВАШУ МЕЧТУ</h3>
                        <div className={classNames('inputCover', {'is-error': error})}>
                            <textarea
                                type="text"
                                placeholder="Текст вашей мечты"
                                onChange={this.textChangeHandler}
                                value={text}
                                // onFocus={() => {
                                //     setTimeout(() => {
                                //         $('body').animate({
                                //             scrollTop: $('.imageHolder').offset().top
                                //         }, 300);
                                //     }, 300);
                                // }}
                            />
                            <div className="error">{error}</div>
                        </div>
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