import React from 'react';
import autobind from 'autobind-decorator';
import {connect} from 'react-redux';
import {ChildImage} from '../components/ChildImage';
import {
    Button
} from 'react-bootstrap';
import {config} from '../../config/config';
import {deleteUserDataRecord, updateUserData} from '../actions/app_actions';

@connect(state => {
    return {
        imageData: state.imageData
    };
}, dispatch => {
    return {
        deleteChildImage: imageData => {
            dispatch(deleteUserDataRecord({
                imageData
            }));
        },
        updateChildImage: imageData => {
            dispatch(updateUserData({
                imageData
            }));
        }
    };
})
export class UploadImageContainer extends React.Component {
    componentDidMount() {
        if (window.cloudinary) {
            this.uploadWidget = cloudinary.createUploadWidget({
                ...config,
                maxImageWidth: `${config.defaultImageWidth}px`,
                maxImageHeight: `${config.defaultImageWidth}px`
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    // TODO handle errors
                } else {
                    switch (res.event) {
                        case 'success':
                            this.onUploadImageSuccess(res.info);
                            break;
                    }
                }
            });
        }
    }
    onUploadImageSuccess(imgInfo) {
        const {
            updateChildImage
        } = this.props;

        updateChildImage(imgInfo);
    }
    @autobind
    onUploadImageButtonClick() {
        if (this.uploadWidget) {
            this.uploadWidget.open();
        }
    }
    @autobind
    onImageDeleteButtonClick() {
        const {
            deleteChildImage,
            imageData
        } = this.props;

        if (imageData) {
            deleteChildImage(imageData);
        }
    }
    render() {
        const {
            imageData
        } = this.props;
        const imageDataUrl = imageData && (process.env.NODE_ENV === 'production' ? imageData.url : imageData.secure_url);

        return (
            <div className="upload-wrapper">
                <ChildImage
                    imageUrl={imageDataUrl}
                    imageOriginalWidth={imageData.width}
                    imageOriginalHeight={imageData.height}
                />
                <div className="upload-buttons">
                    <Button
                        onClick={this.onUploadImageButtonClick}
                    >
                        {imageData ? 'Change image' : 'Upload image'}
                    </Button>
                    <Button onClick={this.onImageDeleteButtonClick} disabled={!imageData}>Delete image</Button>
                </div>
            </div>
        );
    }
}