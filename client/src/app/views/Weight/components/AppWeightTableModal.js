import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, CircularProgress, Dialog, DialogTitle, InputAdornment, TextField} from '@material-ui/core';
import {weightManageTranslations} from '../constants/translations';
import {makeStyles} from '@material-ui/core/styles';
import {submitChildWeightFormAction} from '../actions/appWeightActions';
import {labelProps} from '../../../../common/helpers/form';
import {isSubmittingChildWeightFormSelector} from '../selectors/appWeightSelectors';
import {createModalCommonStyles} from '../../../common/constants/create_modal';

const useStyles = makeStyles(createModalCommonStyles);

export function AppWeightTableModal(props) {
    const {
        mode,
        editedDate,
        editedWeight,
        onClose,
    } = props;
    const classes = useStyles();
    const titleText = mode === 'create' ? weightManageTranslations.en.WeightTableModalCreateTitle : weightManageTranslations.en.WeightTableModalEditTitle;
    const submitButtonText = mode === 'create' ? weightManageTranslations.en.FormSubmitCreateButton : weightManageTranslations.en.FormSubmitEditButton;
    const [isOpen, setIsOpen] = useState(false);
    const [weightDate, setWeightDate] = useState(mode === 'edit' ? editedDate : '');
    const [childWeight, setChildWeight] = useState(mode === 'edit' ? editedWeight : '');
    const isSubmittingChildWeightForm = useSelector(isSubmittingChildWeightFormSelector);
    const submitButtonLoaderClassNames = `${classes.loaderContainer} ${isSubmittingChildWeightForm ? classes.loaderContainerVisible : ''}`;
    const dispatch = useDispatch();
    const onWeightDateChange = (e) => {
        setWeightDate(e.target.value);
    };
    const onChildWeightChange = (e) => {
        setChildWeight(e.target.value);
    };
    const onFormSubmit = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            dispatch(submitChildWeightFormAction(mode, weightDate, childWeight, undefined, undefined, onClose));
        } else {
            dispatch(submitChildWeightFormAction(mode, weightDate, childWeight, editedDate, editedWeight, onClose));
        }
    };

    useEffect(() => {
        setIsOpen(!!mode);

        return () => {
            setWeightDate(null);
            setChildWeight(null);
        };
    }, [mode]);

    useEffect(() => {
        if (mode === 'edit') {
            setWeightDate(editedDate);
        }
    }, [editedDate]);

    useEffect(() => {
        if (mode === 'edit') {
            setChildWeight(editedWeight);
        }
    }, [editedWeight]);

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle className={classes.header}>{titleText}</DialogTitle>
            <form className={classes.form} onSubmit={onFormSubmit}>
                <TextField
                    id="weight-date"
                    variant="outlined"
                    label="date"
                    disabled={isSubmittingChildWeightForm}
                    InputLabelProps={{
                        ...labelProps,
                        shrink: true,
                    }}
                    type="date"
                    onChange={onWeightDateChange}
                    value={weightDate}
                    fullWidth
                />
                <TextField
                    id="child-weight"
                    variant="outlined"
                    label="weight"
                    disabled={isSubmittingChildWeightForm}
                    type="number"
                    onChange={onChildWeightChange}
                    InputLabelProps={{
                        ...labelProps,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>
                    }}
                    value={childWeight}
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

AppWeightTableModal.propTypes = {
    mode: PropTypes.oneOf(['create', 'edit']).isRequired,
    onClose: PropTypes.func.isRequired,
    editedDate: PropTypes.string,
    editedWeight: PropTypes.string,
};
AppWeightTableModal.defaultProps = {
    isOpen: false,
};
