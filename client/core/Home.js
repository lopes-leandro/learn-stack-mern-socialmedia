import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
    Typography, 
    CardMedia, 
    CardContent, 
    Card} from "@material-ui/core";
import unicornbikeImg from "./../assets/images/jannis-lucas.jpg";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Bike Lovers
            </Typography>
            <CardMedia className={classes.media} 
            image={unicornbikeImg} title="Unicorn Bicycle"/>
            <CardContent>
                <Typography variant="body2" component="p">
                <span>Photo by <a href="https://unsplash.com/@jannis_lucas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jannis Lucas</a> on <a href="https://unsplash.com/s/photos/bike-wallpaper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                </Typography>
            </CardContent>
        </Card>
    )
}