import React from 'react';

export class InfoContentItem extends React.Component {
    render() {
        const {
            propName,
            propValue,
            icon
        } = this.props;

        return (
            <div className="info-item">
                {icon ? icon : null}<span>{propName}: <strong>{propValue}</strong></span>
            </div>
        );
    }
}