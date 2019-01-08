import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {
    Pagination
} from 'react-bootstrap';
import {getPaginationItem} from '../utility/pagination_helper';

export class DataTablePagination extends React.Component {
    static propTypes = {
        dataItemsLength: PropTypes.number.isRequired,
        handlePageChange: PropTypes.func.isRequired,
        currentPage: PropTypes.number,
        showPerPage: PropTypes.number
    };
    static defaultProps = {
        currentPage: 1,
        showPerPage: 5
    };
    get maxPage() {
        const {
            dataItemsLength,
            showPerPage
        } = this.props;

        return Math.ceil(dataItemsLength / showPerPage);
    }
    @autobind
    handlePageChange(index) {
        const {
            handlePageChange
        } = this.props;

        if (index && index <= this.maxPage) {
            handlePageChange(index);
        }
    }
    @autobind
    onFirstItemClick() {
        this.handlePageChange(1);
    }
    @autobind
    onLastItemClick() {
        this.handlePageChange(this.maxPage);
    }
    @autobind
    onPreviousClick() {
        const {
            currentPage
        } = this.props;

        this.handlePageChange(currentPage - 1);
    }
    @autobind
    onNextClick() {
        const {
            currentPage
        } = this.props;

        this.handlePageChange(currentPage + 1);
    }
    @autobind
    renderPagination() {
        const {
            currentPage
        } = this.props;
        const paginationItems = [
            <Pagination.First onClick={this.onFirstItemClick} key="first"/>,
            <Pagination.Prev onClick={this.onPreviousClick} key="previous"/>,
        ];

        if (this.maxPage <= 1) {
            throw new Error('One page pagination generated');
        }

        if (currentPage - 2 > 0) {
            paginationItems.push(<Pagination.Ellipsis key="prevEllipsis"/>);
        }
        if (currentPage - 1 > 0) {
            paginationItems.push(getPaginationItem(currentPage - 1, currentPage, this.onPreviousClick));
        }

        paginationItems.push(getPaginationItem(currentPage, currentPage));

        if (currentPage + 1 <= this.maxPage) {
            paginationItems.push(getPaginationItem(currentPage + 1, currentPage, this.onNextClick));
        }
        if (currentPage + 2 <= this.maxPage) {
            paginationItems.push(<Pagination.Ellipsis key="nextEllipsis"/>);
        }

        paginationItems.push(<Pagination.Next onClick={this.onNextClick} key="next"/>);
        paginationItems.push(<Pagination.Last onClick={this.onLastItemClick} key="last"/>);

        return paginationItems;
    }
    render() {
        return (
            <Pagination>
                {this.renderPagination()}
            </Pagination>
        );
    }

}