import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage'
import 'firebase/firestore';

firebase.initializeApp(
    {
        apiKey: "AIzaSyBwV4sS0cLgYYqFCcBfCHkC-dZAk66YQU4",
        authDomain: "insta-reels-46aec.firebaseapp.com",
        projectId: "insta-reels-46aec",
        storageBucket: "insta-reels-46aec.appspot.com",
        messagingSenderId: "165421465486",
        appId: "1:165421465486:web:29ea9695899a15de98aedf",
        measurementId: "G-55WY8H9ECT"
    })

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();