export const createModalCommonStyles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300,
        padding: '0 40px 30px 40px',
        '& > div': {
            marginBottom: 30,
        },
        '@media (max-width: 480px)': {
            minWidth: 'unset',
        },
    },
    header: {
        textAlign: 'center',
        marginBottom: 15,
    },
    button: {
        alignSelf: 'flex-end',
    },
    loaderContainer: {
        maxWidth: 0,
        transition: 'max-width 0.3s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loaderContainerVisible: {
        maxWidth: '40px',
    },
};
