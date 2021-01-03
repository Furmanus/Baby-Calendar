import React from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

const connector = connect(mapStateToProps, mapDispatchToProps);

class AppNotesManageClass extends React.PureComponent {
    render() {
        return (
            <div>HALO</div>
        );
    }
}

export const AppNotesManage = connector(AppNotesManageClass);
