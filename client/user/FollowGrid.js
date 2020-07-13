import React from "react";
import { GridList, GridListTile, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    }),
    gridList: {
        width: 500,
        height: 220,
    },
    titleText: {
        textAlign: 'center',
        marginTop: 10
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    }
}));

export default function FollowGrid(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={4}>
                {
                    props.people.map((person, index) => {
                        const photoUrl = person._id
                            ? `/api/v1/users/photo/${person._id}?${new Date().getTime()}`
                            : `/api/v1/users/defaultPhoto`;
                        return <GridListTile style={{'height':120}} key={index}>
                            <Link to={"/user/" + person._id}>
                                <Avatar src={photoUrl} 
                                    className={classes.bigAvatar}/>
                                <Typography className={classes.titleText}>
                                    {person.name}
                                </Typography>
                            </Link>
                        </GridListTile>
                    })
                }
            </GridList>
        </div>
    )
}
FollowGrid.propsType = {
    people: PropTypes.array.isRequired
}