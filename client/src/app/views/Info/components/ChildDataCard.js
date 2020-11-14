import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardMedia, Typography, CardActions, Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {infoPageTranslations} from '../constants/translations';
import {replaceTextVariables} from '../../../../common/helpers/text';
import {calculateAgeInWeeks} from '../utils/utils';
import {blue} from '@material-ui/core/colors';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: 345,
        margin: '0 auto',
        height: 250,
    },
    contentText: {
        fontSize: 12,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        padding: 0,
        marginLeft: -10,
        color: blue[500],
        fontSize: 12,
    },
    image: {
        height: 100,
        backgroundSize: 'contain',
    },
    loader: {
        position: 'relative',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
    },
});

export function ChildDataCard(props) {
    const {
        childName,
        birthDate,
        childImageUrl,
        showLoader,
    } = props;
    const classes = useStyles();

    return (
        <Card className={classes.container}>
            {
                showLoader ?
                    <CircularProgress className={classes.loader}/> :
                    <React.Fragment>
                        <CardMedia
                            className={classes.image}
                            image={childImageUrl}
                            title="Image"
                        />
                        <CardContent>
                            <Typography className={classes.headerText} gutterBottom variant="h5" component="h2">
                                {childName}
                            </Typography>
                            <Typography className={classes.contentText} variant="body2" color="textSecondary" component="p">
                                {replaceTextVariables(infoPageTranslations.en.BirthDateText, {birthDate})}
                            </Typography>
                            <Typography className={classes.contentText} variant="body2" color="textSecondary" component="p">
                                {replaceTextVariables(infoPageTranslations.en.AgeInWeeks, {ageInWeeks: calculateAgeInWeeks(birthDate)})}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} size="large" href="/info/settings">
                                {infoPageTranslations.en.EditButton}
                            </Button>
                        </CardActions>
                    </React.Fragment>
            }
        </Card>
    );
}

ChildDataCard.propTypes = {
    childName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    childImageUrl: PropTypes.string,
    showLoader: PropTypes.bool,
};
