import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {
    Paper,
    CircularProgress,
    withStyles,
} from '@material-ui/core';
import {fetchChildInfoAction} from '../actions/infoActions';
import {
    getChildBirthDateSelector,
    getChildImageUrlSelector,
    getChildNameSelector,
    isFetchingChildInfoSelector
} from '../selectors/infoSelectors';

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'relative',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
    },
};

function mapStateToProps(state) {
    return {
        isFetchingUserData: isFetchingChildInfoSelector(state),
        childName: getChildNameSelector(state),
        birthDate: getChildBirthDateSelector(state),
        childImageUrl: getChildImageUrlSelector(state),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchUserData: () => dispatch(fetchChildInfoAction()),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

class InfoPageClass extends React.PureComponent {
    static propTypes = {
        isFetchingUserData: PropTypes.bool,
        childName: PropTypes.string,
        birthDate: PropTypes.string,
        childImageUrl: PropTypes.string,
        fetchUserData: PropTypes.func,
        classes: PropTypes.object,
        history: PropTypes.object,
    };

    componentDidMount() {
        this.props.fetchUserData();
    }

    componentDidUpdate(prevProps) {
        const {
            birthDate,
            childName,
            isFetchingUserData,
            history,
        } = this.props;

        if (prevProps.isFetchingUserData && !isFetchingUserData && (!birthDate || childName)) {
            history.push('/info/settings');
        }
    }

    renderPageContent() {
        return <div>datatable</div>
    }

    render() {
        const {
            classes,
            isFetchingUserData,
        } = this.props;

        return (
            <Paper className={classes.container} elevation={0} component="section" square>
                {
                    isFetchingUserData ?
                        <CircularProgress className={classes.loader}/> :
                        this.renderPageContent()
                }
            </Paper>
        );
    }
}

export const InfoPage = connector(withStyles(styles)(withRouter(InfoPageClass)));
