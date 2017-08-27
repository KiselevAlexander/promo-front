import React from 'react';
import Dropzone from 'react-dropzone';
import {readAsDataURL} from 'promise-file-reader';

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
            <table style={{width: '100%'}}>
                <tr>

                    <td style={{verticalAlign: 'top'}}>

                        <Dropzone
                            onDrop={this.onImagePick}
                            disabled={status === 'Pending'}
                        >
                            Выберите изображение или перетаците его сюда
                        </Dropzone>


                        {imageSrc &&
                        <button
                            onClick={this.nextStep}
                            disabled={status === 'Pending'}
                        >
                            Продолжить
                        </button>
                        }

                        {status &&
                        <div>Status: {status}</div>
                        }

                    </td>
                    <td style={{verticalAlign: 'top'}}>

                        {imageSrc &&
                            <img src={imageSrc} alt="" style={{maxWidth: '100%'}}/>
                        }

                    </td>
                </tr>
            </table>
        );
    }
}

export default ImagePicker;