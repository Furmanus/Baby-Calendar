import {INFO_SECTION, INFO_SETTINGS_SECTION} from './common/constants/sections';
import {Info} from '@material-ui/icons';
import {dashboardTranslations} from './common/constants/translations';
import {infoReducer} from './views/Info/reducers/infoReducer';
import {InfoPage} from './views/Info/containers/InfoPage';
import {InfoSettingsForm} from './views/InfoSettingsForm/containers/InfoSettingsForm';

export const routes = [
    {
        name: INFO_SECTION,
        path: '/info',
        exact: true,
        MenuIcon: Info,
        menuText: dashboardTranslations.en.InfoSection,
        reducer: infoReducer,
        Component: InfoPage,
    },
    {
        name: INFO_SETTINGS_SECTION,
        path: '/info/settings',
        MenuIcon: null,
        exact: false,
        menuText: null,
        reducer: null,
        Component: InfoSettingsForm,
    }
];
