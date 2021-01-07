import React from 'react';
import PropTypes from 'prop-types';
import {Button, CircularProgress, Dialog, DialogTitle, TextField, withStyles} from '@material-ui/core';
import {helperProps, labelProps} from '../../../../common/helpers/form';
import {dataDashboardColumnsPropTypes} from '../AppDataDashboard';
import {dashboardTranslations, dashboardTranslations as translations} from '../../constants/translations';
import {createModalCommonStyles} from '../../constants/create_modal';

class AppDataTableCreateModalClass extends React.PureComponent {
    static propTypes = {
        mode: PropTypes.oneOf(['edit', 'create']),
        data: PropTypes.object,
        columns: dataDashboardColumnsPropTypes,
        onClose: PropTypes.func,
        handleSubmit: PropTypes.func,
        isSubmittingForm: PropTypes.bool,
    };

    static defaultProps = {
        data: {},
    };

    state = {
        interactedElements: new Set(),
        focusedElement: null,
        areFormFieldsValid: false,
    };

    get formValues() {
        const {
            columns,
        } = this.props;

        return columns.reduce((result, current) => {
            result[current.key] = this.state[current.key];

            return result;
        }, {});
    }

    get areFormFieldsValid() {
        const {
            columns,
        } = this.props;

        return columns.every(this.isFieldValid);
    }

    handlers = {};
    focusHandlers = {};
    blurHandlers = {};

    componentDidMount() {
        const {
            columns,
        } = this.props;

        for (const column of columns) {
            const { key } = column;

            this.handlers[key] = (e) => {
                this.setState({
                    [key]: e.target.value,
                });
            };
            this.focusHandlers[key] = () => {
                this.setState(state => ({
                    focusedElement: key,
                    interactedElements: new Set([...Array.from(state.interactedElements), key]),
                }));
            };
            this.blurHandlers[key] = () => {
                this.setState({
                    focusedElement: null,
                });
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.data && this.props.data) {
            const {
                data, columns,
            } = this.props;
            const newState = columns.reduce((result, current) => {
                const {
                    key,
                } = current;
                // TODO think about better and more optimal solution...
                result[key] = data && data[key] || '';

                return result;
            }, {});

            this.setState(newState);
        }
    }

    onFormSubmit = (e) => {
        const {
            handleSubmit,
            data,
            mode,
        } = this.props;

        e.preventDefault();

        if (this.areFormFieldsValid) {
            handleSubmit(mode, this.formValues, data);
        }
    };

    isFieldValid = (column) => {
        const {validation, key} = column;

        if (validation) {
            const {isRequired} = validation;

            if (isRequired) {
                const value = this.state[key];

                return value && value.length;
            }
        }
    };

    doesFieldHaveError(key) {
        const {columns} = this.props;
        const validation = columns.find(column => column.key === key).validation;

        if (validation) {
            const {isRequired} = validation;

            if (isRequired) {
                const {focusedElement, interactedElements} = this.state;
                const isFocused = focusedElement === key;
                const wasFocused = interactedElements.has(key);
                const value = this.state[key];

                return (!value || !value.length) && !isFocused && wasFocused;
            }

            return false;
        }

        return false;
    }

    renderFormFields() {
        const {
            columns,
            isSubmittingForm,
        } = this.props;
        const formFields = [];

        if (!this.state) {
            return formFields;
        }

        columns.forEach(column => {
            const {
                key,
                type,
                label,
                validation,
            } = column;
            const {isRequired} = validation;
            const value = this.state[key];
            const hasError = this.doesFieldHaveError(key);
            const defaultHintText = isRequired ? dashboardTranslations.en.FieldDefaultHint : dashboardTranslations.en.FieldDefaultOptionalHint;
            const formHelperText = hasError ? dashboardTranslations.en.FieldIsRequiredHintError : defaultHintText;

            switch (type) {
                case 'date':
                    formFields.push(
                        <TextField
                            id={key}
                            variant="outlined"
                            label={label}
                            disabled={isSubmittingForm}
                            InputLabelProps={{
                                ...labelProps,
                                shrink: true,
                            }}
                            type="date"
                            onChange={this.handlers[key]}
                            onFocus={this.focusHandlers[key]}
                            onBlur={this.blurHandlers[key]}
                            error={hasError}
                            helperText={formHelperText}
                            FormHelperTextProps={helperProps}
                            value={value}
                            fullWidth
                        />
                    );
                    break;
                case 'multiline':
                    formFields.push(
                        <TextField
                            id={key}
                            variant="outlined"
                            label={label}
                            disabled={isSubmittingForm}
                            InputLabelProps={{
                                ...labelProps,
                                shrink: true,
                            }}
                            onChange={this.handlers[key]}
                            onFocus={this.focusHandlers[key]}
                            onBlur={this.blurHandlers[key]}
                            value={value}
                            error={hasError}
                            helperText={formHelperText}
                            FormHelperTextProps={helperProps}
                            rows={5}
                            multiline
                            fullWidth
                        />
                    );
                    break;
                case 'number':
                    formFields.push(
                        <TextField
                            id={key}
                            type="number"
                            variant="outlined"
                            label={label}
                            disabled={isSubmittingForm}
                            InputLabelProps={{
                                ...labelProps,
                                shrink: true,
                            }}
                            error={hasError}
                            helperText={formHelperText}
                            FormHelperTextProps={helperProps}
                            onChange={this.handlers[key]}
                            onFocus={this.focusHandlers[key]}
                            onBlur={this.blurHandlers[key]}
                            value={value}
                            fullWidth
                        />
                    );
                    break;
                case 'text':
                    break;
            }
        });

        return formFields;
    }

    render() {
        const {
            mode,
            onClose,
            classes,
            isSubmittingForm,
        } = this.props;
        const title = mode === 'create' ? translations.en.AddEntryModalCreate : translations.en.AddEntryModalEdit;
        const submitButtonText = mode === 'create' ? translations.en.AddEntrySubmitButtonCreate : translations.en.AddEntrySubmitButtonEdit;
        const submitButtonLoaderClassNames = `${classes.loaderContainer} ${isSubmittingForm ? classes.loaderContainerVisible : ''}`;

        return (
            <Dialog classes={{paper: classes.paperContainer}} open={!!mode} onClose={onClose}>
                <DialogTitle className={classes.header}>{title}</DialogTitle>
                <form className={classes.form} onSubmit={this.onFormSubmit}>
                    {this.renderFormFields()}
                    <Button
                        disabled={isSubmittingForm || !this.areFormFieldsValid}
                        variant="contained"
                        type="submit"
                        color="primary"
                        size="small"
                        className={classes.button}
                    >
                        {submitButtonText}
                        <div className={submitButtonLoaderClassNames}>
                            <CircularProgress style={{width: '20px', height: '20px', marginLeft: '11px'}}/>
                        </div>
                    </Button>
                </form>
            </Dialog>
        );
    }
}

export const AppDataTableCreateModal = withStyles(createModalCommonStyles)(AppDataTableCreateModalClass);
