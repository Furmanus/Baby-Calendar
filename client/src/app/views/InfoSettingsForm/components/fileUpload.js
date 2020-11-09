import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {PhotoCamera, CancelOutlined} from '@material-ui/icons';
import {infoSettingsTranslations} from '../constants/infoSettingsTranslations';
import {getFileContentAsDataUrl} from '../utils/utils';

const useStyles = makeStyles(() => ({
    wrapper: {
        width: '100%',
        margin: '16px auto 8px auto',
    },
    container: {
        position: 'relative',
        padding: '0 8px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'border-color 0.3s ease-in-out',
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 1)',
        },
    },
    containerError: {
        borderColor: '#f44336',
        '&:hover': {
            borderColor: '#f44336',
        },
    },
    disabled: {
        color: 'rgba(0, 0, 0, 0.38)',
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
        },

    },
    imageContainer: {
        border: '1px dashed black',
        width: '102px',
        height: '102px',
        margin: '15px auto',
    },
    input: {
        display: 'none !important',
    },
    legend: {
        width: 'auto',
        height: '11px',
        display: 'block',
        fontSize: '12px',
        textAlign: 'left',
        padding: 0,
        visibility: 'hidden',
        '& > span': {
            paddingLeft: '5px',
            paddingRight: '5px',
        },
    },
    label: {
        fontSize: '12px',
        fontWeight: 400,
        pointerEvents: 'none',
        letterSpacing: '0.00938em',
        lineHeight: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(12px, -2px)',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    labelError: {
        color: '#f44336',
    },
    uploadIcon: {
        marginLeft: '8px',
    },
    uploadButton: {
        paddingRight: '8px',
        marginBottom: '15px',
    },
    imageElement: {
        width: '100px',
        height: '100px',
        maxWidth: 0,
        maxHeight: 0,
        objectFit: 'cover',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
    },
    imageElementVisible: {
        maxWidth: '100px',
        maxHeight: '100px',
    },
    imageDisabled: {
        opacity: 0.38,
    },
    hint: {
        fontSize: '10px',
        marginLeft: 0,
        minHeight: '16px',
        transition: 'color 0.3s ease-in-out',
        marginTop: '3px',
        color: 'rgba(0, 0, 0, 0.54)',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        fontWeight: 400,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    hintError: {
        color: '#f44336',
    },
    cancelIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        '&:hover': {
            color: 'rgba(0, 0, 0, 1)'
        },
    },
}));

export function FileUpload(props) {
    const classes = useStyles();
    const [displayPreview, setDisplayPreview] = useState(null);
    const [isImageVisible, changeImageVisibility] = useState(false);
    const imageElementClasses = `${classes.imageElement} ${isImageVisible ? classes.imageElementVisible : ''}`;
    const imageRef = useRef(null);
    const inputRef = useRef(null);
    const {
        previewUrl,
        onChange,
        id,
        name,
        hint,
        disabled,
        hasError,
    } = props;
    const onImageLoad = () => {
        changeImageVisibility(true);
    };
    const onImageError = () => {
        changeImageVisibility(false);
    };
    const onImageChange = async (e) => {
        const {
            files,
        } = e.target;

        changeImageVisibility(false);

        if (files.length) {
            const file = files[0];

            onChange(file);

            try {
                const preview = await getFileContentAsDataUrl(file);

                setDisplayPreview(preview);
            } catch (e) {
                changeImageVisibility(false);
                setDisplayPreview(null);
            }
        }
    };
    const onCancelClick = () => {
        onChange(null);
        setDisplayPreview(null);
        inputRef.current.value = '';
    };

    useEffect(() => {
        if (previewUrl) {
            setDisplayPreview(previewUrl);
        }
    }, []);
    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.src = displayPreview;
        }
    }, [displayPreview]);

    return (
        <div className={classes.wrapper}>
            <fieldset className={`${classes.container} ${disabled ? classes.disabled : ''} ${hasError ? classes.containerError : ''}`}>
                <IconButton className={classes.cancelIcon} aria-label="delete" onClick={onCancelClick} disabled={disabled}>
                    <CancelOutlined fontSize="large"/>
                </IconButton>
                <legend className={classes.legend}>
                    <span>{infoSettingsTranslations.en.UploadLabel}</span>
                </legend>
                <label className={`${classes.label} ${hasError ? classes.labelError : ''}`} htmlFor={id}>
                    {infoSettingsTranslations.en.UploadLabel}
                </label>
                <div className={classes.imageContainer}>
                    {
                        displayPreview && <img
                            onLoad={onImageLoad}
                            onError={onImageError}
                            className={`${imageElementClasses} ${disabled ? classes.imageDisabled : ''}`}
                            src={displayPreview}
                            ref={imageRef}
                            alt="Child image"
                        />
                    }
                </div>
                <div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id={id}
                        name={name}
                        ref={inputRef}
                        type="file"
                        onChange={onImageChange}
                        disabled={disabled}
                    />
                    <label htmlFor={id}>
                        <Button variant="contained" color="primary" component="span" className={classes.uploadButton} disabled={disabled}>
                            {infoSettingsTranslations.en.UploadButton}
                            <PhotoCamera className={classes.uploadIcon}/>
                        </Button>
                    </label>
                </div>
            </fieldset>
            {
                hint && <p className={`${classes.hint} ${hasError ? classes.hintError : ''}`}>{hint}</p>
            }
        </div>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    hint: PropTypes.string,
    hasError: PropTypes.bool,
    previewUrl: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};
