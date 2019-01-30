import React from 'react';
import {connect} from 'react-redux';
import {Header} from '../components/Header';
import {AppNavbar} from './AppNavbar';
import {Loader} from '../components/Loader';
import {InfoComponent} from '../components/InfoComponent';
import {
    APPLICATION_SETTINGS,
    DIAPER,
    INFECTIONS,
    INFO,
    INOCULATIONS,
    SETTINGS,
    UPLOAD,
    WEIGHT
} from '../constants/app_tabs';
import autobind from 'autobind-decorator';
import {fetchUserData} from '../actions/app_actions';
import {ChildInfoSettingsContainer} from './ChildInfoSettingsContainer';
import {AppWeightTable} from './AppWeightTable';
import {AppDiaperTable} from './AppDiaperTable';
import {AppError} from './AppError';
import {AppInoculationsTable} from './AppInoculationsTable';
import {InfectionsTable} from './InfectionsTable';
import {UploadImageContainer} from './UploadImageContainer';
import {ApplicationSettings} from './ApplicationSettings';

@connect(state => {
    return {
        childName: state.childName,
        birthdate: state.birthdate,
        isFetchingData: state.isFetchingData,
        activeTab: state.activeTab,
        error: state.error,
        imageData: state.imageData
    };
}, dispatch => {
    return {
        fetchUserData: () => {
            dispatch(fetchUserData());
        }
    };
})
export class AppPage extends React.Component {
    componentDidMount() {
        const {
            fetchUserData
        } = this.props;

        fetchUserData();
    }
    @autobind
    renderActiveTab() {
        const {
            activeTab,
            childName,
            birthdate,
            imageData
        } = this.props;
        const imageDataUrl = imageData && (process.env.NODE_ENV === 'production' ? imageData.url : imageData.secure_url);

        switch (activeTab) {
            case INFO:
                return <InfoComponent
                    childName={childName}
                    birthdate={birthdate}
                    imageUrl={imageDataUrl}
                    imageWidth={imageData && imageData.width}
                    imageHeight={imageData && imageData.height}
                />;
            case WEIGHT:
                return <AppWeightTable/>;
            case DIAPER:
                return <AppDiaperTable/>;
            case SETTINGS:
                return <ChildInfoSettingsContainer/>;
            case INOCULATIONS:
                return <AppInoculationsTable/>;
            case INFECTIONS:
                return <InfectionsTable/>;
            case UPLOAD:
                return <UploadImageContainer/>;
            case APPLICATION_SETTINGS:
                return <ApplicationSettings/>
        }
    }
    render() {
        const {
            isFetchingData,
            error
        } = this.props;

        return (
            <div className="page-wrapper">
                <Header/>
                <AppNavbar/>
                <div className="page-content-wrapper">
                    {isFetchingData ? <Loader/> : this.renderActiveTab()}
                </div>
                {error ? <AppError/> : null}
            </div>
        );
    }
}