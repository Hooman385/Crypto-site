import React, { useEffect, useMemo, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState();
  const { user, savedCoins, setSavedCoins, savedCoins2 } = userAuth();
  const docRef = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    savedCoins2?.forEach((item) =>
      item.id === coin.id ? setSavedCoin(true) : null
    );
  }, [savedCoins2]);

  const saveCoin = async () => {
    if (user?.email) {
      await updateDoc(docRef, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
          marked: true,
        }),
      });
      setSavedCoin(true);
    } else {
      alert("To save a coin to your watch list, please sign in");
    }
  };

  const handleRemove = async (id) => {
    try {
      const result = savedCoins?.filter((item) => item.id !== id);
      await updateDoc(docRef, {
        watchList: result,
      });
      setSavedCoin(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden" key={coin.id}>
      <td>
        {savedCoins?.find((item) => item.id === coin.id && item.marked) ? (
          <AiFillStar
            onClick={() => handleRemove(coin.id)}
            className="w-full cursor-pointer"
          />
        ) : (
          <AiOutlineStar
            onClick={() => saveCoin(coin.id)}
            className="w-full cursor-pointer"
          />
        )}
      </td>

      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center gap-2">
            <img className="w-6 rounded-full" src={coin.image} alt="" />
            <span className="hidden sm:block">{coin.name}</span>
          </div>
        </Link>
      </td>
      <td>{coin?.symbol?.toUpperCase()}</td>
      <td>${coin?.current_price?.toLocaleString("en-us")}</td>
      <td>
        {coin?.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin?.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">
        ${coin?.total_volume?.toLocaleString("en-us")}
      </td>
      <td className="hidden sm:table-cell">
        ${coin?.market_cap?.toLocaleString("en-us")}
      </td>
      <td>
        <Sparklines data={coin?.sparkline_in_7d?.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
