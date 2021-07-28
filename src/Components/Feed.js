import React,{useContext,useState,useEffect} from 'react'
import Header from './Header'
import {AuthContext} from '../Context/AuthProvider'
import {database} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile'
import './Feed.css';
import Post from "./Post"


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
        <div style={{height : '1.5vh'}}/>
        <div className="feed-container">
            <div className="center">
            <UploadFile userData = {userData}></UploadFile>
            <Post userData = {userData}></Post>
            </div>
        </div>
        
        </>
        }
        </>
    )
}

export default Feed
