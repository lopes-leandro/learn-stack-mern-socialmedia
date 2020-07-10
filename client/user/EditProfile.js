import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Card, 
    CardContent, 
    CardActions, 
    Button, 
    TextField, 
    Typography, 
    Icon} from "@material-ui/core";
import {AddPhotoAlternate as FileUpload} from "@material-ui/icons";
import { update, read } from './api-user';
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
    },
    textTitle: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
}));

export default function EditProfile({match}) {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        about: '',
        photo: '',
        open: false,
        error: '',
        redirectToProfile: false
    });
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, name: data.name, email: data.email, about: data.about });
            }
        });

        return function clearup() {
            abortController.abort();
        }
    }, [match.params.userId]);

    const clickSubmit = () => {
        let userData = new FormData();
        values.name && userData.append('name', values.name);
        values.email && userData.append('email', values.email);
        values.password && userData.append('password', values.password);
        values.about && userData.append('about', values.about);
        values.photo && userData.append('photo', values.photo);

        // const user = {
        //     name: values.name || undefined,
        //     email: values.email || undefined,
        //     password: values.password || undefined,
        //     about: values.about || undefined
        // }
        update({userId: match.params.userId}, {t: jwt.token}, userData).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, redirectToProfile: true});
            }
        });
    }

    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value;
        setValues({...values, [name]: value});
    }

    if (values.redirectToProfile) {
        return (<Redirect to={'/user/' + values.userId} />);
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Editar Perfil
                </Typography>
                <input accept="image/*" type="file" 
                    onChange={handleChange('photo')}
                    className={classes.input}
                    id="ico-button-file"/>
                <label htmlFor="ico-button-file">
                    <Button variant="contained" color="default" component="span">
                        Carregar
                        <FileUpload />
                    </Button>
                </label>
                <span className={classes.filename}>
                    {values.photo ? values.photo.name : ''}
                </span>
                <br/>
                <TextField id="name" label="Name" 
                    className={classes.textField} 
                    value={values.name} 
                    onChange={handleChange('name')} 
                    margin="normal"/>
                <br/>
                <TextField id="multiline-flexible" label="About"
                    multiline
                    rows="2" 
                    value={values.about} 
                    onChange={handleChange('about')}/>
                <br/>
                <TextField id="email" type="email" label="Email" 
                    className={classes.textField} 
                    value={values.email} 
                    onChange={handleChange('email')} 
                    margin="normal"/>
                <br/>
                <TextField id="password" type="password" label="Password" 
                    className={classes.textField} 
                    value={values.password} 
                    onChange={handleChange('password')} 
                    margin="normal"/>
                <br/>
                {
                    values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>
                    )
                }
            </CardContent>
            <CardActions>
                <Button color="primary" 
                    variant="contained" 
                    onClick={clickSubmit} 
                    className={classes.submit}>
                    Enviar
                </Button>
            </CardActions>
        </Card>
    )
}