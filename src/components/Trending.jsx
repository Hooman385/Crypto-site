import React, { useState, useEffect } from "react";
import axios from "axios";
import bitcoin from "../assets/bitcoin.png";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const url = "https://api.coingecko.com/api/v3/search/trending";
  useEffect(() => {
    const getTrending = async () => {
      const response = await axios.get(url);
      setTrending(response.data.coins);
    };

    getTrending();
  }, [url]);

  return (
    <div className="rounded-div my-12 py-8 text-primary min-w-[400px]">
      <h1 className="text-2xl font-bold px-4">Trending Coins</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 ">
        {trending.map((coin, index) => (
          <div key={index} className="rounded-div flex justify-between  p-4 hover:scale-105 ease-in-out duration-300">
            <div className="flex w-full items-center justify-between">
              <img className="rounded-full" src={coin.item.small} alt="/" />
              <div className="w-full flex flex-col ml-2">
                <span className="font-bold">{coin.item.name}</span>
                <span>{coin.item.symbol}</span>
              </div>
            </div>
            <div className="flex items-center w-full justify-end">
              <img className="w-5 m-2 " src={bitcoin} alt="/" />
              <span>{coin.item.price_btc.toFixed(7)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
