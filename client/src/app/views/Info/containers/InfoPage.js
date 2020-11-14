import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {
    Paper,
    withStyles,
} from '@material-ui/core';
import {ChildDataCard} from '../components/ChildDataCard';
import {fetchChildInfoAction} from '../../../common/actions/app_actions';
import {
    getChildBirthDateSelector,
    getChildImageUrlSelector,
    getChildNameSelector,
    isFetchingChildInfoSelector
} from '../../../common/selectors/mainSelectors';

const styles = {
    container: {
        margin: '30px auto',
        height: '100%',
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

    state = {
        isFetchingData: false,
        childData: null,
    };

    componentDidMount() {
        const {
            childName,
            birthDate,
            fetchUserData,
        } = this.props;

        if (!childName || !birthDate) {
            fetchUserData();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            birthDate,
            childName,
            isFetchingUserData,
            history,
        } = this.props;

        if (prevProps.isFetchingUserData && !isFetchingUserData && (!birthDate || !childName)) {
            history.push('/info/settings');
        }
    }

    render() {
        const {
            classes,
            isFetchingUserData,
            childName,
            birthDate,
            childImageUrl,
        } = this.props;

        return (
            <Paper className={classes.container} elevation={0} component="section" square>
                <ChildDataCard
                    childName={childName}
                    birthDate={birthDate}
                    childImageUrl={childImageUrl}
                    showLoader={isFetchingUserData}
                />
            </Paper>
        );
    }
}

export const InfoPage = connector(withStyles(styles)(withRouter(InfoPageClass)));
