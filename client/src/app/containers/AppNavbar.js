import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Glyphicon
} from 'react-bootstrap';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    changeActiveTab,
    logout
} from '../actions/app_actions';
import {
    INFO,
    DIAPER,
    SETTINGS,
    WEIGHT,
    INOCULATIONS,
    INFECTIONS
} from '../constants/app_tabs';
import {
    MdInfo
} from 'react-icons/md';
import {
    FaBalanceScale,
    FaPoo,
    FaSyringe,
    FaThermometerThreeQuarters
} from 'react-icons/fa';

@connect(state => {
    return {
        username: state.username,
        isFetchingData: state.isFetchingData
    }
}, dispatch => {
    return {
        logout: () => {
            dispatch(logout());
        },
        changeActiveTab: tab => {
            dispatch(changeActiveTab(tab));
        }
    }
})
export class AppNavbar extends React.Component {
    @autobind
    handleSettingsChangeClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(SETTINGS);
    }
    @autobind
    handleInfoClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(INFO);
    }
    @autobind
    handleWeightClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(WEIGHT);
    }
    @autobind
    handleDiaperClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(DIAPER);
    }
    @autobind
    handleInoculationClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(INOCULATIONS);
    }
    @autobind
    handleInfectionsClick() {
        const {
            changeActiveTab
        } = this.props;

        changeActiveTab(INFECTIONS);
    }
    render() {
        const {
            username,
            logout,
            isFetchingData
        } = this.props;

        return (
            <Navbar className="navbar-wrapper center-horizontal" fluid>
                <Navbar.Text className="navbar-text" pullLeft>
                    <span>
                        Logged in as <strong>{username ? username : 'anonymous'}</strong>
                    </span>
                </Navbar.Text>
                <Nav className="navbar-items">
                    <NavItem eventKey={1} href="#" disabled={isFetchingData} onClick={this.handleInfoClick}>
                        <MdInfo className="icon" size={24}/>
                        <span>Info</span>
                    </NavItem>
                    <NavItem eventKey={2} href="#" disabled={isFetchingData} onClick={this.handleWeightClick}>
                        <FaBalanceScale className="icon" size={24}/>
                        <span>Weight</span>
                    </NavItem>
                    <NavItem eventKey={3} href="#" disabled={isFetchingData} onClick={this.handleDiaperClick}>
                        <FaPoo className="icon" size={24}/>
                        <span>Diaper</span>
                    </NavItem>
                    <NavItem eventKey={4} href="#" disabled={isFetchingData} onClick={this.handleInoculationClick}>
                        <FaSyringe className="icon" size={24}/>
                        <span>Inoculations</span>
                    </NavItem>
                    <NavItem eventKey={5} href="#" disabled={isFetchingData} onClick={this.handleInfectionsClick}>
                        <FaThermometerThreeQuarters className="icon" size={24}/>
                        <span>Infections</span>
                    </NavItem>
                </Nav>
                <Nav className="navbar-settings" pullRight>
                    <NavDropdown eventKey={4} title="Settings" id="settings-dropdown" disabled={isFetchingData}>
                        <MenuItem eventKey={4.1} onClick={this.handleSettingsChangeClick}>Change</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={4.2} onClick={logout}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}