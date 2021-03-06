import React from 'react';
import PropTypes from 'prop-types';
import {TextField, Paper, withStyles, Typography, Button, CircularProgress} from '@material-ui/core';
import {commonInputProps, helperProps, labelProps} from '../../../../common/helpers/form';
import {FileUpload} from '../components/fileUpload';
import {infoSettingsTranslations} from '../constants/infoSettingsTranslations';
import {replaceTextVariables} from '../../../../common/helpers/text';
import {validateInfoSettingsBirthDate, validateInfoSettingsChildImage, validateInfoSettingsChildName} from '../helpers/validators';
import {INFO_SETTINGS_FORM_NAME} from '../constants/form';
import {setChildDataApi} from '../../../../api/api';
import {redirectPath} from '../../../../login/utils/utils';
import {
    getChildBirthDateSelector,
    getChildImageUrlSelector,
    getChildNameSelector,
    isFetchingChildInfoSelector
} from '../../../common/selectors/mainSelectors';
import {fetchChildInfoAction, showSnackBarDialog} from '../../../common/actions/app_actions';
import {connect} from 'react-redux';
import {infoSettingsErrorCodeToTextMap} from '../constants/errors';

const styles = {
    page: {
        width: '60%',
        margin: '30px auto',
        padding: '30px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'max-height 0.3s ease-in-out',
        overflow: 'hidden',
        maxWidth: 700,
        maxHeight: 300,
        '@media (max-width: 480px)': {
            minHeight: '100%',
            width: '100%',
            padding: '20px',
            margin: 0,
        },
    },
    pageLoaded: {
        maxHeight: 800,
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        alignSelf: 'flex-end',
    },
    buttonLoading: {
        paddingRight: '11px',
    },
    loaderContainer: {
        maxWidth: 0,
        transition: 'max-width 0.3s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loaderContainerVisible: {
        maxWidth: '40px',
    },
    loader: {
        margin: '80px 0',
    },
};

function mapStateToProps(state) {
    return {
        childName: getChildNameSelector(state),
        birthDate: getChildBirthDateSelector(state),
        childImageUrl: getChildImageUrlSelector(state),
        isFetchingChildData: isFetchingChildInfoSelector(state),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchChildData: () => dispatch(fetchChildInfoAction()),
        showPopup: (config) => dispatch(showSnackBarDialog(config)),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

class InfoSettingsFormClass extends React.PureComponent {
    static propTypes = {
        mode: PropTypes.oneOf(['create', 'edit']),
        childName: PropTypes.string,
        birthDate: PropTypes.string,
        childImageUrl: PropTypes.string,
        isFetchingChildData: PropTypes.bool,
        fetchChildData: PropTypes.func,
        showPopup: PropTypes.func,
        classes: PropTypes.shape({
            page: PropTypes.object,
            form: PropTypes.object,
            submitButton: PropTypes.object,
            buttonLoading: PropTypes.object,
            loaderContainer: PropTypes.object,
            loaderContainerVisible: PropTypes.object,
        }),
    };

    get areFormFieldsValid() {
        const {
            childNameInputError,
            birthDateInputError,
            childImageError,
        } = this.state;

        return !childNameInputError && !birthDateInputError && !childImageError;
    }

    state = {
        childNameInputValue: '',
        childNameInputError: null,
        birthDateInputValue: new Date().toISOString().split('T')[0],
        birthDateInputError: null,
        childImageValue: null,
        childImageError: null,
        isSubmittingForm: false,
        imagePreviewUrl: null,
        wasImageDeleted: false,
    };

    async componentDidMount() {
        const {
            childName,
            birthDate,
            childImageUrl,
            isFetchingChildData,
            fetchChildData,
        } = this.props;

        if (!isFetchingChildData && !childName && !birthDate) {
            fetchChildData();
        } else {
            this.setState(state => ({
                childNameInputValue: childName || state.childNameInputValue,
                birthDateInputValue: birthDate || state.birthDateInputValue,
                imagePreviewUrl: childImageUrl || state.imagePreviewUrl,
            }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            childName,
            birthDate,
            childImageUrl,
        } = this.props;

        if (prevState.childImageValue !== this.state.childImageValue) {
            this.validateImageValue();
        }
        if (prevProps.childName !== childName || prevProps.birthDate !== birthDate) {
            this.setState(state => ({
                childNameInputValue: childName || state.childNameInputValue,
                birthDateInputValue: birthDate || state.birthDateInputValue,
                imagePreviewUrl: childImageUrl || state.imagePreviewUrl,
            }));
        }
    }

    onFormSubmit = async (e) => {
        const {
            showPopup,
        } = this.props;
        const {
            childNameInputValue,
            birthDateInputValue,
            childImageValue,
            wasImageDeleted,
        } = this.state;
        const formData = new FormData();

        e.preventDefault();

        this.validateFormFields();

        if (!this.areFormFieldsValid) {
            return;
        }

        this.setState({
            isSubmittingForm: true,
        });

        formData.append('childName', childNameInputValue);
        formData.append('birthDate', birthDateInputValue);
        formData.append('wasImageDeleted', wasImageDeleted);

        if (childImageValue) {
            formData.append('childImage', childImageValue);
        }

        try {
            await setChildDataApi(formData);

            showPopup({
                text: infoSettingsTranslations.en.FormUploadSuccessPopupText,
                mode: 'success',
                callback: this.onFormSubmitSuccess,
            });
        } catch (e) {
            this.setFormStateFromError(e);
        } finally {
            this.setState({
                isSubmittingForm: false,
            });
        }
    };

    onFormSubmitSuccess() {
        redirectPath('/info');
    }

    setFormStateFromError(error) {
        const {
            showPopup,
        } = this.props;
        const data = error.response && error.response.data;

        if (data) {
            const errorData = infoSettingsErrorCodeToTextMap[data.code];
            const newState = {};

            switch (data.fieldName) {
                case 'childImage':
                    newState.childImageError = errorData.text;
                    break;
                default:
                    showPopup({
                        text: errorData.text,
                        mode: 'error',
                    });
                    break;
            }

            this.setState(newState);
        }
    }

    onChildNameInputValueChange = (e) => {
        this.setState({
            childNameInputValue: e.target.value,
        });
    };

    onChildNameInputFocus = () => {
        this.setState({
            childNameInputError: null,
        });
    };

    onChildNameInputBlur = () => {
        const {childNameInputValue} = this.state;
        const error = validateInfoSettingsChildName(childNameInputValue);

        this.setState({
            childNameInputError: error,
        });
    };

    renderChildNameInput() {
        const {
            childNameInputValue,
            childNameInputError,
            isSubmittingForm,
        } = this.state;
        let hintText = replaceTextVariables(infoSettingsTranslations.en.ChildNameInputHint, {
            count: childNameInputValue.length,
        });

        if (childNameInputError) {
            hintText = childNameInputError;
        }

        return (
            <TextField
                id="name"
                variant="outlined"
                type="text"
                size="large"
                margin="normal"
                disabled={isSubmittingForm}
                error={childNameInputError}
                onChange={this.onChildNameInputValueChange}
                onFocus={this.onChildNameInputFocus}
                onBlur={this.onChildNameInputBlur}
                value={childNameInputValue}
                label={infoSettingsTranslations.en.ChildNameInputLabel}
                InputProps={{...commonInputProps}}
                InputLabelProps={labelProps}
                FormHelperTextProps={helperProps}
                helperText={hintText}
                autoFocus={true}
                fullWidth={true}
            />
        )
    }

    renderBirthDateInput() {
        const {
            birthDateInputValue,
            birthDateInputError,
            isSubmittingForm,
        } = this.state;

        return (
            <TextField
                id="birthdate"
                variant="outlined"
                type="date"
                size="large"
                margin="normal"
                disabled={isSubmittingForm}
                error={birthDateInputError}
                value={birthDateInputValue}
                label={infoSettingsTranslations.en.BirthDateInputLabel}
                onFocus={this.onBirthDateFocus}
                onBlur={this.onBirthDateBlur}
                onChange={this.onBirthDateChange}
                InputLabelProps={{
                    ...labelProps,
                    shrink: true,
                }}
                FormHelperTextProps={helperProps}
                InputProps={{...commonInputProps}}
                helperText={birthDateInputError || infoSettingsTranslations.en.BirthDateInputHint}
                fullWidth={true}
            />
        );
    }

    onBirthDateChange = (e) => {
        this.setState({
            birthDateInputValue: e.target.value,
        });
    };

    onBirthDateFocus = () => {
        this.setState({
            birthDateInputError: null,
        });
    };

    onBirthDateBlur = () => {
        const error = validateInfoSettingsBirthDate(this.state.birthDateInputValue);

        this.setState({
            birthDateInputError: error,
        });
    };

    validateFormFields() {
        const {
            birthDateInputValue,
            childNameInputValue,
            childImageValue,
        } = this.state;
        const childNameError = validateInfoSettingsChildName(childNameInputValue);
        const birthDateError = validateInfoSettingsBirthDate(birthDateInputValue);
        const childImageError = validateInfoSettingsChildImage(childImageValue);

        this.setState({
            childNameInputError: childNameError,
            birthDateInputError: birthDateError,
            childImageError,
        });
    }

    onImageInputChange = (image) => {
        this.setState({
            childImageValue: image,
            wasImageDeleted: image === null,
        });
    };

    validateImageValue() {
        const {
            childImageValue,
        } = this.state;

        this.setState({
            childImageError: validateInfoSettingsChildImage(childImageValue),
        });
    }

    render() {
        const {
            classes,
            isFetchingChildData,
        } = this.props;
        const {
            isSubmittingForm,
            childImageError,
            imagePreviewUrl,
        } = this.state;
        const buttonClassNames = `${classes.submitButton} ${isSubmittingForm ? classes.buttonLoading : ''}`;
        const progressContainerClassNames = `${classes.loaderContainer} ${isSubmittingForm ? classes.loaderContainerVisible : ''}`;
        const pageClassNames = `${classes.page} ${isFetchingChildData ? '' : classes.pageLoaded}`;

        return (
            <Paper name={INFO_SETTINGS_FORM_NAME} className={pageClassNames} component="section">
                <Typography variant="h4">{infoSettingsTranslations.en.InfoSettingsFormHeading}</Typography>
                {
                    isFetchingChildData ?
                        <CircularProgress className={classes.loader}/> :
                        <form className={classes.form} onSubmit={this.onFormSubmit}>
                            {this.renderChildNameInput()}
                            {this.renderBirthDateInput()}
                            <FileUpload
                                id="image"
                                name="image"
                                hasError={!!childImageError}
                                disabled={isSubmittingForm}
                                onChange={this.onImageInputChange}
                                previewUrl={imagePreviewUrl}
                                hint={childImageError || infoSettingsTranslations.en.UploadHint}
                            />
                            <Button
                                disabled={isSubmittingForm}
                                className={buttonClassNames}
                                variant="contained"
                                type="submit"
                                color="primary"
                                size="small"
                            >
                                {infoSettingsTranslations.en.SubmitButton}
                                <div className={progressContainerClassNames}>
                                    <CircularProgress style={{width: '20px', height: '20px', marginLeft: '11px'}}/>
                                </div>
                            </Button>
                        </form>
                }
            </Paper>
        );
    }
}

export const InfoSettingsForm = connector(withStyles(styles)(InfoSettingsFormClass));
