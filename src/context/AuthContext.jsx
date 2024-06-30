import React, { useEffect, useState, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedCoins, setSavedCoins] = useState([]);
  const [savedCoins2, setSavedCoins2] = useState([]);


  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, "users", email), {
      watchList: [],
    });
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    //this only gets the document once (non real-time)
    const docSnap = getDoc(doc(db, "users", `${user?.email}`)).then((doc) =>
      setSavedCoins(doc?.data()?.watchList)
    );

    //this is the real-time document listener
    const realtimeDoc = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (snapshot) => {
        setSavedCoins2(snapshot?.data()?.watchList);
      }
    );
  }, [user?.email]);

  return (
    <UserContext.Provider
      value={{
        signup,
        signin,
        signout,
        user,
        savedCoins,
        setSavedCoins,
        savedCoins2,
        setSavedCoins2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(UserContext);
};
