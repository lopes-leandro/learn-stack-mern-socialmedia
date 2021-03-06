import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    IconButton,
    Avatar,
    Typography
} from "@material-ui/core";
import { Person, ArrowForward } from "@material-ui/icons";
import { Link } from 'react-router-dom'
import { list } from "./api-user";

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    }
}));

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
        return function cleanup() {
            abortController.abort();
        }
    }, []);

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Todos os Usuários
            </Typography>
            <List dense>
                {
                    users.map((item, i) => {
                        const photoUrl = item._id
                            ? `/api/v1/users/photo/${item._id}?${new Date().getTime()}`
                            : `/api/v1/users/defaultPhoto`;
                        return <Link to={`/user/${item._id}`} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar src={photoUrl} 
                                        className={classes.bigAvatar}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })
                }
            </List>
        </Paper>
    );
}