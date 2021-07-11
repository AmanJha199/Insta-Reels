import React,{useState,useContext,useEffect} from 'react';
import {auth} from '../firebase';
const AuthContext = React.createContext();
function Auth_Provider(children) {

const[currUser, setCurrUser] = useState();
const[loading, setLoading] = useState(true);

function signUp(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
}

function login(email,password){
    return auth.signInWithEmailAndPassword(email,password);
}

function logout(email,password){
    return auth.signOut();
}

//Variation 2 i.e componentDidMount
useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
        setCurrUser(user);
        setLoading(false);
    })
    return ()=>{
        unsubscribe();
    }
},[])

const value = {
    currUser,
    signUp,
    login, 
    logout
}

    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default Auth_Provider
