import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import FollowGrid from "./FollowGrid";

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{padding: 8*2}}>
            {props.children}
        </Typography>
    )
}

export default function ProfileTabs(props) {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, value) => {
        setTab(value);
    }

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs value={tab} 
                    onChange={handleTabChange} 
                    indicatorColor="primary" 
                    textColor="primary" 
                    variant="fullWidth">
                        <Tab label="Seguindo"/>
                        <Tab label="Seguidores"/>
                </Tabs>
            </AppBar>
            {
                tab === 0 &&
                <TabContainer><FollowGrid people={props.user.following}/></TabContainer>
            }
            {
                tab === 1 &&
                <TabContainer><FollowGrid people={props.user.followers}/></TabContainer>
            }
        </div>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

ProfileTabs.propTypes = {
    user: PropTypes.object.isRequired
}