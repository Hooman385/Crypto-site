import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { BsReddit } from "react-icons/bs";
import Loading from "./Loading";

const CoinPage = ({ coins, mockCoins }) => {
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;
  const [coinPage, setCoinPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoinPageData = async () => {
      try {
        const response = await axios.get(url);
        setCoinPage(response.data);
        setIsLoading(false);
      } catch (err) {
        const ErrorResponse = err;
        setError(ErrorResponse);
      }
    };

    getCoinPageData();
  }, [url]);

  if (isLoading) return <Loading error={error} />;

  return (
    <div className="rounded-div p-5 my-4 min-w-[400px]">
      {/* <h1>param: {params.coinId}</h1>
      <h1>name from api: {coinPage.name}</h1> */}
      <div className="p-5">
        <div className="flex gap-5 mb-8">
          <img className="w-12 h-12" src={coinPage.image?.large} alt="" />
          <div className="flex flex-col">
            <span className="font-bold text-2xl">{coinPage?.name} price</span>
            <span>({coinPage?.symbol?.toUpperCase()} / USD)</span>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* col 1 or left col */}
          <div className="flex flex-col gap-5">
            <div className="w-full flex justify-between ">
              <span className="font-bold text-2xl">
                $
                {coinPage?.market_data?.current_price?.usd?.toLocaleString(
                  "en-us"
                )}
              </span>
              <span>7 Day</span>
            </div>
            <div>
              <Sparklines data={coinPage?.market_data?.sparkline_7d?.price}>
                <SparklinesLine color="teal" />
              </Sparklines>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Market Cap</p>
                <p>
                  $
                  {coinPage?.market_data?.market_cap?.usd.toLocaleString(
                    "en-us"
                  )}
                </p>
              </div>
              <div>
                <p className="font-bold">Volume (24h)</p>
                <p>
                  $
                  {coinPage?.market_data?.total_volume?.usd.toLocaleString(
                    "en-us"
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">24h High</p>
                <p>
                  $
                  {coinPage?.market_data?.high_24h?.usd.toLocaleString("en-us")}
                </p>
              </div>
              <div>
                <p className="font-bold">24h Low</p>
                <p>
                  ${coinPage?.market_data?.low_24h?.usd.toLocaleString("en-us")}
                </p>
              </div>
            </div>
          </div>
          {/* col 1 or right col END  */}

          {/* col 2 or left col  */}
          <div className="flex flex-col gap-10">
            <h2 className="font-bold text-xl">Market Stats</h2>
            <div className="flex">
              <div className="w-[33%]">
                <p className="font-bold">Market Rank</p>
                <p>{coinPage?.market_cap_rank}</p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold">Hashing Algorithm</p>
                <p>SHA-256</p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold ">Total Score</p>
                <p>{coinPage?.developer_score}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-[33%]">
                <p className="font-bold">Price Change (24h)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold">Price Change (7d)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_7d.toFixed(2)}
                  %
                </p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold">Price Change (14d)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_14d.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[33%]">
                <p className="font-bold">Price Change (30d)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_30d.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold">Price Change (60d)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_60d.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className="w-[33%]">
                <p className="font-bold">Price Change (1y)</p>
                <p>
                  {coinPage?.market_data?.price_change_percentage_1y.toFixed(2)}
                  %
                </p>
              </div>
            </div>
            <div className="flex md:justify-start justify-between md:gap-20  w-full">
              <AiOutlineTwitter className="text-3xl text-accent cursor-pointer hover:scale-150 duration-300 ease-in-out" />
              <MdOutlineFacebook className="text-3xl text-accent cursor-pointer hover:scale-150 duration-300 ease-in-out" />
              <BsReddit className="text-3xl text-accent cursor-pointer hover:scale-150 duration-300 ease-in-out" />
              <AiOutlineGithub className="text-3xl text-accent cursor-pointer hover:scale-150 duration-300 ease-in-out" />
            </div>
          </div>
          {/* col 2 or left col END  */}
        </div>
        {/* grid END */}
        <div>
          <h2 className="text-xl font-bold">About {coinPage?.name}</h2>
          <div
            className="break-words leading-7 text-lg w-full"
            dangerouslySetInnerHTML={{ __html: coinPage?.description?.en }}
          ></div>
          {/* <p className="break-words leading-7 text-lg w-full">
            {coinPage?.description?.en}
            
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
