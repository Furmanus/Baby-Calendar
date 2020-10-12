import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, InputAdornment} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

export class PasswordVisibilityAdornment extends React.Component {

    static propTypes = {
        isVisible: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        isVisible: false,
        onClick: () => {},
    };

    render() {
        const {
            isVisible,
            onClick,
        } = this.props;

        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={onClick}
                >
                    {isVisible ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            </InputAdornment>
        );
    }
}
