import React from 'react'
import {
    FiFolder
} from 'react-icons/fi';

const COMPONENT_TEXT = 'Looks like there\'s nothing here...';

export class EmptyData extends React.Component {
    render() {
        return (
            <div className="emptydata-wrapper">
                <FiFolder size={48}/>
                <span>{COMPONENT_TEXT}</span>
            </div>
        );
    }
}
