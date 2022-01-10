import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB7mpjxeDj2hYyFJ4JkXhctKL2lzjRb5tM",
    authDomain: "uhangout-5cbf7.firebaseapp.com",
    databaseURL: "https://uhangout-5cbf7-default-rtdb.firebaseio.com",
    projectId: "uhangout-5cbf7",
    storageBucket: "uhangout-5cbf7.appspot.com",
    messagingSenderId: "435606287641",
    appId: "1:435606287641:web:56be8346407796c3470188"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);