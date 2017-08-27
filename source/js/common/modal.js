import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


/**
 * Modal window
 * @param {bool} open - open/close modal
 * @param {bool} showBack - show back button
 * @param {bool} hideClose - hide close button
 * @param {bool} small - set small width
 * @param {string} title - window header title
 * @param {string} className - additional class name
 * @param {func} onBack - additional class name
 */

class Modal extends React.Component {


    static defaultProps = {
        onClose: () => {},
        onToggle: () => {},
        onBack: () => {},
        small: false
    };

    static propsTypes = {
        onClose: PropTypes.func,
        onBack: PropTypes.func,
        onToggle: PropTypes.func,
        small: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.open !== this.state.open) {
            this.setState({
                open: newProps.open
            }, () => {
                this.props.onToggle(newProps.open);
            });
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyPressHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyPressHandler);
    }

    keyPressHandler = (e) => {
        if (e.keyCode === 27) {
            this.close(e);
        }
    };

    close = (e) => {
        e.preventDefault();
        const {hideClose} = this.props;

        if (!hideClose) {
            this.state.open && this.setState({
                open: false
            }, () => {
                this.props.onClose();
            });
        }
    };

    render() {
        const {open} = this.state;
        const {title, showBack, onBack, className, headerClassName, contentClassName, small, hideClose} = this.props;

        return (
            <div className={classNames('custom-modal', className, {'is-visible': open, 'custom-modal-small': small})}>
                <div className={classNames('custom-modal-content', contentClassName)}>
                    {!hideClose && <button type="button" className="custom-modal-close" onClick={this.close}>&times;</button>}
                    {title &&
                        <div className={classNames('custom-modal-header', headerClassName)}>
                            {showBack && <button type="button" className="custom-modal-back" onClick={onBack} />}
                            {title}
                        </div>
                    }
                    <div className="custom-modal-body">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Modal;