import {INFO_SECTION} from './common/constants/sections';
import {Info} from '@material-ui/icons';
import {dashboardTranslations} from './common/constants/translations';
import {infoReducer} from './views/Info/reducers/infoReducer';
import {InfoPage} from './views/Info/containers/InfoPage';

export const routes = [
    {
        name: INFO_SECTION,
        path: '/info',
        MenuIcon: Info,
        menuText: dashboardTranslations.en.InfoSection,
        reducer: infoReducer,
        Component: InfoPage,
    },
];
