import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [file, setFile] = useState(null);
    const { signup, currentUser } = useContext(AuthContext);

    //console.log(signup);
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            //console.log(uid);
            //creating path for image in firestore
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success

            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            //progess tracking
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            //error func
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                //console.log(downloadUrl);
                await database.users.doc(uid).set({
                    username: name,
                    email: email,
                    userId: uid,
                    profileUrl: downloadUrl,
                    createdAt: database.getCurrentTimeStamp(),
                    postIds: []
                });
                setLoading(false);
                console.log("User has signed Up");
                history.push('/');
            }


            
        }
        catch{
            setError('');
            setTimeout(() => {
                setError('')
            }, 2000)
            setLoading(false);
        }
    }
    const handleFileSubmit = (e) => {
        let file = e.target.files;
        //console.log(file);
        if (file != null) {
            setFile(file);
        }
    }
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])


    return (
        // <div>
        //     <form onSubmit={handleSignup}>
        //         <div>
        //             <label htmlFor=''>UserName</label>
        //             <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
        //         </div>

        //         <div>
        //             <label htmlFor=''>Email</label>
        //             <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        //         </div>

        //         <div>
        //             <label htmlFor=''>Password</label>
        //             <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        //         </div>


        //         <div>
        //             <label htmlFor='profile'>Profile Image</label>
        //             <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
        //         </div>

        //         <button type='submit' disabled={loading}>SignUp</button>
        //     </form>
        // </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignup}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
  <input
                                type="file" accept='image/*' onChange={handleFileSubmit}
                            />
                        </Button>
                        <Grid>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                </form>
            </div>
        </Container>
    )
}

export default Signup