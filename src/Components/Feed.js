import React,{useContext,useState,useEffect} from 'react'
import Header from './Header'
import {AuthContext} from '../Context/AuthProvider'
import {database} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile'
import './Feed.css';


function Feed() {
    const {currentUser} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
    },[currentUser])

    return (
        <>
        { userData == null ? <CircularProgress /> : <>
        <Header userData = {userData}/>
        <UploadFile userData = {userData}></UploadFile>
        </>
        }
        </>
    )
}

export default Feed
