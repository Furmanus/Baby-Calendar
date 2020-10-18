import React from 'react';
import PropTypes from 'prop-types';
import {prepareImageUrl} from '../utility/image_helper';

export class ChildImage extends React.Component {
    static propTypes = {
        imageUrl: PropTypes.string,
        imageOriginalWidth: PropTypes.number,
        imageOriginalHeight: PropTypes.number
    };
    static defaultProps = {
        imageOriginalWidth: 250,
        imageOriginalHeight: 250
    };
    render() {
        let {
            imageUrl,
            imageOriginalWidth,
            imageOriginalHeight
        } = this.props;

        if (!imageUrl) {
            imageUrl = 'https://res.cloudinary.com/dhr0suijx/image/upload/v1548109066/No_image_available.svg';
        }

        return <img
            className="picture"
            src={prepareImageUrl(imageUrl, imageOriginalWidth, imageOriginalHeight)}
            alt="Failed to load image :("
        />;
    }
}
