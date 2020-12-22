export const materialDataTableStyles = {
    container: {
        minWidth: '650px',
        width: 'unset',
        margin: '30px auto',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'initial',
        '@media (max-width: 480px)': {
            minHeight: '100%',
            width: '100%',
            padding: '20px',
            margin: 0,
            minWidth: 'unset',
        },
    },
    headerRow: {
        fontWeight: 500,
    },
    loader: {
        margin: '80px auto',
    },
    table: {
        width: '100%',
    },
    heading: {
        textAlign: 'center',
    },
    addEntryButton: {
        alignSelf: 'flex-end',
    },
};
export const materialDataTableCellStyles = {
    maxWidth: 200,
};
