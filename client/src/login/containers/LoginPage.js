import React from 'react';
import {LoginForm} from './LoginForm';
import {LoginFormHeader} from '../components/LoginFormHeader';

export class LoginPage extends React.Component {
    render() {
        return (
            <div className="form-wrapper center">
                <LoginFormHeader/>
                <LoginForm/>
            </div>
        );
    }
}