import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {
    Table
} from 'react-bootstrap';
import {DataTablePagination} from './DataTablePagination';

export class DataTable extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        tableHeadRenderer: PropTypes.func.isRequired,
        tableRowRenderer: PropTypes.func.isRequired,
        showPerPage: PropTypes.number
    };
    static defaultProps = {
        showPerPage: 5
    };
    state = {
        currentPage: 1
    };
    @autobind
    setCurrentPage(pageIndex) {
        this.setState({
            currentPage: pageIndex
        });
    }
    render() {
        const {
            tableHeadRenderer,
            tableRowRenderer,
            data,
            showPerPage
        } = this.props;
        const {
            currentPage
        } = this.state;

        return (
            <div className="data-table-wrapper">
                <Table className="data-table">
                    <thead>
                        {tableHeadRenderer()}
                    </thead>
                    <tbody>
                        {
                            data.map((entry, index) => {
                                const startingIndex = showPerPage * (currentPage - 1);
                                const endingIndex = startingIndex + 5;

                                if (startingIndex <= index && index < endingIndex) {
                                    return tableRowRenderer(entry, index);
                                }
                                return null;
                            })
                        }
                    </tbody>
                </Table>
                {
                    data.length > showPerPage ?
                        <DataTablePagination
                            className="data-table-pagination"
                            dataItemsLength={data.length}
                            currentPage={this.state.currentPage}
                            showPerPage={showPerPage}
                            handlePageChange={this.setCurrentPage}
                        /> :
                        null
                }
            </div>
        );
    }
}