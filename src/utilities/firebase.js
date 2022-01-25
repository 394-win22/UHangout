import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set, push, query, orderByChild, startAt} from "firebase/database";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, useAuthState} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7mpjxeDj2hYyFJ4JkXhctKL2lzjRb5tM",
  authDomain: "uhangout-5cbf7.firebaseapp.com",
  databaseURL: "https://uhangout-5cbf7-default-rtdb.firebaseio.com",
  projectId: "uhangout-5cbf7",
  storageBucket: "uhangout-5cbf7.appspot.com",
  messagingSenderId: "435606287641",
  appId: "1:435606287641:web:56be8346407796c3470188",
};

export const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);



/* authentication functions */
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  signInWithPopup(getAuth(firebase), provider);
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

/* data functions */
export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const useEvents = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const orderByRef = query(ref(database, "/events"), orderByChild('eventTime'));
    const startAtRef = query(orderByRef, startAt(Date.now()));
    return onValue(
      startAtRef,
      (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => set(ref(database, path), value);

export const pushData = (path, value) => {
  const listRef = ref(database, path);
  const objRef = push(listRef);
  set(objRef, value);
};

export const saveUserToDb = (userObject) => {
  setData("/users/" + userObject.uid, {
    displayName: userObject.displayName,
    email: userObject.email,
    photoURL: userObject.photoURL
  });
}
