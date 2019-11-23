import React from 'react';
import {connect} from 'react-redux';
import {LoginForm} from './LoginForm';
import {LoginFormHeader} from '../components/LoginFormHeader';
import {
    Tabs,
    Tab,
} from 'react-bootstrap';
import {changeTab} from '../actions/login_actions';
import autobind from 'autobind-decorator';
import {LOGIN, REGISTER} from '../constants/login_constants';
import {RegisterForm} from './RegisterForm';

const mapTabIndexToTabName = {
    '1': LOGIN,
    '2': REGISTER
};

@connect(state => {
    return {
        activePage: state.activePage
    };
}, dispatch => {
    return {
        changeTab: tab => {
            dispatch(changeTab(tab));
        }
    };
})
export class LoginPage extends React.Component {
    @autobind
    onActiveTabChange(tabIndex) {
        const {
            changeTab
        } = this.props;

        changeTab(mapTabIndexToTabName[tabIndex.toString()]);
    }
    @autobind
    renderActiveTab() {
        const {
            activePage
        } = this.props;

        switch (activePage) {
            case LOGIN:
                return <LoginForm/>;
            case REGISTER:
                return <RegisterForm/>;
            default:
                throw new Error('Invalid tab');
        }
    }
    render() {
        return (
            <div className="form-wrapper">
                <LoginFormHeader/>
                <Tabs
                    className="tabs-wrapper"
                    defaultActiveKey={1}
                    id="login-tabs"
                    onSelect={this.onActiveTabChange}
                >
                    <Tab eventKey={1} title="Login">
                    </Tab>
                    <Tab eventKey={2} title="Register">
                    </Tab>
                </Tabs>
                {this.renderActiveTab()}
            </div>
        );
    }
}