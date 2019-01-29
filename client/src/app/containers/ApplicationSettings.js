import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
import {
    DEFAULT_STYLE,
    NEUTRAL_GRAY,
    SKY_BLUE
} from '../constants/app_styles';
import {
    getApplicationStyleFromStorage,
    setApplicationStyle
} from '../../common/helpers/helpers';
import {setApplicationStyleInStorage} from '../../common/helpers/helpers';
/**
 * It remains in containers even if it isn't connected to redux store, because in future most likely it will
 */
export class ApplicationSettings extends React.Component {
    onFormSubmit(e) {
        e.preventDefault();
    }
    onApplicationStyleSelectChange(e) {
        const {
            value
        } = e.target;

        setApplicationStyleInStorage(value);
        setApplicationStyle();
    }
    render() {
        const styleKey = getApplicationStyleFromStorage() || DEFAULT_STYLE;

        return (
            <div className="application-settings-container">
                <form onSubmit={this.onFormSubmit}>
                    <FormGroup controlId="app-settings">
                        <ControlLabel>Select application style:</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="choose style"
                            onChange={this.onApplicationStyleSelectChange}
                            defaultValue={styleKey}
                        >
                            <option value={DEFAULT_STYLE}>Pink (default)</option>
                            <option value={SKY_BLUE}>Sky blue</option>
                            <option value={NEUTRAL_GRAY}>Neutral gray</option>
                        </FormControl>
                    </FormGroup>
                </form>
            </div>
        );
    }
}