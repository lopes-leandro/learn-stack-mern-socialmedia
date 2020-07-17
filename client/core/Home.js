import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
    Typography, 
    CardMedia, 
    CardContent, 
    Card,
    Grid} from "@material-ui/core";
import unicornbikeImg from "./../assets/images/jannis-lucas.jpg";
import FindPeople from "./../user/FindPeople";
import auth from "./../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 400
    }
}));

export default function Home({history}) {
    const classes = useStyles();
    const [defaultPage, setDefaultPage] = useState(false);

    useEffect(() => {
        setDefaultPage(auth.isAuthenticated());
        const unlisten = history.listen(() => {
            setDefaultPage(auth.isAuthenticated());
        })
        return () => { unlisten() }
    }, []);

    return (
        <div className={classes.root}>
            {
                !defaultPage &&
                <Grid container spacing={8}>
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            }
            {
                defaultPage &&
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <FindPeople/>
                    </Grid>
                </Grid>
            }
        </div>
    )
}