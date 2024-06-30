import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { userAuth } from "../context/AuthContext";

const SavedCoins = () => {
  const { user, savedCoins2, setSavedCoins2 } = userAuth();

  const docRef = doc(db, "users", `${user?.email}`);
  // we have a collection called users, then there's a document named after user's email
  // inside that document there's an array which contains multiple objects that are our coins
  // each object cointains information about one coin.

  const handleRemove = async (id) => {
    try {
      const result = savedCoins2.filter((coin) => coin.id !== id);
      await updateDoc(docRef, {
        watchList: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th className="px-4">Rank #</th>
            <th className="text-left">Coin</th>
            <th className="text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {savedCoins2?.map((coin) => (
            <tr key={coin.rank} className="h-[60px] overflow-hidden">
              <td>{coin?.rank}</td>
              <td>
                <Link to={`/coin/${coin.id}`}>
                  <div className="flex items-center">
                    <img src={coin?.image} className="w-8 mr-4" alt="coin" />
                    <div>
                      <p className="hidden sm:table-cell">{coin?.name}</p>
                      <p className="text-gray-500 text-left text-sm">
                        {coin?.symbol?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="pl-8">
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => handleRemove(coin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCoins;
