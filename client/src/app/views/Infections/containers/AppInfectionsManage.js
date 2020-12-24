import React from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

class AppInfectionsManageClass extends React.PureComponent {
    render() {
        return (
            <div>HALO</div>
        );
    }
}

export const AppInfectionsManage = connect(mapStateToProps, mapDispatchToProps)(AppInfectionsManageClass);
