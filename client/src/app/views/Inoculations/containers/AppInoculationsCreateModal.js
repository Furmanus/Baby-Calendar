import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, CircularProgress, Dialog, DialogTitle, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {createModalCommonStyles} from '../../../common/constants/create_modal';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {labelProps} from '../../../../common/helpers/form';
import {isSubmittingInoculationsFormSelector} from '../selectors/appInoculationsSelectors';
import {submitInoculationForm} from '../actions/appInoculationsActions';

const useStyles = makeStyles(createModalCommonStyles);

export function AppInoculationsCreateModal(props) {
    const {
        mode,
        onClose,
        editedInoculationDate,
        editedInoculationDescription,
        editedInoculationSideEffects,
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const title = mode === 'create' ? translations.en.CreateModalCreateTitle : translations.en.CreateModalEditTitle;
    const isSubmittingChildWeightForm = useSelector(isSubmittingInoculationsFormSelector);
    const submitButtonText = mode === 'create' ? translations.en.CreateModalSubmitButtonAdd : translations.en.CreateModalSubmitButtonEdit;
    const submitButtonLoaderClassNames = `${classes.loaderContainer} ${isSubmittingChildWeightForm ? classes.loaderContainerVisible : ''}`;

    const [inoculationDate, setInoculationDate] = React.useState(mode === 'edit' ? editedInoculationDate : '');
    const [inoculationDescription, setInoculationDescription] = React.useState(mode === 'edit' ? editedInoculationDescription : '');
    const [inoculationSideEffects, setInoculationSideEffects] = React.useState(mode === 'edit' ? editedInoculationSideEffects : '');

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        dispatch(submitInoculationForm({
            callback: onClose,
            mode,
            editedInoculationDate,
            editedInoculationDescription,
            editedInoculationSideEffects,
            inoculationDate,
            inoculationDescription,
            inoculationSideEffects,
        }));
    };
    const onInoculationDateChange = (ev) => {
        setInoculationDate(ev.target.value);
    };
    const onInoculationDescriptionChange = (ev) => {
        setInoculationDescription(ev.target.value);
    };
    const onInoculationSideEffectsChange = (ev) => {
        setInoculationSideEffects(ev.target.value);
    };

    return (
        <Dialog open={!!mode} onClose={onClose}>
            <DialogTitle className={classes.header}>{title}</DialogTitle>
            <form className={classes.form} onSubmit={onFormSubmit}>
                <TextField
                    id="inoculationDate"
                    variant="outlined"
                    label="date"
                    disabled={isSubmittingChildWeightForm}
                    InputLabelProps={{
                        ...labelProps,
                        shrink: true,
                    }}
                    type="date"
                    onChange={onInoculationDateChange}
                    value={inoculationDate}
                    fullWidth
                />
                <TextField
                    id="inoculationDescription"
                    variant="outlined"
                    label="description"
                    InputLabelProps={{
                        ...labelProps,
                        shrink: true,
                    }}
                    onChange={onInoculationDescriptionChange}
                    value={inoculationDescription}
                    rows={5}
                    multiline
                    fullWidth
                />
                <TextField
                    id="inoculationSideEffects"
                    variant="outlined"
                    label="side effects"
                    InputLabelProps={{
                        ...labelProps,
                        shrink: true,
                    }}
                    onChange={onInoculationSideEffectsChange}
                    value={inoculationSideEffects}
                    rows={5}
                    multiline
                    fullWidth
                />
                <Button
                    disabled={isSubmittingChildWeightForm}
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

AppInoculationsCreateModal.propTypes = {
    mode: PropTypes.oneOf(['create', 'edit']),
    onClose: PropTypes.func,
    editedInoculationDate: PropTypes.string,
    editedInoculationDescription: PropTypes.string,
    editedInoculationSideEffects: PropTypes.string,
};
