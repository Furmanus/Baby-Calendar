import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    getInoculationsEntriesSelector,
    isFetchingInoculationsEntriesSelector,
    isSubmittingInoculationsFormSelector,
} from '../selectors/appInoculationsSelectors';
import {fetchInoculationsEntriesAction} from '../actions/appInoculationsActions';
import {materialDataTableStyles} from '../../../styles/materialStyles';
import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    withStyles
} from '@material-ui/core';
import {appInoculationsManageTranslations as translations} from '../contants/translations';
import {tablePaginationOptions} from '../../../common/constants/data_table';
import {AppInoculationsTableRow} from '../components/AppInoculationsTableRow';
import {AppInoculationsCreateModal} from './AppInoculationsCreateModal';

const styles = {
    ...materialDataTableStyles,
};

function mapStateToProps(state) {
    return {
        isFetchingInoculationsEntries: isFetchingInoculationsEntriesSelector(state),
        isSubmittingForm: isSubmittingInoculationsFormSelector(state),
        inoculationsEntries: getInoculationsEntriesSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInoculationEntries: () => dispatch(fetchInoculationsEntriesAction()),
    };
}

class AppInoculationsManageClass extends React.PureComponent {
    static propTypes = {
        isFetchingInoculationsEntries: PropTypes.bool,
        isSubmittingForm: PropTypes.bool,
        inoculationsEntries: PropTypes.arrayOf(PropTypes.object),
        fetchInoculationEntries: PropTypes.func,
    };

    state = {
        rowsPerPage: 5,
        currentPage: 0,
        modalState: null,
        editedInoculationDate: null,
        editedInoculationDescription: null,
        editedInoculationSideEffects: null,
    };

    componentDidMount() {
        const {
            fetchInoculationEntries,
            inoculationsEntries,
        } = this.props;

        if (!inoculationsEntries) {
            fetchInoculationEntries();
        }
    }

    handlePageChange = (event, newPage) => {
        this.setState({
            currentPage: newPage,
        });
    };

    handlePerPageChange = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            currentPage: 0,
        });
    };

    onAddEntryClick = () => {
        this.setState({
            modalState: 'create',
        });
    };

    onModalClose = () => {
        this.setState({
            modalState: null,
            editedInoculationDate: null,
            editedInoculationDescription: null,
            editedInoculationSideEffects: null,
        });
    };

    onEditClick = (inoculationDate, inoculationDescription, inoculationSideEffects) => {
        this.setState({
            modalState: 'edit',
            editedInoculationDate: inoculationDate,
            editedInoculationDescription: inoculationDescription,
            editedInoculationSideEffects: inoculationSideEffects,
        });
    };

    onDeleteClick = (inoculationDate, inoculationDescription, inoculationSideEffects) => {
        console.log(inoculationDate, inoculationDescription, inoculationSideEffects);
    };

    render() {
        const {
            classes,
            inoculationsEntries,
            isFetchingInoculationsEntries,
            isSubmittingForm,
        } = this.props;
        const {
            rowsPerPage,
            currentPage,
            modalState,
            editedInoculationDate,
            editedInoculationDescription,
            editedInoculationSideEffects,
        } = this.state;

        return (
            <React.Fragment>
                {isFetchingInoculationsEntries || isSubmittingForm || !inoculationsEntries ?
                    <CircularProgress className={classes.loader}/> :
                    <TableContainer className={classes.container} component={Paper}>
                        <h2 className={classes.heading}>{translations.en.ManageHeading}</h2>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            size="small"
                            className={classes.addEntryButton}
                            onClick={this.onAddEntryClick}
                        >
                            {translations.en.AddEntryButton}
                        </Button>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.headerRow}>
                                    <TableCell align="left">{translations.en.TableDateRowHeading}</TableCell>
                                    <TableCell align="left">{translations.en.TableDescriptionRowHeading}</TableCell>
                                    <TableCell align="left">{translations.en.TableSideEffectsRowHeading}</TableCell>
                                    <TableCell align="right">{translations.en.TableActionsRowHeading}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    [...inoculationsEntries].reverse()
                                        .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                        .map(item => (
                                            <AppInoculationsTableRow
                                                key={`${item.inoculationDate}-${item.description}`}
                                                inoculationDate={item.inoculationDate}
                                                inoculationDescription={item.description}
                                                inoculationSideEffects={item.inoculationSideEffects}
                                                onEditClick={this.onEditClick}
                                                onDeleteClick={this.onDeleteClick}
                                            />
                                        ))
                                }
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    rowsPerPageOptions={tablePaginationOptions}
                                    colspan={3}
                                    page={currentPage}
                                    rowsPerPage={rowsPerPage}
                                    count={inoculationsEntries.length}
                                    onChangePage={this.handlePageChange}
                                    onChangeRowsPerPage={this.handlePerPageChange}
                                    labelRowsPerPage={translations.en.TablePaginationInputLabel}
                                />
                            </TableFooter>
                        </Table>
                    </TableContainer>
                }
                {
                    !!modalState && (
                        <AppInoculationsCreateModal
                            mode={modalState}
                            onClose={this.onModalClose}
                            editedInoculationDate={editedInoculationDate}
                            editedInoculationDescription={editedInoculationDescription}
                            editedInoculationSideEffects={editedInoculationSideEffects}
                        />
                    )
                }
            </React.Fragment>
        );
    }
}

export const AppInoculationsManage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppInoculationsManageClass));
