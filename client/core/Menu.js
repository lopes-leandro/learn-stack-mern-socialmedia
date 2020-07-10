import React from "react";
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Button } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import auth from './../auth/auth-helper';

const isActive = (history, path) => {
    if (history.location.pathname == path) {
        return {color: '#ff4081'}
    } else {
        return {color: '#ffffff'}
    }
}

const Menu = withRouter(({history}) => (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' color='inherit'>
                Bike.IO
            </Typography>
            <Link to="/">
                <IconButton aria-label='Home' style={isActive(history, "/")}>
                    <Home/>
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>Usuários</Button>
            </Link>
            {
                !auth.isAuthenticated() && (<span>
                    <Link to="/signup">
                        <Button style={isActive(history, "/signup")}>Inscreva-se</Button>
                    </Link>
                    <Link to="/signin">
                        <Button style={isActive(history, "/signin")}>Entrar</Button>
                    </Link>
                </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <Button style={isActive(history, "/user/" 
                            + auth.isAuthenticated().user._id)}>
                            Meu Perfil
                        </Button>
                    </Link>
                    <Button color="inherit" onClick={() => {auth.clearJWT(() => history.push('/'))}} >
                        Sair
                    </Button>
                </span>)
            }
        </Toolbar>
    </AppBar>
));

export default Menu;