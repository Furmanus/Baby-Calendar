import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    Button
} from 'react-bootstrap';

export class AppConfirmModal extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        bodyRenderer: PropTypes.func,
        visible: PropTypes.bool,
        confirmEnabled: PropTypes.bool,
        onCancel: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired
    };
    static defaultProps = {
        visible: false,
        title: 'Confirm',
        bodyRenderer: () => {
            return <div/>;
        },
        confirmEnabled: true
    };
    render() {
        const {
            title,
            bodyRenderer,
            visible,
            onCancel,
            onConfirm,
            confirmEnabled
        } = this.props;

        return (
            <Modal
                className="modal"
                show={visible}
                keyboard={true}
                onHide={onCancel}
                onEnter={this.onShow}
            >
                <ModalHeader closeButton>
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {bodyRenderer()}
                </ModalBody>
                <ModalFooter>
                    <div>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button disabled={!confirmEnabled} onClick={onConfirm}>Confirm</Button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}