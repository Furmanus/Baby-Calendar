export function calculateAgeInWeeks(birthdate) {
    const current = Date.now();
    const parsedBirth = Date.parse(new Date(birthdate));
    const diff = current - parsedBirth;
    const weeks = ((((diff / 1000) / 60) / 60) / 24) / 7;

    return Math.floor(weeks);
}
