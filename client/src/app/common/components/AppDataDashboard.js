import React from 'react';
import PropTypes from 'prop-types';
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
    withStyles,
} from '@material-ui/core';
import {materialDataTableCellStyles, materialDataTableStyles} from '../../styles/materialStyles';
import {dashboardTranslations as translations} from '../constants/translations';
import {AppDataDashboardRow} from './dataTable/AppDataDashboardRow';
import {AppDataTableCreateModal} from './dataTable/AppDataTableCreateModal';
import {tablePaginationOptions} from '../constants/data_table';

const styles = {
    ...materialDataTableStyles,
    tableCell: materialDataTableCellStyles,
};

export const dataDashboardColumnsPropTypes = PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOfType(['text', 'multiline', 'number']).isRequired,
    validation: PropTypes.shape({
        isRequired: PropTypes.bool,
    }),
}));

class AppDataDashboardClass extends React.PureComponent {
    state = {
        currentPage: 0,
        rowsPerPage: 5,
        createModalState: null,
        createModalEditedEntry: null,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isSubmittingCreateForm && !this.props.isSubmittingCreateForm) {
            this.onAddEntryModalClose();
        }
    }

    onAddEntryClick = () => {
        this.setState({
            createModalState: 'create',
        });
    };

    onEditEntryClick = (editedEntry) => {
        this.setState({
            createModalState: 'edit',
            createModalEditedEntry: editedEntry,
        });
    };

    onDeleteEntryClick = (entryToDelete) => {
        this.props.handleDeleteEntry(entryToDelete);
    };

    onAddEntryModalClose = () => {
        this.setState({
            createModalState: null,
            createModalEditedEntry: null,
        });
    };

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

    render() {
        const {
            showLoader,
            heading,
            classes,
            columns,
            data,
            addEntryButton,
            handleCreateEntryFormSubmit,
            isSubmittingCreateForm,
        } = this.props;
        const {
            rowsPerPage,
            currentPage,
            createModalState,
            createModalEditedEntry,
        } = this.state;

        return (
            <React.Fragment>
                {
                    showLoader || !data ?
                        <CircularProgress className={classes.loader}/> :
                        <TableContainer className={classes.container} component={Paper}>
                            <h2 className={classes.heading}>{heading}</h2>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                size="small"
                                className={classes.addEntryButton}
                                onClick={this.onAddEntryClick}
                            >
                                {addEntryButton}
                            </Button>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow className={classes.headerRow}>
                                        {
                                            columns.map(column => (
                                                <TableCell
                                                    key={Math.random()}
                                                    className={classes.tableCell}
                                                    align="left"
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell className={classes.tableCell} align="right">{translations.en.ActionsColumnLabel}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        [...data].reverse()
                                            .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                            .map(item => (
                                                <AppDataDashboardRow
                                                    key={Math.random()}
                                                    columns={columns}
                                                    data={item}
                                                    onEditClick={this.onEditEntryClick}
                                                    onDeleteClick={this.onDeleteEntryClick}
                                                />
                                            ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TablePagination
                                        rowsPerPageOptions={tablePaginationOptions}
                                        colspan={3}
                                        labelRowsPerPage={translations.en.PaginationPerPageLabel}
                                        page={currentPage}
                                        rowsPerPage={rowsPerPage}
                                        count={data.length}
                                        onChangePage={this.handlePageChange}
                                        onChangeRowsPerPage={this.handlePerPageChange}
                                    />
                                </TableFooter>
                            </Table>
                        </TableContainer>
                }
                <AppDataTableCreateModal
                    mode={createModalState}
                    onClose={this.onAddEntryModalClose}
                    data={createModalEditedEntry}
                    columns={columns}
                    handleSubmit={handleCreateEntryFormSubmit}
                    isSubmittingForm={isSubmittingCreateForm}
                />
            </React.Fragment>
        );
    }
}

export const AppDataDashboard = withStyles(styles)(AppDataDashboardClass);

AppDataDashboard.propTypes = {
    classes: PropTypes.object,
    heading: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    showLoader: PropTypes.bool,
    columns: dataDashboardColumnsPropTypes,
    addEntryButton: PropTypes.string,
    handleCreateEntryFormSubmit: PropTypes.func,
    isSubmittingCreateForm: PropTypes.bool,
    handleDeleteEntry: PropTypes.func,
};

AppDataDashboard.defaultProps = {
    addEntryButton: translations.en.AddEntryButtonDefaultText,
};
