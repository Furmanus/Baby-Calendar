export const infoInitialState = {};

export function infoReducer(state = infoInitialState, action) {
    if (!action) {
        return state;
    }

    switch (action.type) {
        default:
            return state;
    }
}
