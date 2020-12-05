import React from 'react';
import PropTypes from 'prop-types';
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
    TablePagination,
} from '@material-ui/core';
import {fetchChildWeightApi} from '../../../../api/api';
import {weightManageTranslations} from '../constants/translations';
import {AppWeightTableRow} from '../components/AppWeightTableRow';

const styles = {
    container: {
        minWidth: '650px',
        width: 'unset',
        margin: '30px auto',
        padding: '0 10px',
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
};
const tablePaginationOptions = [5, 10, 15];

class AppWeightManageClass extends React.PureComponent {
    state = {
        isFetchingData: true,
        weightEntries: [],
        rowsPerPage: 5,
        currentPage: 0,
    };

    propTypes = {
        classes: PropTypes.shape({
            container: PropTypes.object,
            loader: PropTypes.object,
            table: PropTypes.object,
            headerRow: PropTypes.object,
        })
    };

    async componentDidMount() {
        try {
            const weightEntries = await fetchChildWeightApi();

            this.setState({
                isFetchingData: false,
                weightEntries: weightEntries.data.map(item => ({
                    ...item,
                    id: `${item.weightDate}-${item.childWeight}`
                })),
            });
        } catch (e) {
            // TODO handle error
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

    render() {
        const {
            isFetchingData,
            weightEntries,
            currentPage,
            rowsPerPage,
        } = this.state;
        const {
            classes,
        } = this.props;

        return (
            <React.Fragment>
                {
                    isFetchingData ?
                        <CircularProgress className={classes.loader}/> :
                        <TableContainer className={classes.container} component={Paper}>
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
                                        weightEntries.reverse()
                                            .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                                            .map(item => (
                                                <AppWeightTableRow
                                                    key={`${item.weightDate}-${item.childWeight}`}
                                                    weightDate={item.weightDate}
                                                    childWeight={item.childWeight}
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
            </React.Fragment>
        );
    }
}

export const AppWeightManage = withStyles(styles)(AppWeightManageClass);
