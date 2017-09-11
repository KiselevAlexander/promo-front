import React from 'react';
import Dropzone from 'react-dropzone';
import {readAsDataURL} from 'promise-file-reader';
import AvatarEditor from 'react-avatar-editor';

class ImagePicker extends React.Component {
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
    }


    onImagePick = (file) => {
        readAsDataURL(file[0])
            .then((imageData) => {

                this.setState({
                    imageSrc: imageData
                });


            })
            .catch((err) => {
                console.error(err);
                alert('Ошибка чтения изображения. Попробуйте еще раз');
            });
    };

    nextStep = () => {

        this.props.onSelect(this.state.imageSrc);

    };

    render() {

        const {imageSrc, status} = this.state;

        return (
            <div className="grid-2">
                <div className="col">
                    <Dropzone
                        onDrop={this.onImagePick}
                        disabled={status === 'Pending'}
                    >
                        Выберите изображение или перетаците его сюда
                    </Dropzone>


                    {imageSrc &&
                    <button
                        className="btn"
                        onClick={this.nextStep}
                        disabled={status === 'Pending'}
                    >
                        Продолжить
                    </button>
                    }

                    {status &&
                    <div>Status: {status}</div>
                    }
                </div>
                <div className="col">

                    {imageSrc &&
                        <AvatarEditor
                            image={imageSrc}
                            width={250}
                            height={250}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={1.2}
                            rotate={0}
                        />
                    }

                </div>
            </div>
        );
    }
}

export default ImagePicker;