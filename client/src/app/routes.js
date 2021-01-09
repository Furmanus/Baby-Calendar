import {
    INFO_SECTION,
    INFO_SETTINGS_SECTION,
    WEIGHT_SECTION,
    INOCULATIONS_SECTION,
    INFECTIONS_SECTION,
    NOTES_SECTION,
} from './common/constants/sections';
import {dashboardTranslations} from './common/constants/translations';
import {InfoPage} from './views/info/containers/InfoPage';
import {InfoSettingsForm} from './views/infoSettingsForm/containers/InfoSettingsForm';
import {AppWeightManage} from './views/weight/containers/AppWeightManage';
import {WeightIcon} from '../assets/weight';
import {SyringeIcon} from '../assets/syringe';
import {InfoIcon} from '../assets/info';
import {appWeightReducer} from './views/weight/reducers/appWeightReducer';
import {appInoculationsReducer} from './views/inoculations/reducers/appInoculationsReducer';
import {AppInoculationsManage} from './views/inoculations/containers/AppInoculationsManage';
import {appInfectionsReducer} from './views/infections/reducers/appInfectionsReducer';
import {AppInfectionsManage} from './views/infections/containers/AppInfectionsManage';
import {ThermometerIcon} from '../assets/thermometer';
import {NotesIcon} from '../assets/notes';
import {appNotesReducer} from './views/notes/reducers/appNotesReducer';
import {AppNotesManage} from './views/notes/containers/AppNotesManage';

export const routes = [
    {
        name: INFO_SECTION,
        path: '/info',
        exact: true,
        MenuIcon: InfoIcon,
        menuText: dashboardTranslations.en.InfoSection,
        reducer: null,
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
    },
    {
        name: WEIGHT_SECTION,
        path: '/weight',
        MenuIcon: WeightIcon,
        menuText: dashboardTranslations.en.WeightSection,
        reducer: appWeightReducer,
        Component: AppWeightManage,
    },
    {
        name: INOCULATIONS_SECTION,
        path: '/inoculations',
        MenuIcon: SyringeIcon,
        menuText: dashboardTranslations.en.InoculationsSection,
        reducer: appInoculationsReducer,
        Component: AppInoculationsManage,

    },
    {
        name: INFECTIONS_SECTION,
        path: '/infections',
        MenuIcon: ThermometerIcon,
        menuText: dashboardTranslations.en.InfectionsSection,
        reducer: appInfectionsReducer,
        Component: AppInfectionsManage,
    },
    {
        name: NOTES_SECTION,
        path: '/notes',
        MenuIcon: NotesIcon,
        menuText: dashboardTranslations.en.NotesSection,
        reducer: appNotesReducer,
        Component: AppNotesManage,
    },
];
