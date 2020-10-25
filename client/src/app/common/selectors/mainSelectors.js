function getMainStore(state) {
    return state.main;
}

export function isMenuExpandedSelector(state) {
    return getMainStore(state).isMenuExpanded;
}
