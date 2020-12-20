import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Paper,
    CircularProgress,
    withStyles,
    TableHead,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TableFooter,
    TablePagination, Button,
} from '@material-ui/core';
import {weightManageTranslations} from '../constants/translations';
import {AppWeightTableRow} from '../components/AppWeightTableRow';
import {AppWeightTableModal} from '../components/AppWeightTableModal';
import {
    getAppWeightEntriesSelector,
    isFetchingWeightEntriesSelector,
    isDeletingChildWeightEntrySelector,
} from '../selectors/appWeightSelectors';
import {deleteWeightEntry, fetchAppWeightData} from '../actions/appWeightActions';

const styles = {
    container: {
        minWidth: '650px',
        width: 'unset',
        margin: '30px auto',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'initial',
    },
    headerRow: {
        fontWeight: 500,
    },
    loader: {
        margin: '80px auto',
    },
    table: {
        width: '100%',
    },
    heading: {
        textAlign: 'center',
    },
    addEntryButton: {
        alignSelf: 'flex-end',
    },
};
const tablePaginationOptions = [5, 10, 15];

function mapStateToProps(state) {
    return {
        weightEntries: getAppWeightEntriesSelector(state),
        isFetchingWeightEntries: isFetchingWeightEntriesSelector(state),
        isDeletingWeightEntry: isDeletingChildWeightEntrySelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWeightEntries: () => dispatch(fetchAppWeightData()),
        deleteEntry: (date, weight) => dispatch(deleteWeightEntry(date, weight)),
    };
}

class AppWeightManageClass extends React.PureComponent {
    state = {
        rowsPerPage: 5,
        currentPage: 0,
        modalState: null,
        editedEntryDate: null,
        editedEntryWeight: null,
    };

    propTypes = {
        classes: PropTypes.shape({
            container: PropTypes.object,
            loader: PropTypes.object,
            table: PropTypes.object,
            headerRow: PropTypes.object,
        }),
        weightEntries: PropTypes.arrayOf(PropTypes.object),
        isFetchingWeightEntries: PropTypes.bool,
        isDeletingWeightEntry: PropTypes.bool,
        fetchWeightEntries: PropTypes.func,
        deleteEntry: PropTypes.func,
    };

    componentDidMount() {
        const {
            fetchWeightEntries,
            weightEntries,
        } = this.props;

        if (!weightEntries) {
            fetchWeightEntries();
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

    onEditClick = (weightDate, childWeight) => {
        this.setState({
            modalState: 'edit',
            editedEntryDate: weightDate,
            editedEntryWeight: childWeight,
        });
    };

    onDeleteClick = (weightDate, childWeight) => {
        this.props.deleteEntry(weightDate, childWeight);
    };

    onAddEntryClick = () => {
        this.setState({
            modalState: 'create',
        });
    };

    onModalClose = () => {
        this.setState({
            modalState: null,
            editedEntryDate: null,
            editedEntryWeight: null,
        });
    };

    render() {
        const {
            currentPage,
            rowsPerPage,
            modalState,
            editedEntryWeight,
            editedEntryDate,
        } = this.state;
        const {
            classes,
            weightEntries,
            isFetchingWeightEntries,
            isDeletingWeightEntry,
        } = this.props;

        return (
            <React.Fragment>
                {
                    isFetchingWeightEntries || isDeletingWeightEntry || !weightEntries ?
                        <CircularProgress className={classes.loader}/> :
                        <TableContainer className={classes.container} component={Paper}>
                            <h2 className={classes.heading}>{weightManageTranslations.en.WeightManageHeader}</h2>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                size="small"
                                className={classes.addEntryButton}
                                onClick={this.onAddEntryClick}
                            >
                                {weightManageTranslations.en.AddEntryButton}
                            </Button>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow className={classes.headerRow}>
                                        <TableCell align="left">{weightManageTranslations.en.WeightDateTableHeader}</TableCell>
                                        <TableCell align="left">{weightManageTranslations.en.ChildWeightTableHeader}</TableCell>
                                        <TableCell align="right">{weightManageTranslations.en.ActionHeader}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        [...weightEntries].reverse()
                                            .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                            .map(item => (
                                                <AppWeightTableRow
                                                    key={`${item.weightDate}-${item.childWeight}`}
                                                    weightDate={item.weightDate}
                                                    childWeight={item.childWeight}
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
                                        count={weightEntries.length}
                                        onChangePage={this.handlePageChange}
                                        onChangeRowsPerPage={this.handlePerPageChange}
                                    />
                                </TableFooter>
                            </Table>
                        </TableContainer>
                }
                <AppWeightTableModal
                    onClose={this.onModalClose}
                    mode={modalState}
                    editedDate={editedEntryDate}
                    editedWeight={editedEntryWeight}
                />
            </React.Fragment>
        );
    }
}

export const AppWeightManage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppWeightManageClass));
