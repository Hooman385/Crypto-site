import React, { useEffect, useState } from "react";
import SavedCoins from "./SavedCoins";
import { userAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, doc, collection, query } from "firebase/firestore";

const Account = () => {
  const { user, signout, savedCoins2, setSavedCoins2 } = userAuth();
  // const [savedCoins, setSavedCoins] = useState();
  useEffect(() => {
    // const q = query(doc(db, "users", `${user?.email}`));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   setSavedCoins(querySnapshot.data()?.watchList);
    //   // querySnapshot.forEach((doc) => {
    //   //   setSavedCoins(doc.data().watchList);
    //   // });
    // });
  }, [user?.email]);

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/");
      console.log("you signed out");
    } catch (e) {
      console.log(e.message);
    }
  };

  // there's a small problem here
  // this code prevents the user from seeing the account page if they're not signed in
  // however after they sign in, if they refresh the page they'll be taken to sign in page again

  if (user?.email) {
    return (
      <div>
        <div className="flex items-center justify-between rounded-div my-10  min-h-[100px]">
          <div>
            <h2 className="text-xl font-bold">Account</h2>
            <p>Welcome, user {user?.email}</p>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="text-btnText bg-button rounded-2xl font-bold px-6 py-2 shadow-2xl hover:shadow-2xl"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="min-h-[300px] rounded-div py-6 min-w-[400px]">
          <h2 className="text-xl font-bold mb-4">Saved coins</h2>
          {savedCoins2?.length === 0 ? (
            <div>
              <p>You don't have any coins saved.</p>
              <p>Please save a coin to add it to your watch list.</p>
              <p>To browse the coins, click here.</p>
            </div>
          ) : (
            <SavedCoins />
          )}
        </div>
      </div>
    );
  } else if (!user?.email) {
    // return <Navigate to="/signin" />;
    return (
      <div className="rounded-div py-10">
        <h1 className="text-2xl font-bold mb-10">You are not signed in</h1>
        <p className="text-xl  mb-3">
          To see your account page, please{" "}
          <Link to="/signin" className="font-bold text-accent">
            sign-in
          </Link>{" "}
          first.
        </p>
        <p className="text-xl">
          If you don't have an account, you can{" "}
          <Link className="font-bold text-accent" to="/signup">
            sign-up
          </Link>{" "}
          here
        </p>
      </div>
    );
  }
};

export default Account;
