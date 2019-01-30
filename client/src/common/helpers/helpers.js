import {
    DEFAULT_STYLE,
    NEUTRAL_GRAY,
    SKY_BLUE,
    STYLE_LOCAL_STORAGE_KEY
} from '../../app/constants/app_styles';

export function navigateTo(path) {
    window.location = path;
}
export function calculateAgeInWeeks(birthdate) {
    const current = Date.now(),
        parsedBirth = Date.parse(new Date(birthdate)),
        diff = current - parsedBirth,
        weeks = ((((diff / 1000) / 60) / 60) / 24) / 7;

        return Math.floor(weeks);
}
export function calculateWeightDifference(weightTable, firstIndex, secondIndex = firstIndex + 1) {
    const lastIndex = weightTable.length - 1;
    if (firstIndex < lastIndex) {
        return (Number(weightTable[firstIndex].childWeight) - Number(weightTable[secondIndex].childWeight)).toFixed(3);
    } else {
        return '';
    }
}
export function calculateAverageWeightGain(weightTable, firstIndex, secondIndex = firstIndex + 1) {
    const weightDiff = calculateWeightDifference(...arguments),
        firstIndexDate = new Date(weightTable[firstIndex].weightDate),
        firstIndexDateTimestamp = Date.parse(firstIndexDate);
    let secondIndexDate,
        secondIndexDateTimestamp,
        diff;

    if (weightDiff) {
        secondIndexDate = new Date(weightTable[secondIndex].weightDate);
        secondIndexDateTimestamp = Date.parse(secondIndexDate);
        diff = (firstIndexDateTimestamp - secondIndexDateTimestamp) / (1000*60*60*24);

        if (0 !== diff) {
            return (Number(weightDiff) / diff).toFixed(3);
        }
        return Number(weightDiff).toFixed(3);
    }

    return '';
}
export function sortByDateCallback(a, b) {
    const firstTimeStamp = Date.parse(new Date(a.weightDate || a.inoculationDate || a.date)),
        secondTimeStamp = Date.parse(new Date(b.weightDate || b.inoculationDate || b.date));

    return secondTimeStamp - firstTimeStamp;
}

const styleKeyToStyleValueMap = {
    [DEFAULT_STYLE]: 'linear-gradient(to bottom, #E7717D, #FF9472)',
    [NEUTRAL_GRAY]: 'linear-gradient(to bottom, #8E9EAB, #EEF2F3)',
    [SKY_BLUE]: 'linear-gradient(to bottom, #6190E8, #A7BFE8)'
};

export function setApplicationStyleInStorage(style) {
    window.localStorage.setItem(STYLE_LOCAL_STORAGE_KEY, style);
}

export function getApplicationStyleFromStorage() {
    return window.localStorage.getItem(STYLE_LOCAL_STORAGE_KEY);
}

export function setApplicationStyle() {
    const styleKey = getApplicationStyleFromStorage();

    if (styleKey && styleKey in styleKeyToStyleValueMap) {
        document.body.style.background = styleKeyToStyleValueMap[styleKey];
    }
}