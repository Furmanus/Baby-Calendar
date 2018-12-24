import React from 'react'
import {
    FiFolder
} from 'react-icons/fi';

export class EmptyData extends React.Component {
    render() {
        return (
            <div className="emptydata-wrapper">
                <FiFolder size={48}/>
                <span>Looks like there's nothing here...</span>
            </div>
        );
    }
}