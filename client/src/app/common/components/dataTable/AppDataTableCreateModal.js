import React from 'react';
import PropTypes from 'prop-types';
import {Button, CircularProgress, Dialog, DialogTitle, TextField, withStyles} from '@material-ui/core';
import {labelProps} from '../../../../common/helpers/form';
import {dataDashboardColumnsPropTypes} from '../AppDataDashboard';
import {dashboardTranslations as translations} from '../../constants/translations';
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

    state = {};

    get formValues() {
        const {
            columns,
        } = this.props;

        return columns.reduce((result, current) => {
            result[current.key] = this.state[current.key];

            return result;
        }, {});
    }

    handlers = {};

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

        handleSubmit(mode, this.formValues, data);
    };

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
            } = column;

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
                            value={this.state[key]}
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
                            value={this.state[key]}
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
                            onChange={this.handlers[key]}
                            value={this.state[key]}
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
            <Dialog open={!!mode} onClose={onClose}>
                <DialogTitle className={classes.header}>{title}</DialogTitle>
                <form className={classes.form} onSubmit={this.onFormSubmit}>
                    {this.renderFormFields()}
                    <Button
                        disabled={isSubmittingForm}
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
