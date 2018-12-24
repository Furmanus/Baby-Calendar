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
export function calculateWeightDifference(weightTable, firstIndex, secondIndex = firstIndex - 1) {
    if (firstIndex > 0) {
        return (Number(weightTable[firstIndex].childWeight) - Number(weightTable[secondIndex].childWeight)).toFixed(3);
    } else {
        return '';
    }
}
export function calculateAverageWeightGain(weightTable, firstIndex, secondIndex = firstIndex - 1) {
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

        return (Number(weightDiff) / diff).toFixed(3);
    }

    return '';
}
export function sortByDateCallback(a, b) {
    const firstTimeStamp = Date.parse(new Date(a.weightDate || a.inoculationDate)),
        secondTimeStamp = Date.parse(new Date(b.weightDate || b.inoculationDate));

    return firstTimeStamp - secondTimeStamp;
}