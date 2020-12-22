import {
    INFO_SECTION,
    INFO_SETTINGS_SECTION,
    WEIGHT_SECTION,
    INOCULATIONS_SECTION,
} from './common/constants/sections';
import {dashboardTranslations} from './common/constants/translations';
import {InfoPage} from './views/Info/containers/InfoPage';
import {InfoSettingsForm} from './views/InfoSettingsForm/containers/InfoSettingsForm';
import {AppWeightManage} from './views/weight/containers/AppWeightManage';
import {WeightIcon} from '../assets/weight';
import {SyringeIcon} from '../assets/syringe';
import {InfoIcon} from '../assets/info';
import {appWeightReducer} from './views/weight/reducers/appWeightReducer';
import {appInoculationsReducer} from './views/Inoculations/reducers/appInoculationsReducer';
import {AppInoculationsManage} from './views/Inoculations/containers/AppInoculationsManage';

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

    }
];
