import React, { useState, useEffect } from "react";
import CoinItem from "./CoinItem";
import {
  query,
  collection,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { userAuth } from "../context/AuthContext";
import Pagination from "./Pagination";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");
  const { user, setSavedCoins } = userAuth();

  //pagination stuff START
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = coins?.slice(indexOfFirstPost, indexOfLastPost);

  //pagination stuff END

  //get saved coins
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const createDoc = (e) => {
    e.preventDefault();
    setDoc(doc(db, "users", user?.email), {
      watchList: [],
    });
  };

  return (
    <>
      <div className="rounded-div my-4 min-w-[400px]">
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 px-4  text-center">
          <h1 className="text-2xl font-bold my-2">Search Crypto</h1>
          <form>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search a coin..."
              className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            />
      
          </form>
        </div>

        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h volume</th>
              <th className="hidden sm:table-cell">Mkt</th>
              <th>Last 7 days</th>
            </tr>
          </thead>
          <tbody className="">
            {searchText &&
              coins
                ?.filter((value) => {
                  if (searchText === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return value;
                  }
                })
                ?.map((coin) => (
                  <CoinItem
                    key={coin?.id}
                    coin={coin}
                    setSavedCoins={setSavedCoins}
                  />
                ))}
            {!searchText &&
              currentPosts?.map((coin) => (
                <CoinItem
                  key={coin?.id}
                  coin={coin}
                  setSavedCoins={setSavedCoins}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        coins={coins}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={coins?.length}
        setCurrentPage={setCurrentPage}
        setSearchText={setSearchText}
      />
    </>
  );
};

export default CoinSearch;
