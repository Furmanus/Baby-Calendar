const appInfectionInitialState = {};

export function appInfectionsReducer(state = appInfectionInitialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        default:
            return state;
    }
}
