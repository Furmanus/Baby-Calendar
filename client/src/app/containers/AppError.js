import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import {
    Alert,
    Button
} from 'react-bootstrap';
import {hideError} from '../actions/app_actions';

@connect(state => {
    return {
        error: state.error
    };
}, dispatch => {
    return {
        hideError: () => {
            dispatch(hideError());
        }
    };
})
export class AppError extends React.Component {
    componentDidMount() {
        document.getElementById('app').classList.add('disabled');
    }
    componentWillUnmount() {
        document.getElementById('app').classList.remove('disabled');
    }
    @autobind
    handleDismiss() {
        const {
            hideError
        } = this.props;

        hideError();
    }
    render() {
        const errorCode = this.props.error && this.props.error.code || 500;
        const errorMessage = this.props.error && this.props.error.message || 'Internal server error';

        return ReactDOM.createPortal(
            <Alert bsStyle="danger" className="application-alert" onDismiss={this.handleDismiss}>
                <h4>Error!</h4>
                <p>Error code: {errorCode}</p>
                <p>Error Message: {errorMessage}</p>
                <Button onClick={this.handleDismiss}>OK</Button>
            </Alert>,
            document.body
        );
    }
}
