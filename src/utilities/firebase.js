import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB7mpjxeDj2hYyFJ4JkXhctKL2lzjRb5tM",
  authDomain: "uhangout-5cbf7.firebaseapp.com",
  databaseURL: "https://uhangout-5cbf7-default-rtdb.firebaseio.com",
  projectId: "uhangout-5cbf7",
  storageBucket: "uhangout-5cbf7.appspot.com",
  messagingSenderId: "435606287641",
  appId: "1:435606287641:web:56be8346407796c3470188",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

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
        console.log("snapshot");
        console.log(snapshot.val());
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
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
