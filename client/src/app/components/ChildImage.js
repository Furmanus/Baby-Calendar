import React from 'react';
import PropTypes from 'prop-types';
import {config} from '../../config/config';
import {prepareImageUrl} from '../utility/image_helper';

export class ChildImage extends React.Component {
    static propTypes = {
        imageUrl: PropTypes.string
    };
    render() {
        let {
            imageUrl
        } = this.props;

        if (!imageUrl) {
            imageUrl = 'https://res.cloudinary.com/dhr0suijx/image/upload/v1548109066/No_image_available.svg';
        }

        return <img
            className="picture"
            src={prepareImageUrl(imageUrl)}
            alt="Failed to load image :("
            height={`${config.maxImageHeight}px`}
            width={`${config.maxImageWidth}px`}
        />;
    }
}