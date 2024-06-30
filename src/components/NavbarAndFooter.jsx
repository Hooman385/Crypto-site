import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Account from "../pages/Account";
import CoinPage from "./CoinPage";
import Home from "../pages/Home";
import NotFound from "./NotFound";
import Footer from "./Footer";
import { data } from "../mockData";
import { data2 } from "../mockData2";
import axios from "axios";

const NavbarAndFooter = () => {
  const [coins, setCoins] = useState();

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=true&locale=en";

  const getCoins = async () => {
    try {
      const response = await axios.get(url);
      setCoins(response.data);
      // setCoins(data2);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCoins();
  }, [url]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coin/:coinId" element={<CoinPage coins={coins} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default NavbarAndFooter;
